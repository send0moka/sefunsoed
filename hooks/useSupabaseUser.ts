"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { syncUser } from "@/app/actions/user" // Import the server action

export const useSupabaseUser = () => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const syncUserWithSupabase = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const userEmail = user.primaryEmailAddress?.emailAddress
        if (!userEmail) {
          throw new Error('User email not found')
        }

        // Call the server action instead of directly accessing Supabase
        const result = await syncUser({
          name: user.fullName || '',
          email: userEmail,
          image: user.imageUrl || '',
        })

        if (!result.success) {
          throw new Error(result.error || 'Failed to sync user')
        }

        setIsLoading(false)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setIsLoading(false)
      }
    }

    syncUserWithSupabase()
  }, [user])

  return { isLoading, error }
}