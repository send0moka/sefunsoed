import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

// Ensure environment variables are properly typed and available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRole || !supabaseAnonKey) {
  throw new Error(
    `Missing environment variables: ${[
      !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
      !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      !supabaseServiceRole && "SUPABASE_SERVICE_ROLE_KEY",
    ]
      .filter(Boolean)
      .join(", ")}`
  )
}

// Create a special admin client with service role key
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRole,
  {
    auth: {
      persistSession: false,
    },
  }
)

// Keep the original anonymous client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
    },
  }
)