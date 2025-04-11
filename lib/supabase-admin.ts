import { supabaseAdmin } from "./supabase"
import { Batch, Database, Department, User } from "@/types/database"

export const userService = {
  async getAllUsers() {
    const { data, error } = await supabaseAdmin
      .from("users")
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

  async getUserById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async updateUser(id: string, user: Partial<User>) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .update(user)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteUser(id: string) {
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", id)

    if (error) throw error
  },

  async createUser(user: Database["public"]["Tables"]["users"]["Insert"]) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .insert(user)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

export const departmentService = {
  async getAllDepartments() {
    const { data, error } = await supabaseAdmin
      .from("departments")
      .select(`
        *,
        users:users(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data.map(dept => ({
      ...dept,
      used: dept.users?.[0]?.count || 0
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
    // First update all users using this department to null
    await supabaseAdmin
      .from("users")
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
        users:users(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data.map(batch => ({
      ...batch,
      used: batch.users?.[0]?.count || 0
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
    // First update all users using this batch to null
    await supabaseAdmin
      .from("users")
      .update({ batch_key: null })
      .eq("batch_key", id)

    const { error } = await supabaseAdmin
      .from("batches")
      .delete()
      .eq("id", id)

    if (error) throw error
  },
}

export const authService = {
  async getUserRole(email: string) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("email", email)
      .single()

    if (error) return null
    return data?.role
  }
}