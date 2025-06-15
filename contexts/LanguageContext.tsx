"use client"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { LanguageKeys } from "@/translations"

type LanguageContextType = {
  language: LanguageKeys
  setLanguage: (lang: LanguageKeys) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children,
  initialLanguage = "en"
}: { 
  children: React.ReactNode
  initialLanguage?: LanguageKeys 
}) {
  const [language, setLanguage] = useState<LanguageKeys>(initialLanguage)
  const router = useRouter()

  const handleSetLanguage = (lang: LanguageKeys) => {
    setLanguage(lang)
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set("lang", lang)
    router.push(currentUrl.pathname + currentUrl.search)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
