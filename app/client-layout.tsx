"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { LanguageProvider } from "@/contexts/LanguageContext"
import AuthRedirect from "@/components/auth/AuthRedirect"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { usePathname } from "next/navigation" 
import { Suspense } from "react"

function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      <Footer />
    </>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageProvider>
          <AuthRedirect>
            <ClientLayoutContent>{children}</ClientLayoutContent>
          </AuthRedirect>
        </LanguageProvider>
      </Suspense>
    </ClerkProvider>
  )
}