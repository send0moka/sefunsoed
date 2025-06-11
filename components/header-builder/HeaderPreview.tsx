"use client"

import { HeaderConfig } from "@/types/database"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type NavigationKeys } from "@/translations"

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
  onEdit?: () => void
}

export default function HeaderPreview({ config, isEditing, onEdit }: HeaderPreviewProps) {
  const { language } = useLanguage()

  return (
    <div className="space-y-8">
      <div className="relative h-[200px] bg-gray-100 rounded-lg">
        <header className={`w-full ${config.layout.position} ${config.layout.maxWidth}`}>
          <nav className={`
            ${config.layout.display}
            ${config.layout.alignment}
            ${config.layout.padding.top}
            ${config.layout.padding.bottom}
            ${config.layout.padding.left}
            ${config.layout.padding.right}
            ${config.background.color}
            ${config.background.blur}
            ${config.background.rounded}
            ${config.background.shadow}
          `}>
            <div className="flex lg:flex-1">
              <div className={`${config.logo.width} ${config.logo.height}`}>
                <Image
                  src="/logo.png"
                  alt="SEF UNSOED"
                  width={100}
                  height={48}
                  className={`${config.logo.brightness} ${config.logo.invert}`}
                />
              </div>
            </div>

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

            <div className="flex items-center gap-4">
              <div
                className={`${config.buttons.language.backgroundColor} ${config.buttons.language.textColor} ${config.buttons.language.borderRadius} p-3 cursor-default`}
              >
                {language.toUpperCase()}
              </div>

              <div
                className={`${config.buttons.primary.backgroundColor} text-white ${config.buttons.primary.borderRadius} ${config.buttons.primary.padding} cursor-default`}
              >
                Sign In
              </div>
            </div>
          </nav>
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