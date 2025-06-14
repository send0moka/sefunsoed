"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { LanguageProvider } from "@/contexts/LanguageContext"
import AuthRedirect from "@/components/auth/AuthRedirect"
import Navbar from "@/components/layout/Navbar"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <ClerkProvider>
      <LanguageProvider>
        <AuthRedirect>
          {!isAdminPage && <Navbar />}
          {children}
        </AuthRedirect>
      </LanguageProvider>
    </ClerkProvider>
  )
}