"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthRedirect() {
  const { isLoaded, user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isAdminPage = pathname?.startsWith("/admin")
    const isAdminUser = user?.primaryEmailAddress?.emailAddress === "jehianathayata@gmail.com"

    if (isLoaded && isAdminPage) {
      // Only redirect from admin pages if user is not admin
      if (!isSignedIn || !isAdminUser) {
        router.push("/")
      }
    }
  }, [isLoaded, isSignedIn, user, router, pathname])

  return null
}
