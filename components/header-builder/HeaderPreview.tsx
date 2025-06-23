"use client"

import { HeaderConfig } from "@/types/database"
import { useLanguage } from "@/contexts/LanguageContext"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import SelectableElement from "./SelectableElement"

type ViewportType = "desktop" | "tablet" | "mobile"

interface HeaderPreviewProps {
  config: HeaderConfig["config"]
  viewport: ViewportType
  selectedElement: string | null
  onSelectElement: (id: string | null) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  isEditing: boolean
}

const containerClasses = {
  desktop: 'w-full',
  tablet: 'w-[768px]',
  mobile: 'w-[375px]'
}

const getBackgroundClasses = (config: HeaderConfig["config"]) => {
  if (config?.background?.type === "transparent") {
    return ""
  }
  return config?.background?.color ?? ""
}

export default function HeaderPreview({ 
  config,
  viewport,
  onSelectElement,
  selectedElement,
  onDrop,
  onDragOver
}: HeaderPreviewProps) {
  const { language } = useLanguage()
  const menuItems = config?.navigation?.menuItems || []

  return (
    <div 
      className="h-full p-8 overflow-auto"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >      <div className={`${containerClasses[viewport || 'desktop']} transition-all duration-300`}>
        <header>
          <div className={`mx-auto ${config?.layout?.maxWidth ?? 'max-w-7xl'}`}>
            <div className={`${config.background?.rounded ?? ''} overflow-hidden`}>
              {/* Main Container */}
              <SelectableElement
                id="nav-container"
                isSelected={selectedElement === 'nav-container'}
                onClick={() => onSelectElement?.('nav-container')}
                elementType="Container"
              >                <nav className={`
                  ${config?.layout?.display ?? 'flex'}
                  ${config?.layout?.alignment ?? 'items-center justify-between'}
                  ${config?.layout?.padding?.top ?? 'py-4'}
                  ${config?.layout?.padding?.bottom ?? ''}
                  ${config?.layout?.padding?.left ?? 'px-6'}
                  ${config?.layout?.padding?.right ?? ''}
                  ${getBackgroundClasses(config)}
                  ${config.background?.blur}
                  ${config.background?.shadow}
                  w-full
                `}>
                  {/* Logo Image */}
                  <SelectableElement
                    id="logo-image"
                    isSelected={selectedElement === 'logo-image'}
                    onClick={() => onSelectElement?.('logo-image')}
                    elementType="Image"
                  >                    <Image
                      src="/logo.png"
                      alt="SEF UNSOED"
                      width={100}
                      height={48}
                      className={`${config?.logo?.brightness ?? 'brightness-0'} ${config?.logo?.invert ?? 'invert'}`}
                    />
                  </SelectableElement>

                  {/* Navigation Links Container */}
                  <SelectableElement
                    id="nav-links"
                    isSelected={selectedElement === 'nav-links'}
                    onClick={() => onSelectElement?.('nav-links')}
                    elementType="Container"
                  >                    <div className={`hidden lg:flex ${config?.navigation?.spacing ?? 'gap-x-8'}`}>
                      {menuItems.map((item, index) => (
                        <SelectableElement
                          key={index}
                          id={`nav-link-${index}`}
                          isSelected={selectedElement === `nav-link-${index}`}
                          onClick={() => onSelectElement?.(`nav-link-${index}`)}
                          elementType="Text"
                        >
                          <span className={`
                            cursor-default
                            ${config?.navigation?.textColor ?? 'text-gray-900'}
                            ${config?.navigation?.fontSize ?? 'text-sm'}
                            ${config?.navigation?.fontWeight ?? 'font-semibold'}
                            ${config?.navigation?.hoverColor ?? 'hover:text-indigo-600'}
                          `}>
                            {language === 'en' ? item.name_en : item.name_id}
                          </span>
                        </SelectableElement>
                      ))}
                    </div>
                  </SelectableElement>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <SelectableElement
                      id="lang-button"
                      isSelected={selectedElement === 'lang-button'}
                      onClick={() => onSelectElement?.('lang-button')}
                      elementType="Button"
                    >                      <div className={`
                        flex items-center gap-2 p-3
                        ${config?.buttons?.language?.borderRadius ?? 'rounded-full'}
                        ${config?.buttons?.language?.backgroundColor ?? 'bg-gray-100'}
                        ${config?.buttons?.language?.textColor ?? 'text-gray-700'}
                      `}>
                        <Image
                          src={language === "en" ? "/flags/uk.png" : "/flags/id.png"}
                          alt={language === "en" ? "English" : "Indonesia"}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium min-w-[20px]">
                          {language.toUpperCase()}
                        </span>
                      </div>
                    </SelectableElement>

                    <SelectableElement
                      id="signin-button"
                      isSelected={selectedElement === 'signin-button'}
                      onClick={() => onSelectElement?.('signin-button')}
                      elementType="Button"
                    >                      <div className={`
                        flex items-center gap-2
                        ${config?.buttons?.primary?.padding ?? 'px-4 py-2'}
                        ${config?.buttons?.primary?.borderRadius ?? 'rounded-full'}
                        ${config?.buttons?.primary?.backgroundColor ?? 'bg-indigo-600'}
                        ${config?.buttons?.primary?.textColor ?? 'text-white'}
                        ${config?.buttons?.primary?.hoverBackgroundColor ?? 'hover:bg-indigo-700'}
                        cursor-default
                      `}>
                        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Sign In</span>
                      </div>
                    </SelectableElement>
                  </div>
                </nav>
              </SelectableElement>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}