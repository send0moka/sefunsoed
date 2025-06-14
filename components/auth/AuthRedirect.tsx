"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { authService } from "@/lib/supabase-admin"
import { ReactNode } from "react"

interface AuthRedirectProps {
  children: ReactNode
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const { isLoaded, user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    async function checkAdminAccess() {
      if (!isLoaded || !isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
        setIsChecking(false)
        return
      }

      const isAdminPage = pathname?.startsWith("/admin")
      if (!isAdminPage) {
        setIsChecking(false)
        return
      }

      try {
        const userRole = await authService.getUserRole(user.primaryEmailAddress.emailAddress)
        if (userRole !== "admin") {
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/")
      }
      
      setIsChecking(false)
    }

    checkAdminAccess()
  }, [isLoaded, isSignedIn, user, router, pathname])

  if (isChecking) {
    return null
  }

  // Return children instead of null
  return <>{children}</>
}
