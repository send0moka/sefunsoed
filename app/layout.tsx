import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import React, { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import AuthRedirect from "@/components/auth/AuthRedirect"
import ClientLayoutContent from "@/components/layout/ClientLayoutContent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEF UNSOED - Student English Forum",
  description: "Official website of Student English Forum UNSOED",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="id">
        <body className={inter.className}>
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageProvider>
              <AuthRedirect />
              <ClientLayoutContent>{children}</ClientLayoutContent>
            </LanguageProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
