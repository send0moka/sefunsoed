"use client"

import { useEffect, useState } from "react"
import { headerConfigService } from "@/lib/supabase-admin"
import { HeaderConfig } from "@/types/database"
import TabGroup from "@/components/header-builder/TabGroup"
import { 
  BackgroundPanel, 
  LayoutPanel, 
  LogoPanel, 
  NavigationPanel, 
  ButtonsPanel 
} from "@/components/header-builder/EditorPanels"
import HeaderPreview from "@/components/header-builder/HeaderPreview"
import { supabaseAdmin } from "@/lib/supabase-admin"

export default function HeaderBuilder() {
  const [activeConfig, setActiveConfig] = useState<HeaderConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

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

  const handleConfigChange = (newConfig: HeaderConfig["config"]) => {
    if (!activeConfig) return

    const updatedConfig = {
      ...activeConfig,
      config: newConfig
    }
    
    // Update di state lokal
    setActiveConfig(updatedConfig)
    
    // Update di database
    headerConfigService.updateConfig(activeConfig.id, updatedConfig)
  }

  const editorTabs = [
    {
      name: "Background",
      component: activeConfig && (
        <BackgroundPanel
          config={activeConfig.config}
          onChange={handleConfigChange}
        />
      )
    },
    {
      name: "Layout",
      component: activeConfig && (
        <LayoutPanel
          config={activeConfig.config}
          onChange={handleConfigChange}
        />
      )
    },
    {
      name: "Logo",
      component: activeConfig && (
        <LogoPanel
          config={activeConfig.config}
          onChange={handleConfigChange}
        />
      )
    },
    {
      name: "Navigation",
      component: activeConfig && (
        <NavigationPanel
          config={activeConfig.config}
          onChange={handleConfigChange}
        />
      )
    },
    {
      name: "Buttons",
      component: activeConfig && (
        <ButtonsPanel
          config={activeConfig.config}
          onChange={handleConfigChange}
        />
      )
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Header Builder</h1>
      </div>

      {activeConfig && (
        <>
          <div className="mb-8 sticky top-0 z-50 bg-white pb-4">
            <HeaderPreview 
              config={activeConfig.config}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
            />
          </div>

          {isEditing && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-24">
              <div className="lg:col-span-12">
                <TabGroup tabs={editorTabs} />
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (activeConfig) {
                        await headerConfigService.updateConfig(
                          activeConfig.id, 
                          activeConfig
                        )
                      }
                      setIsEditing(false)
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}