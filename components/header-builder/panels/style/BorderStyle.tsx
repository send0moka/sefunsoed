import { HeaderConfig } from "@/types/database"
import { ChromePicker, ColorResult } from "react-color"
import { useState } from "react"
import { LinkIcon } from "@heroicons/react/24/outline"

type BorderStyleProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function BorderStyle({ config, onChange }: BorderStyleProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isLinked, setIsLinked] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Border</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Border Type
          </label>
          <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm">
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Width
          </label>
          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Top</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Right</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Bottom</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Left</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
          </div>
          <button
            className={`mt-2 p-1 rounded ${isLinked ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLinked(!isLinked)}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="relative">
            <button
              className="w-full p-2 border rounded flex items-center gap-2"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: config.border?.color || '#000000' }}
              />
              <span>{config.border?.color || '#000000'}</span>
            </button>
            
            {showColorPicker && (
              <div className="absolute z-10 mt-2">
                <ChromePicker
                  color={config.border?.color || '#000000'}
                  onChange={(color: ColorResult) => {
                    onChange({
                      ...config,
                      border: {
                        ...config.border,
                        color: color.hex
                      }
                    })
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Border Radius
          </label>
          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Top Left</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Top Right</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Bottom Right</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Bottom Left</span>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                placeholder="0"
                disabled={isLinked}
              />
            </div>
          </div>
          <button
            className={`mt-2 p-1 rounded ${isLinked ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLinked(!isLinked)}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}