import { supabaseAdmin } from "./supabase"
import { Batch, Database, Department, HeaderConfig, User } from "@/types/database"

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
      .from('users')
      .insert([user]) // Note: Wrap user in array
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error('No data returned from insert operation')
    }

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

export const headerConfigService = {
  async getAllConfigs() {
    const { data, error } = await supabaseAdmin
      .from('header_configs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getActiveConfig() {
    const { data, error } = await supabaseAdmin
      .from('header_configs')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data
  },

  async createConfig(config: Database['public']['Tables']['header_configs']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('header_configs')
      .insert(config)
      .select()
      .single()

    if (error) throw error
    return data
  },

  update: async (id: string, config: HeaderConfig["config"]) => {
    if (!id) {
      console.error('Missing id parameter');
      throw new Error('ID is required for update');
    }

    if (!config) {
      console.error('Missing config parameter');
      throw new Error('Config is required for update');
    }

    try {
      // Changed table name from 'header_config' to 'header_configs'
      const { data, error } = await supabaseAdmin
        .from('header_configs')  // Fix: Changed from header_config to header_configs
        .update({ 
          config,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from update');
      }

      console.log('Update successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Update error:', {
        name: error instanceof Error ? error.name : 'Unknown error',
        message: error instanceof Error ? error.message : String(error),
        details: error
      });

      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error during update') 
      };
    }
  },

  async setActiveConfig(id: string) {
    // First deactivate all configs
    await supabaseAdmin
      .from('header_configs')
      .update({ is_active: false })
      .neq('id', id)

    // Then activate the selected config
    const { error } = await supabaseAdmin
      .from('header_configs')
      .update({ is_active: true })
      .eq('id', id)

    if (error) throw error
  },

  async deleteConfig(id: string) {
    const { error } = await supabaseAdmin
      .from('header_configs')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async initializeDefaultConfig() {
    const defaultConfig = {
      background: {
        type: "solid" as const,
        color: "bg-black/90",
        blur: "backdrop-blur-sm",
        shadow: "shadow-lg",
        rounded: "rounded-full"
      },
      layout: {
        padding: {
          top: "py-1",
          bottom: "py-1",
          left: "px-6",
          right: "px-8"
        },
        position: "fixed",
        maxWidth: "max-w-6xl",
        display: "flex",
        alignment: "items-center justify-between"
      },
      logo: {
        width: "w-[100px]",
        height: "h-12",
        brightness: "brightness-0",
        invert: "invert"
      },
      navigation: {
        fontSize: "text-sm",
        fontWeight: "font-semibold",
        textColor: "text-gray-50",
        hoverColor: "hover:text-indigo-600",
        activeColor: "text-indigo-600",
        spacing: "space-x-12"
      },
      buttons: {
        primary: {
          backgroundColor: "bg-indigo-600",
          textColor: "text-white",
          hoverBackgroundColor: "hover:bg-indigo-700",
          hoverTextColor: "hover:text-white",
          borderRadius: "rounded-full",
          padding: "px-4 py-3"
        },
        language: {
          backgroundColor: "bg-gray-100",
          textColor: "text-gray-700",
          borderRadius: "rounded-full"
        }
      }
    }

    try {
      // Cek apakah sudah ada konfigurasi
      const { data: existing } = await supabaseAdmin
        .from('header_configs')
        .select('*')
        .limit(1)

      if (!existing || existing.length === 0) {
        // Jika belum ada, buat konfigurasi baru
        const { data, error } = await supabaseAdmin
          .from('header_configs')
          .insert({
            name: 'Default Header',
            is_active: true,
            config: defaultConfig
          })
          .select()
          .single()

        if (error) throw error
        return data
      } else if (!existing[0].is_active) {
        // Jika ada tapi tidak aktif, update menjadi aktif
        const { data, error } = await supabaseAdmin
          .from('header_configs')
          .update({ is_active: true })
          .eq('id', existing[0].id)
          .select()
          .single()

        if (error) throw error
        return data
      }

      return existing[0]
    } catch (error) {
      console.error('Error initializing header config:', error)
      throw error
    }
  }
}

export { supabaseAdmin }
