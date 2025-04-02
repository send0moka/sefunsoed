"use client"

import { LanguageProvider } from "@/contexts/LanguageContext"
import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import AuthRedirect from "@/components/auth/AuthRedirect"
import ClientLayoutContent from "@/components/layout/ClientLayoutContent"
import { useSupabaseUser } from '@/hooks/useSupabaseUser'

// Create a new component inside ClerkProvider to use the hook
function ClerkProviderContent({ children }: { children: React.ReactNode }) {
  // Now the hook is used within ClerkProvider
  useSupabaseUser()
  
  return (
    <LanguageProvider>
      <AuthRedirect />
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </LanguageProvider>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ClerkProviderContent>{children}</ClerkProviderContent>
    </ClerkProvider>
  )
}