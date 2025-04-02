export interface Member {
  id: string
  name: string
  email: string
  image: string
  role: "admin" | "member"
  department?: string
  batch?: string
  instagram?: string
  linkedin?: string
  department_key?: string
  batch_key?: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      members: {
        Row: Member
        Insert: Omit<Member, "id">
        Update: Partial<Member>
      }
    }
  }
}
