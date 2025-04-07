"use server"

import { supabaseAdmin } from "@/lib/supabase"

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
}

export async function syncUser(userData: {
  name: string
  email: string
  image: string
}) {
  try {
    // Check if user exists
    const { data: existingUser, error: queryError } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("email", userData.email)
      .single()

    if (queryError && queryError.code !== "PGRST116") {
      throw queryError
    }

    // Create new user if not exists
    if (!existingUser) {
      const { data, error: insertError } = await supabaseAdmin
        .from("members")
        .insert([
          {
            name: userData.name,
            email: userData.email,
            image: userData.image,
            role: "member",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError
      return { success: true, data }
    }

    return { success: true, data: existingUser }
  } catch (error: unknown) {
    console.error("Error syncing user:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
