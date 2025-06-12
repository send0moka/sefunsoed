import { HeaderConfig } from "@/types/database"
import { useState } from "react"

type TypographyStyleProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function TypographyStyle({ config, onChange }: TypographyStyleProps) {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Typography</h3>
        <div className="flex border rounded-md">
          <button
            className={`p-2 ${selectedDevice === 'desktop' ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedDevice('desktop')}
          >
            Desktop
          </button>
          <button
            className={`p-2 ${selectedDevice === 'tablet' ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedDevice('tablet')}
          >
            Tablet
          </button>
          <button
            className={`p-2 ${selectedDevice === 'mobile' ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedDevice('mobile')}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Font Family
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
            value={config.typography?.[selectedDevice]?.fontFamily || 'Default'}
            onChange={(e) => onChange({
              ...config,
              typography: {
                ...config.typography,
                [selectedDevice]: {
                  ...config.typography?.[selectedDevice],
                  fontFamily: e.target.value
                }
              }
            })}
          >
            <option>Default</option>
            <option>Roboto</option>
            <option>Open Sans</option>
            <option>Montserrat</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-3 text-sm"
              value={16}
            />
            <select className="w-20 border border-gray-300 rounded-md shadow-sm py-2 pl-2 pr-7 text-sm">
              <option>px</option>
              <option>em</option>
              <option>rem</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Font Weight
          </label>
          <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm">
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Line Height
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-3 text-sm"
            step="0.1"
            value={1.5}
          />
        </div>
      </div>
    </div>
  )
}