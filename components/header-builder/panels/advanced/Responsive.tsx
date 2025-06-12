import { HeaderConfig } from "@/types/database"
import { 
  ComputerDesktopIcon, 
  DeviceTabletIcon, 
  DevicePhoneMobileIcon 
} from "@heroicons/react/24/outline"
import { Switch } from "@headlessui/react"
import { useState } from "react"

type ResponsiveProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function Responsive({ config, onChange }: ResponsiveProps) {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const handleVisibilityChange = (hidden: boolean) => {
    onChange({ ...config, [selectedDevice]: { ...config?.[selectedDevice], hidden } })
  }

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex justify-center p-2 bg-gray-100 rounded-lg">
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded ${
              selectedDevice === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setSelectedDevice('desktop')}
          >
            <ComputerDesktopIcon className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded ${
              selectedDevice === 'tablet' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setSelectedDevice('tablet')}
          >
            <DeviceTabletIcon className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded ${
              selectedDevice === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setSelectedDevice('mobile')}
          >
            <DevicePhoneMobileIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Responsive Controls */}
      <div className="space-y-4">
          <Switch
            checked={config?.[selectedDevice]?.hidden || false}
            onChange={handleVisibilityChange}
            className={`${
              config?.[selectedDevice]?.hidden ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className={`${
              config?.[selectedDevice]?.hidden ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
          </Switch>
        </div>

        {selectedDevice !== 'desktop' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Width
              </label>
              <div className="flex">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 text-sm"
                  placeholder="Auto"
                />
                <select className="border border-l-0 border-gray-300 rounded-r-md shadow-sm py-2 pl-2 pr-7 text-sm bg-gray-50">
                  <option>%</option>
                  <option>px</option>
                  <option>vw</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">Alignment</h4>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 border rounded hover:bg-gray-50">
                  Left
                </button>
                <button className="p-2 border rounded hover:bg-gray-50">
                  Center
                </button>
                <button className="p-2 border rounded hover:bg-gray-50">
                  Right
                </button>
              </div>
            </div>
          </>
        )}
      </div>
  )
}