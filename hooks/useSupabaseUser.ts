"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
import { PostgrestError } from "@supabase/supabase-js"

export const useSupabaseUser = () => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const syncUserWithSupabase = async () => {
      if (!user) {
        console.log("No user found")
        setIsLoading(false)
        return
      }

      try {
        const userEmail = user.primaryEmailAddress?.emailAddress
        if (!userEmail) {
          throw new Error('User email not found')
        }

        console.log("Attempting to sync user:", userEmail)

        // Check if user already exists
        const { data: existingUser, error: queryError } = await supabase
          .from("members")
          .select("id")
          .eq("email", userEmail)
          .single()

        if (queryError) {
          console.log("Query error details:", queryError)
          if (queryError.code !== 'PGRST116') { // Not found is ok
            throw queryError
          }
        }

        if (!existingUser) {
          console.log("Creating new user record")
          const { data: newUser, error: insertError } = await supabase
            .from("members")
            .insert([
              {
                name: user.fullName || '',
                email: userEmail,
                image: user.imageUrl || '',
                role: "member",
                created_at: new Date().toISOString(),
              },
            ])
            .select()
            .single()

          if (insertError) {
            console.log("Insert error details:", insertError)
            throw insertError
          }

          console.log('New user created successfully:', newUser)
        }

        setIsLoading(false)
      } catch (err) {
        const pgError = err as PostgrestError
        const errorMessage = pgError.message || 'Unknown error occurred'
        console.error('Detailed error:', pgError)
        setError(errorMessage)
        setIsLoading(false)
      }
    }

    syncUserWithSupabase()
  }, [user])

  return { isLoading, error }
}