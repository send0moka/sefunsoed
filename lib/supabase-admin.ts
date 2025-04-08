import { supabaseAdmin } from "./supabase"
import { Batch, Database, Department, Member } from "@/types/database"

export const memberService = {
  async getAllMembers() {
    const { data, error } = await supabaseAdmin
      .from("members")
      .select(`
        *,
        departments:department_id (
          name_en,
          name_id
        ),
        batches:batch_key (
          name
        )
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getMemberById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async updateMember(id: string, member: Partial<Member>) {
    const { data, error } = await supabaseAdmin
      .from("members")
      .update(member)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteMember(id: string) {
    const { error } = await supabaseAdmin.from("members").delete().eq("id", id)

    if (error) throw error
  },
}

export const departmentService = {
  async getAllDepartments() {
    const { data, error } = await supabaseAdmin
      .from("departments")
      .select(`
        *,
        members:members(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data.map(dept => ({
      ...dept,
      used: dept.members?.[0]?.count || 0
    }))
  },

  async createDepartment(department: Database["public"]["Tables"]["departments"]["Insert"]) {
    const { data, error } = await supabaseAdmin
      .from("departments")
      .insert(department)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateDepartment(id: string, department: Partial<Department>) {
    const { data, error } = await supabaseAdmin
      .from("departments")
      .update(department)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteDepartment(id: string) {
    // First update all members using this department to null
    await supabaseAdmin
      .from("members")
      .update({ department_id: null })
      .eq("department_id", id)

    const { error } = await supabaseAdmin
      .from("departments")
      .delete()
      .eq("id", id)

    if (error) throw error
  },
}

export const batchService = {
  async getAllBatches() {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .select(`
        *,
        members:members(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data.map(batch => ({
      ...batch,
      used: batch.members?.[0]?.count || 0
    }))
  },

  async createBatch(batch: Database["public"]["Tables"]["batches"]["Insert"]) {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .insert(batch)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateBatch(id: string, batch: Partial<Batch>) {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .update(batch)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteBatch(id: string) {
    // First update all members using this batch to null
    await supabaseAdmin
      .from("members")
      .update({ batch_key: null })
      .eq("batch_key", id)

    const { error } = await supabaseAdmin
      .from("batches")
      .delete()
      .eq("id", id)

    if (error) throw error
  },
}