"use client"

import { useEffect, useState, useCallback } from "react"

interface NavigatorElement {
  id: string
  name: string
  type: string
  children: NavigatorElement[]
}
import { headerConfigService } from "@/lib/supabase-admin"
import { HeaderConfig } from "@/types/database"
import { supabaseAdmin } from "@/lib/supabase-admin"
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  ArrowUturnLeftIcon, 
  ArrowUturnRightIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline"
import TabGroup from "@/components/header-builder/TabGroup"
import ContentPanel from "@/components/header-builder/panels/ContentPanel"
import StylePanel from "@/components/header-builder/panels/StylePanel"
import AdvancedPanel from "@/components/header-builder/panels/AdvancedPanel"
import HeaderPreview from "@/components/header-builder/HeaderPreview"
import Navigator from "@/components/header-builder/Navigator"
import ElementsLibrary from '@/components/header-builder/ElementsLibrary'
import { toast } from "sonner"

// Viewport types
type ViewportType = "desktop" | "tablet" | "mobile"

type HistoryState = {
  config: HeaderConfig["config"]
  timestamp: number
}

const getInitialNavigatorElements = (config: HeaderConfig["config"]): NavigatorElement[] => {
  return [{
    id: 'nav-container',
    name: 'Container',
    type: 'container',
    children: [
      {
        id: 'logo-image',
        name: 'Image',
        type: 'image',
        children: []
      },
      {
        id: 'nav-links',  // Changed from links-container
        name: 'Container',
        type: 'container',
        children: (config.navigation?.menuItems || []).map((item, index) => ({
          id: `nav-link-${index}`,
          name: 'Text',
          type: 'text',
          children: []
        }))
      },
      {
        id: 'lang-button',  // Changed from language-button
        name: 'Button',
        type: 'button',
        children: []
      },
      {
        id: 'signin-button',
        name: 'Button',
        type: 'button',
        children: []
      }
    ]
  }]
}

export default function HeaderBuilder() {
  const [activeConfig, setActiveConfig] = useState<HeaderConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState<ViewportType>("desktop")
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [panelWidth, setPanelWidth] = useState(300)
  const [isDragging, setIsDragging] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false);

  const [navigatorElements, setNavigatorElements] = useState<NavigatorElement[]>([])

  useEffect(() => {
    loadConfigs()
  }, [])

  async function loadConfigs() {
    try {
      // Coba ambil konfigurasi aktif
      const { data: active, error } = await supabaseAdmin
        .from('header_configs')
        .select('*')
        .eq('is_active', true)
        .single()
      
      if (error && error.code !== 'PGRST116') { // PGRST116 adalah kode untuk "no rows returned"
        throw error
      }
      
      if (!active) {
        // Jika tidak ada, inisialisasi dengan default
        const defaultConfig = await headerConfigService.initializeDefaultConfig()
        setActiveConfig(defaultConfig)
      } else {
        setActiveConfig(active)
      }
    } catch (error) {
      console.error("Error loading header configs:", error)
      // Tampilkan error ke user
      alert("Failed to load header configuration. Please try refreshing the page.")
    } finally {
      setLoading(false)
    }
  }

  const addToHistory = useCallback((config: HeaderConfig["config"]) => {
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, historyIndex + 1)
      return [...newHistory, { config, timestamp: Date.now() }]
    })
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  const handleConfigChange = (newConfig: HeaderConfig["config"]) => {
    setActiveConfig(prev => prev ? { ...prev, config: newConfig } : null)
    addToHistory(newConfig)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      const previousState = history[historyIndex - 1]
      setActiveConfig(prev => prev ? { ...prev, config: previousState.config } : null)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      const nextState = history[historyIndex + 1]
      setActiveConfig(prev => prev ? { ...prev, config: nextState.config } : null)
    }
  }

  const getTabsForElement = (elementType: string | null) => {
    if (!elementType) return []
    
    return [
      {
        name: "Content",
        icon: DocumentTextIcon,
        component: activeConfig && (
          <ContentPanel
            elementType={elementType}
            config={activeConfig.config}
            onChange={handleConfigChange}
          />
        )
      },
      {
        name: "Style",
        icon: PaintBrushIcon,
        component: activeConfig && (
          <StylePanel
            elementType={elementType}
            config={activeConfig.config}
            onChange={handleConfigChange}
          />
        )
      },
      {
        name: "Advanced",
        icon: Cog6ToothIcon,
        component: activeConfig && (
          <AdvancedPanel
            elementType={elementType}
            config={activeConfig.config}
            onChange={handleConfigChange}
          />
        )
      }
    ]
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newWidth = e.clientX
      // Set min and max width constraints
      if (newWidth >= 200 && newWidth <= 600) {
        setPanelWidth(newWidth)
      }
    }
  }, [isDragging])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const elementType = e.dataTransfer.getData('elementType')
    
    // Add new element to navigator
    const newElement: NavigatorElement = {
      id: Date.now().toString(),
      name: elementType.charAt(0).toUpperCase() + elementType.slice(1),
      type: elementType,
      children: []
    }

    setNavigatorElements(prev => {
      const updated = [...prev]
      // Add to navbar's children
      updated[0].children.push(newElement)
      return updated
    })

    // Update config for the new element
    setActiveConfig(prev => {
      if (!prev) return null
      return {
        ...prev,
        config: {
          ...prev.config,
          [elementType]: {} // Initialize empty config for new element
        }
      }
    })
  }

  const handleUpdate = async () => {
    if (!activeConfig || isUpdating) return;

    setIsUpdating(true);
    try {
      // Validate config before update
      if (!activeConfig.id) {
        throw new Error('Missing configuration ID');
      }

      // Log the current state
      console.log('Current state:', {
        id: activeConfig.id,
        config: activeConfig.config,
        timestamp: new Date().toISOString()
      });

      const { data, error } = await headerConfigService.update(
        activeConfig.id,
        activeConfig.config
      );

      if (error) {
        console.error('Update failed:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from update');
      }

      // Log successful update
      console.log('Update successful:', data);
      
      // Update local state with returned data
      setActiveConfig(prev => prev ? { ...prev, config: data.config } : null);
      
      toast.success('Header configuration updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      console.error('Update error details:', {
        error,
        config: activeConfig,
        timestamp: new Date().toISOString()
      });
      
      toast.error(`Failed to update: ${errorMessage}`);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (activeConfig) {
      setNavigatorElements(getInitialNavigatorElements(activeConfig.config))
    }
  }, [activeConfig])

  if (loading || !activeConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Single Top Bar */}
      <div className="h-14 border-b bg-white px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded-lg hover:bg-gray-100 ${historyIndex <= 0 ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            <ArrowUturnLeftIcon className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded-lg hover:bg-gray-100 ${historyIndex >= history.length - 1 ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <ArrowUturnRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              className={`p-2 rounded-md ${viewport === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setViewport('desktop')}
              title="Desktop View"
            >
              <ComputerDesktopIcon className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded-md ${viewport === 'tablet' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setViewport('tablet')}
              title="Tablet View"
            >
              <DeviceTabletIcon className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded-md ${viewport === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setViewport('mobile')}
              title="Mobile View"
            >
              <DevicePhoneMobileIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              isUpdating 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            <ArrowPathIcon className={`w-5 h-5 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div 
          className="bg-white border-r border-gray-200 flex flex-col relative"
          style={{ width: panelWidth }}
        >
          <div className="flex-1 overflow-y-auto">
            {selectedElement ? (
              <div className="p-4">
                <TabGroup tabs={getTabsForElement(selectedElement)} />
              </div>
            ) : (
              <ElementsLibrary />
            )}
          </div>
          <div className="h-64 border-t">
            <Navigator 
              elements={navigatorElements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
            />
          </div>
          {/* Resize Handle */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 hover:opacity-50"
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <HeaderPreview
            config={activeConfig.config}
            viewport={viewport}
            isEditing={true}
            onSelectElement={setSelectedElement}
            selectedElement={selectedElement}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'copy'
            }}
          />
        </div>
      </div>

      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  )
}