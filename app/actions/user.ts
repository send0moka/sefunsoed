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
      .from("members")
      .select("*")
      .eq("email", userData.email)
      .single()

    if (queryError && queryError.code !== "PGRST116") {
      throw queryError
    }

    if (!existingUser) {
      // Create new user
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
    } else {
      // Update existing user's image if it has changed
      if (existingUser.image !== userData.image) {
        const { data, error: updateError } = await supabaseAdmin
          .from("members")
          .update({ image: userData.image })
          .eq("id", existingUser.id)
          .select()
          .single()

        if (updateError) throw updateError
        return { success: true, data }
      }
    }

    return { success: true, data: existingUser }
  } catch (error: unknown) {
    console.error("Error syncing user:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
