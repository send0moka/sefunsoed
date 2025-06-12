"use client"

import { HeaderConfig } from "@/types/database"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type NavigationKeys } from "@/translations"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import SelectableElement from "./SelectableElement"
import { DragEvent } from 'react'

type ViewportType = "desktop" | "tablet" | "mobile" // Add ViewportType definition

const navigation: { name: NavigationKeys; href: string }[] = [
  { name: "about", href: "/about" },
  { name: "programs", href: "/programs" },
  { name: "registration", href: "/registration" },
  { name: "services", href: "/services" },
  { name: "content", href: "/content" },
  { name: "media", href: "/media" },
]

type HeaderPreviewProps = {
  config: HeaderConfig["config"]
  isEditing: boolean
  viewport?: ViewportType
  onEdit?: () => void
  onSelectElement?: (elementType: string | null) => void
  selectedElement?: string | null
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
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
  isEditing, 
  onEdit,
  onSelectElement,
  selectedElement,
  onDrop,
  onDragOver
}: HeaderPreviewProps) {
  const { language } = useLanguage()

  const containerClasses = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto'
  }

  return (
    <div 
      className="h-full p-8 overflow-auto"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className={`${containerClasses[viewport || 'desktop']} transition-all duration-300`}>
        <header className={`
          relative bg-white shadow-md
          ${config?.desktop?.hidden && viewport === 'desktop' ? 'hidden' : ''}
          ${config?.tablet?.hidden && viewport === 'tablet' ? 'hidden' : ''}
          ${config?.mobile?.hidden && viewport === 'mobile' ? 'hidden' : ''}
        `}>
          {/* Wrapper div untuk rounded tanpa overflow hidden */}
          <div className={`mx-auto ${config.layout.maxWidth}`}>
            {/* Inner div untuk efek rounded dengan overflow hidden */}
            <div className={`${config.background?.rounded ?? ''} overflow-hidden`}>
              <SelectableElement
                isSelected={selectedElement === 'navbar'}
                onClick={() => onSelectElement?.('navbar')}
                elementType="Navigation Bar"
              >
                <nav className={`
                  ${config.layout.display}
                  ${config.layout.alignment}
                  ${config.layout.padding.top}
                  ${config.layout.padding.bottom}
                  ${config.layout.padding.left}
                  ${config.layout.padding.right}
                  ${getBackgroundClasses(config)}
                  ${config.background?.blur}
                  ${config.background?.shadow}
                  w-full
                `}>
                  <SelectableElement
                    isSelected={selectedElement === 'logo'}
                    onClick={() => onSelectElement?.('logo')}
                    elementType="Logo"
                  >
                    <div className={`${config.logo.width} ${config.logo.height}`}>
                      <Image
                        src="/logo.png"
                        alt="SEF UNSOED"
                        width={100}
                        height={48}
                        className={`${config.logo.brightness} ${config.logo.invert}`}
                      />
                    </div>
                  </SelectableElement>

                  <SelectableElement
                    isSelected={selectedElement === 'navigation'}
                    onClick={() => onSelectElement?.('navigation')}
                    elementType="Navigation Links"
                  >
                    <div className="hidden lg:flex lg:gap-x-12">
                      {navigation.map((item) => (
                        <span
                          key={item.name}
                          className={`cursor-default text-white ${config.navigation.fontSize} ${config.navigation.fontWeight} ${config.navigation.hoverColor}`}
                        >
                          {translations[language].navigation[item.name]}
                        </span>
                      ))}
                    </div>
                  </SelectableElement>

                  <SelectableElement
                    isSelected={selectedElement === 'buttons'}
                    onClick={() => onSelectElement?.('buttons')}
                    elementType="Action Buttons"
                  >
                    <div className="flex items-center gap-4">
                      <div className="hidden lg:flex items-center gap-6">
                        <div
                          className={`flex items-center gap-2 p-3 ${config.buttons.language.borderRadius} ${config.buttons.language.backgroundColor} hover:bg-gray-200 transition-all duration-300`}
                        >
                          <div className="flex items-center gap-2 w-[50px] justify-center">
                            <Image
                              src={language === "en" ? "/flags/uk.png" : "/flags/id.png"}
                              alt={language === "en" ? "English" : "Indonesia"}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-700 min-w-[20px]">
                              {language.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-2 ${config.buttons.primary.padding} ${config.buttons.primary.borderRadius} ${config.buttons.primary.backgroundColor} ${config.buttons.primary.textColor} hover:${config.buttons.primary.hoverBackgroundColor} transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-default`}
                        >
                          <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">Sign In</span>
                        </div>
                      </div>
                    </div>
                  </SelectableElement>
                </nav>
              </SelectableElement>
            </div>
          </div>
        </header>
      </div>

      {!isEditing && (
        <div className="flex justify-center">
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit Header
          </button>
        </div>
      )}
    </div>
  )
}