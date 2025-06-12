import { HeaderConfig } from "@/types/database"
import { LinkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type MarginPaddingProps = {
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function MarginPadding({ }: MarginPaddingProps) {
  const [marginsLinked, setMarginsLinked] = useState(true)
  const [paddingLinked, setPaddingLinked] = useState(true)

  return (
    <div className="space-y-6">
      {/* Margin Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Margin</h3>
          <button
            className={`p-1 rounded ${marginsLinked ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setMarginsLinked(!marginsLinked)}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['Top', 'Right', 'Bottom', 'Left'].map((side) => (
            <div key={side} className="space-y-1">
              <span className="text-xs text-gray-500">{side}</span>
              <div className="flex">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-l-md shadow-sm py-1 px-2 text-sm"
                  placeholder="0"
                  disabled={marginsLinked}
                />
                <select className="border border-l-0 border-gray-300 rounded-r-md shadow-sm py-1 pl-1 pr-5 text-sm bg-gray-50">
                  <option>px</option>
                  <option>%</option>
                  <option>em</option>
                  <option>rem</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Padding Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Padding</h3>
          <button
            className={`p-1 rounded ${paddingLinked ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            onClick={() => setPaddingLinked(!paddingLinked)}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['Top', 'Right', 'Bottom', 'Left'].map((side) => (
            <div key={side} className="space-y-1">
              <span className="text-xs text-gray-500">{side}</span>
              <div className="flex">
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-l-md shadow-sm py-1 px-2 text-sm"
                  placeholder="0"
                  disabled={paddingLinked}
                />
                <select className="border border-l-0 border-gray-300 rounded-r-md shadow-sm py-1 pl-1 pr-5 text-sm bg-gray-50">
                  <option>px</option>
                  <option>%</option>
                  <option>em</option>
                  <option>rem</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}