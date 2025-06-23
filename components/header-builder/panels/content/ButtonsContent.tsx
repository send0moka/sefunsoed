import { HeaderConfig } from "@/types/database"
import { 
  BoltIcon
} from "@heroicons/react/24/outline"

type ButtonsContentProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function ButtonsContent({ config, onChange }: ButtonsContentProps) {
  return (
    <div className="space-y-4">
      {/* Primary Button */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Primary Button</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Text
            </label>            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
              placeholder="Button text"
              value={config?.buttons?.primary?.text ?? ''}
              onChange={(e) => onChange({
                ...config,
                buttons: {
                  ...config.buttons,
                  primary: { ...config?.buttons?.primary, text: e.target.value }
                }
              })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
                placeholder="https://"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <BoltIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm">
              <option>Default</option>
              <option>Primary</option>
              <option>Secondary</option>
              <option>Outline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Language Button */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Language Button</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Default Language
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm">
              <option value="en">English</option>
              <option value="id">Indonesia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}