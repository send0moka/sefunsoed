export interface Member {
  id: string
  name: string
  email: string
  image: string
  role: "admin" | "member"
  instagram?: string
  linkedin?: string
  department_id?: string
  batch_key?: string
  created_at: string
  departments?: {
    name_en: string
    name_id: string
  } | null
  batches?: {
    name: string
  } | null
}

export interface Department {
  id: string
  name_en: string
  name_id: string
  created_at: string
  used?: number
}

export interface Batch {
  id: string
  name: string
  key: string
  created_at: string
  used?: number
}

export interface Database {
  public: {
    Tables: {
      members: {
        Row: Member
        Insert: Omit<Member, "id">
        Update: Partial<Member>
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
