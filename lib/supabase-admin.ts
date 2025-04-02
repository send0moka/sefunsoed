import { supabase } from "./supabase"
import { Member } from "@/types/database"

export const memberService = {
  async getAllMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getMemberById(id: string) {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async updateMember(id: string, member: Partial<Member>) {
    const { data, error } = await supabase
      .from("members")
      .update(member)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteMember(id: string) {
    const { error } = await supabase.from("members").delete().eq("id", id)

    if (error) throw error
  },
}
