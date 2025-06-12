import { HeaderConfig } from "@/types/database"
import { 
  PlusIcon,
  TrashIcon,
  ArrowsUpDownIcon
} from "@heroicons/react/24/outline"
import { useState } from "react"

type NavigationContentProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function NavigationContent({ config, onChange }: NavigationContentProps) {
  // Initialize with default navigation items if none exist
  const [navigationItems, setNavigationItems] = useState(() => 
    config.navigation?.menuItems || [
      { name: "About", url: "/about" },
      { name: "Programs", url: "/programs" },
      { name: "Services", url: "/services" }
    ]
  )

  const handleAddItem = () => {
    const newItems = [...navigationItems, { name: "New Item", url: "/" }];
    setNavigationItems(newItems);
    updateConfig(newItems);
  }

  const handleRemoveItem = (index: number) => {
    const newItems = navigationItems.filter((_, i) => i !== index);
    setNavigationItems(newItems);
    updateConfig(newItems);
  }

  const handleItemChange = (index: number, field: 'name' | 'url', value: string) => {
    const newItems = navigationItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNavigationItems(newItems);
    updateConfig(newItems);
  }

  const updateConfig = (items: typeof navigationItems) => {
    onChange({
      ...config,
      navigation: {
        ...config.navigation,
        menuItems: items
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">Menu Items</h3>
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={handleAddItem}
          >
            <PlusIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="border rounded-md divide-y">
          {navigationItems.map((item, index) => (
            <div key={index} className="p-3 bg-white flex items-center gap-3">
              <button className="p-1 hover:bg-gray-100 rounded cursor-move">
                <ArrowsUpDownIcon className="w-4 h-4 text-gray-400" />
              </button>
              
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                  placeholder="URL"
                />
              </div>

              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleRemoveItem(index)}
              >
                <TrashIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Menu Settings</h3>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Layout
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
            value={config.navigation?.layout || 'horizontal'}
            onChange={(e) => onChange({
              ...config,
              navigation: {
                ...config.navigation,
                layout: e.target.value
              }
            })}
          >
            <option>Horizontal</option>
            <option>Vertical</option>
            <option>Dropdown</option>
          </select>
        </div>
      </div>
    </div>
  )
}