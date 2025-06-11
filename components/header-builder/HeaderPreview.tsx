"use client"

import { HeaderConfig } from "@/types/database"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type NavigationKeys } from "@/translations"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

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

const getBackgroundClasses = (config: HeaderConfig["config"]) => {
  if (config.background.type === "transparent") {
    return ""
  }
  return config.background.color
}

export default function HeaderPreview({ config, isEditing, onEdit }: HeaderPreviewProps) {
  const { language } = useLanguage()

  return (
    <div className="space-y-8">
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 p-4">
          <header>
            {/* 
              Pindahkan class rounded ke div wrapper nav 
              agar border radius bisa terlihat
            */}
            <div className={`
              mx-auto
              ${config.layout.maxWidth}
              ${config.background.rounded}
              overflow-hidden
            `}>
              <nav className={`
                ${config.layout.display}
                ${config.layout.alignment}
                ${config.layout.padding.top}
                ${config.layout.padding.bottom}
                ${config.layout.padding.left}
                ${config.layout.padding.right}
                ${getBackgroundClasses(config)}
                ${config.background.blur}
                ${config.background.shadow}
                w-full
              `}>
                <div className={`${config.logo.width} ${config.logo.height}`}>
                  <Image
                    src="/logo.png"
                    alt="SEF UNSOED"
                    width={100}
                    height={48}
                    className={`${config.logo.brightness} ${config.logo.invert}`}
                  />
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
              </nav>
            </div>
          </header>
        </div>
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