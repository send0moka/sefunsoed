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
    const { data: existingUser, error: queryError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", userData.email)
      .single()

    if (queryError && queryError.code !== "PGRST116") {
      throw queryError
    }

    if (!existingUser) {
      // Create new user
      const { data, error: insertError } = await supabaseAdmin
        .from("users")
        .insert([
          {
            name: userData.name,
            email: userData.email,
            image: userData.image,
            role: "visitor",
            created_at: new Date().toISOString(),
            last_sign_in: new Date().toISOString(), // Add initial sign-in time
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError
      return { success: true, data }
    } else {
      // Update existing user's image and last_sign_in
      const { data, error: updateError } = await supabaseAdmin
        .from("users")
        .update({ 
          image: userData.image,
          last_sign_in: new Date().toISOString() // Update sign-in time
        })
        .eq("id", existingUser.id)
        .select()
        .single()

      if (updateError) throw updateError
      return { success: true, data }
    }
  } catch (error: unknown) {
    console.error("Error syncing user:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
