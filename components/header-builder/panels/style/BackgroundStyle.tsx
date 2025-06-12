import { HeaderConfig } from "@/types/database"
import { ChromePicker, ColorResult } from "react-color"
import { useState } from "react"

type BackgroundStyleProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function BackgroundStyle({ config, onChange }: BackgroundStyleProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [manualClass, setManualClass] = useState('')

  const handleBackgroundTypeChange = (type: 'solid' | 'gradient' | 'transparent') => {
    onChange({
      ...config,
      background: {
        type,
        color: type === 'transparent' ? 'transparent' : (config.background?.color || '#000000'),
        blur: config.background?.blur ?? '0px',
        shadow: config.background?.shadow ?? 'none',
        rounded: config.background?.rounded ?? '0px'
      }
    })
  }

  const handleColorChange = (value: string | ColorResult) => {
    let color: string
    if (typeof value === 'string') {
      // Manual input (Tailwind class)
      color = value
    } else {
      // Color picker input
      color = value.hex
    }

    onChange({
      ...config,
      background: {
        type: 'solid',
        color,
        blur: config.background?.blur ?? '0px',
        shadow: config.background?.shadow ?? 'none',
        rounded: config.background?.rounded ?? '0px'
      }
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Background Type</h3>
      <div className="grid grid-cols-3 gap-2">
        {["solid", "gradient", "transparent"].map(type => (
          <button
            key={type}
            className={`p-2 rounded border ${
              config.background?.type === type ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => handleBackgroundTypeChange(type as 'solid' | 'gradient' | 'transparent')}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {config.background?.type !== "transparent" && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Background Color</h3>
          
          <div className="space-y-2">
            {/* Color Picker */}
            <div className="relative">
              <button
                className="w-full p-2 border rounded flex items-center gap-2"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: config.background?.color || '#000000' }}
                />
                <span>{config.background?.color || '#000000'}</span>
              </button>
              
              {showColorPicker && (
                <div className="absolute z-10 mt-2">
                  <ChromePicker
                    color={config.background?.color || '#000000'}
                    onChange={handleColorChange}
                  />
                </div>
              )}
            </div>

            {/* Manual Tailwind Class Input */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Tailwind Class
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualClass}
                  onChange={(e) => setManualClass(e.target.value)}
                  placeholder="e.g. bg-red-500"
                  className="flex-1 border rounded-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleColorChange(manualClass)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}