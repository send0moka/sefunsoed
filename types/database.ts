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
      users: {
        // Changed from members
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
      header_configs: {
        Row: HeaderConfig
        Insert: Omit<HeaderConfig, "id" | "created_at" | "updated_at">
        Update: Partial<HeaderConfig>
      }
    }
  }
}

export interface HeaderConfig {
  id: string
  name: string
  is_active: boolean
  config: {
    background: {
      type: "solid" | "gradient" | "transparent"
      color?: string
      blur?: string
      shadow?: string
      rounded?: string
    }
    layout: {
      padding: {
        top: string
        bottom: string
        left: string
        right: string
      }
      position: string
      maxWidth: string
      display: string
      alignment: string
    }
    logo: {
      width: string
      height: string
      brightness: string
      invert: string
    }
    navigation: {
      fontSize: string
      fontWeight: string
      textColor: string
      hoverColor: string
      activeColor: string
      spacing: number
    }
    buttons: {
      primary: {
        backgroundColor: string
        textColor: string
        hoverBackgroundColor: string
        hoverTextColor: string
        borderRadius: string
        padding: string
      }
      language: {
        backgroundColor: string
        textColor: string
        borderRadius: string
      }
    }
    Update: Partial<HeaderConfig>
  }
}
