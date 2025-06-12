import { HeaderConfig } from "@/types/database"
import LogoContent from "./content/LogoContent"
import NavigationContent from "./content/NavigationContent"
import ButtonsContent from "./content/ButtonsContent"

type ContentPanelProps = {
  elementType: string
  config: HeaderConfig["config"]
  onChange: (newConfig: HeaderConfig["config"]) => void
}

export default function ContentPanel({ elementType, config, onChange }: ContentPanelProps) {
  return (
    <div className="divide-y divide-gray-200">
      {elementType === 'logo' && (
        <div className="py-4">
          <LogoContent config={config} onChange={onChange} />
        </div>
      )}
      
      {elementType === 'navigation' && (
        <div className="py-4">
          <NavigationContent config={config} onChange={onChange} />
        </div>
      )}
      
      {elementType === 'buttons' && (
        <div className="py-4">
          <ButtonsContent config={config} onChange={onChange} />
        </div>
      )}
      
      {elementType === 'navbar' && (
        <div className="py-4">
          <div className="px-4 text-sm text-gray-500">
            Select individual elements to edit their content
          </div>
        </div>
      )}
    </div>
  )
}