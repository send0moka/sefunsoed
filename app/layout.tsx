import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React, { Suspense } from "react"
import ClientLayout from "./client-layout"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"

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
    <html lang="id">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
