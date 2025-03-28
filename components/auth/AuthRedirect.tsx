"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthRedirect() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if the user's email is the admin email
      const primaryEmail = user.primaryEmailAddress?.emailAddress

      if (primaryEmail === "jehianathayata@gmail.com") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    }
  }, [isLoaded, isSignedIn, user, router])

  return null // This component doesn't render anything
}
