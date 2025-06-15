"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { LanguageProvider } from "@/contexts/LanguageContext"
import AuthRedirect from "@/components/auth/AuthRedirect"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { usePathname, useSearchParams } from "next/navigation"
import { LanguageKeys } from "@/translations"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAdminPage = pathname?.startsWith("/admin")
  const initialLang = (searchParams?.get("lang") as LanguageKeys) || "en"

  return (
    <ClerkProvider>
      <LanguageProvider initialLanguage={initialLang}>
        <AuthRedirect>
          {!isAdminPage && <Navbar />}
          {children}
          <Footer />
        </AuthRedirect>
      </LanguageProvider>
    </ClerkProvider>
  )
}