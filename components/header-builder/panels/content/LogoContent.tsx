import { HeaderConfig } from "@/types/database"
import { 
  PhotoIcon,
  BoltIcon
} from "@heroicons/react/24/outline"

type LogoContentProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function LogoContent({ config, onChange }: LogoContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <PhotoIcon className="w-12 h-12 text-gray-400" />
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Choose Image
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Image Size
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
            onChange={(e) => onChange({ ...config, logo: { ...config.logo, width: e.target.value } })}
          >
            <option>Full Size</option>
            <option>Large</option>
            <option>Medium</option>
            <option>Thumbnail</option>
            <option>Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
              placeholder="Describe this image"
              onChange={(e) => onChange({ ...config, logo: { ...config.logo, alt: e.target.value } })}
            />
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <BoltIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}