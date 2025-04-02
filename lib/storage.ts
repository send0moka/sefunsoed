import { supabase } from "./supabase"

export async function uploadUserImage(
  userId: string,
  file: File
): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)
    return data.publicUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}
