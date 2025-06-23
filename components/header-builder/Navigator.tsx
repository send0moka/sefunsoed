import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface NavigatorElement {
  id: string
  name: string
  type: string
  children?: NavigatorElement[]
}

type NavigatorProps = {
  elements: NavigatorElement[]
  selectedElement: string | null | undefined
  onSelectElement: (element: string | null) => void
}

export default function Navigator({ elements, selectedElement, onSelectElement }: NavigatorProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleElementClick = (element: NavigatorElement) => {
    if (element.id === selectedElement) {
      onSelectElement(null)
    } else {
      onSelectElement(element.id)
    }
  }

  const renderElement = (element: NavigatorElement, depth = 0) => {
    const hasChildren = element.children && element.children.length > 0
    const isExpanded = expandedItems.includes(element.id)
    
    return (
      <div key={element.id} className="select-none">
        <div 
          className={`
            flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer
            ${selectedElement === element.id ? 'bg-blue-50 text-blue-600' : ''}
          `}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => handleElementClick(element)}
        >
          {hasChildren && (
            <button
              className="p-1 hover:bg-gray-200 rounded"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(element.id)
              }}
            >
              {isExpanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>
          )}
          <span className="ml-1 text-sm">{element.name}</span>
        </div>
        {hasChildren && isExpanded && element.children && (
          <div>
            {element.children.map(child => renderElement(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border-t">
      <div className="p-2 border-b bg-gray-50">
        <h3 className="text-sm font-medium">Navigator</h3>
      </div>
      <div className="p-2">
        {elements.map(element => renderElement({
          id: element.id,
          name: element.name,
          type: element.type,
          children: element.children
        }))}
      </div>
    </div>
  )
}