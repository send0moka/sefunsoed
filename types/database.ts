export interface User {
  id: string
  name: string
  email: string
  image: string
  role: "admin" | "visitor" | "member"
  department_id?: string
  batch_key?: string
  instagram?: string
  linkedin?: string
  created_at: string
  last_sign_in?: string
  is_anonymous: boolean
  is_sso_user: boolean
  departments?: Department
  batches?: Batch
}

export interface Department {
  id: string
  name_en: string
  name_id: string
}

export interface Batch {
  key: string
  name: string
}

export interface Database {
  public: {
    Tables: {
      users: {  // Changed from members
        Row: User
        Insert: Omit<User, "id">
        Update: Partial<User>
      }
      departments: {
        Row: Department
        Insert: Omit<Department, "id" | "created_at">
        Update: Partial<Department>
      }
      batches: {
        Row: Batch
        Insert: Omit<Batch, "id" | "created_at">
        Update: Partial<Batch>
      }
    }
  }
}
