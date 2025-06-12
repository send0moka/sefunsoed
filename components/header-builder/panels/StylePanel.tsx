import { HeaderConfig } from "@/types/database"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import BackgroundStyle from "./style/BackgroundStyle"
import TypographyStyle from "./style/TypographyStyle"
import BorderStyle from "./style/BorderStyle"

type StylePanelProps = {
  elementType: string
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function StylePanel({ elementType, config, onChange }: StylePanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['background'])

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {/* Background Section */}
      <div className="py-2">
        <button
          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
          onClick={() => toggleGroup('background')}
        >
          <span>Background</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${
              expandedGroups.includes('background') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedGroups.includes('background') && (
          <div className="p-4">
            <BackgroundStyle config={config} onChange={onChange} />
          </div>
        )}
      </div>

      {/* Typography Section - Only for text elements */}
      {['navigation', 'buttons'].includes(elementType) && (
        <div className="py-2">
          <button
            className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
            onClick={() => toggleGroup('typography')}
          >
            <span>Typography</span>
            <ChevronDownIcon 
              className={`w-5 h-5 transition-transform ${
                expandedGroups.includes('typography') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedGroups.includes('typography') && (
            <div className="p-4">
              <TypographyStyle config={config} onChange={onChange} />
            </div>
          )}
        </div>
      )}

      {/* Border Section */}
      <div className="py-2">
        <button
          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium"
          onClick={() => toggleGroup('border')}
        >
          <span>Border</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform ${
              expandedGroups.includes('border') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedGroups.includes('border') && (
          <div className="p-4">
            <BorderStyle config={config} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  )
}