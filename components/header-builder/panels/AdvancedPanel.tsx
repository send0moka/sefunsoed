import { HeaderConfig } from "@/types/database"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import MarginPadding from "./advanced/MarginPadding"
import MotionEffects from "./advanced/MotionEffects"
import Responsive from "./advanced/Responsive"

interface AdvancedPanelProps {
  elementType: string
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function AdvancedPanel({ config, onChange }: AdvancedPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['spacing'])

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {/* Margin & Padding Section */}
      <div className="py-2">
        <button
          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
          onClick={() => toggleGroup('spacing')}
        >
          <span>Margin & Padding</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${
              expandedGroups.includes('spacing') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedGroups.includes('spacing') && (
          <div className="p-4">
            <MarginPadding config={config} onChange={onChange} />
          </div>
        )}
      </div>

      {/* Motion Effects Section */}
      <div className="py-2">
        <button
          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
          onClick={() => toggleGroup('motion')}
        >
          <span>Motion Effects</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${
              expandedGroups.includes('motion') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedGroups.includes('motion') && (
          <div className="p-4">
            <MotionEffects config={config} onChange={onChange} />
          </div>
        )}
      </div>

      {/* Responsive Section */}
      <div className="py-2">
        <button
          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
          onClick={() => toggleGroup('responsive')}
        >
          <span>Responsive</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${
              expandedGroups.includes('responsive') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedGroups.includes('responsive') && (
          <div className="p-4">
            <Responsive config={config} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  )
}