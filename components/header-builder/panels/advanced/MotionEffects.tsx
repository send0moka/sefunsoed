import { HeaderConfig } from "@/types/database"
import { Switch } from "@headlessui/react"
import { useState } from "react"

type MotionEffectsProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function MotionEffects({ config, onChange }: MotionEffectsProps) {
  const [stickyEnabled, setStickyEnabled] = useState(config?.sticky?.enabled ?? false)
  const [animationEnabled, setAnimationEnabled] = useState(config?.animation?.enabled ?? false)

  const handleStickyChange = (value: boolean) => {
    setStickyEnabled(value)
    onChange({ ...config, sticky: { ...config?.sticky, enabled: value } })
  }

  const handleAnimationChange = (value: boolean) => {
    setAnimationEnabled(value)
    onChange({ ...config, animation: { ...config?.animation, enabled: value } })
  }

  return (
    <div className="space-y-6">
      {/* Sticky Effects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Sticky</h3>
          <Switch
            checked={stickyEnabled}
            onChange={handleStickyChange}
            className={`${
              stickyEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className={`${
              stickyEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
          </Switch>
        </div>

        {stickyEnabled && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Offset
              </label>
              <div className="flex">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 text-sm"
                  placeholder="0"
                />
                <select className="border border-l-0 border-gray-300 rounded-r-md shadow-sm py-2 pl-2 pr-7 text-sm bg-gray-50">
                  <option>px</option>
                  <option>vh</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Transition Duration
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="100"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">0.3s</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Entrance Animation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Entrance Animation</h3>
          <Switch
            checked={animationEnabled}
            onChange={handleAnimationChange}
            className={`${
              animationEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className={`${
              animationEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
          </Switch>
        </div>

        {animationEnabled && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Animation
              </label>
              <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm">
                <option>Fade In</option>
                <option>Slide In</option>
                <option>Zoom In</option>
                <option>Bounce In</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Duration
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">0.5s</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Delay
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="100"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">0s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}