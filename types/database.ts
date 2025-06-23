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
    elements: {
      id: string
      type: 'container' | 'image' | 'text' | 'button'
      name: string
      props: {
        className?: string
        children?: string[]
        // Image specific props
        src?: string
        alt?: string
        width?: number
        height?: number
        // Text specific props
        content?: string
        fontSize?: string
        fontWeight?: string
        color?: string
        // Button specific props
        label?: string
        variant?: 'primary' | 'secondary' | 'language'
        onClick?: string
        // Container specific props
        display?: string
        padding?: string
        margin?: string
        alignment?: string
        maxWidth?: string
      }
    }[]
    desktop?: { hidden?: boolean }
    tablet?: { hidden?: boolean }
    mobile?: { hidden?: boolean }
    typography?: {
      desktop?: {
        fontFamily?: string
      }
      tablet?: {
        fontFamily?: string
      }
      mobile?: {
        fontFamily?: string
      }
    }
    sticky?: {
      enabled: boolean
    }
    animation?: {
      enabled: boolean
    }
    border?: {
      color?: string
    }
    logo: {
      width: string
      height: string | null
      invert: string
      brightness: string
      alt: string
    }
    layout: {
      display: string
      padding: {
        top: string
        left: string
        right: string
        bottom: string
      }
      maxWidth: string
      position: string
      alignment: string
    }
    background?: {
      blur: string
      type: 'solid' | 'gradient' | 'transparent'
      color: string
      shadow: string
      rounded: string
      gradientTo?: string
      gradientDirection?: string
    }
    navigation: {
      spacing: string
      fontSize: string
      textColor: string
      fontWeight: string
      hoverColor: string
      activeColor: string
      layout: string
      menuItems: Array<{
        name_en: string
        name_id: string
        url: string
      }>
    }
    buttons: {
      primary: {
        [x: string]: string | number | readonly string[] | undefined
        padding: string
        textColor: string
        borderRadius: string
        hoverTextColor: string
        backgroundColor: string
        hoverBackgroundColor: string
      }
      language: {
        textColor: string
        borderRadius: string
        backgroundColor: string
      }
    }
  }
}
