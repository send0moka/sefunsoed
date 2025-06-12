import { HeaderConfig } from "@/types/database"

export function validateHeaderConfig(config: HeaderConfig["config"]): boolean {
  const isTailwindClass = (value: string) => {
    const validPrefixes = [
      'bg-', 'text-', 'p-', 'px-', 'py-', 'rounded-', 'shadow-', 'hover:', 
      'max-w-', 'flex', 'grid', 'items-', 'justify-', 'space-', 'font-',
      'w-', 'h-', 'min-', 'max-', 'border-', 'opacity-', 'transform-'
    ]
    return validPrefixes.some(prefix => value.startsWith(prefix)) || value === ''
  }

  try {
    // Check background
    if (!config.background || !["solid", "gradient", "transparent"].includes(config.background.type)) {
      return false
    }
    if (!isTailwindClass(config.background.color)) return false
    if (!isTailwindClass(config.background.blur)) return false
    if (!isTailwindClass(config.background.shadow)) return false
    if (!isTailwindClass(config.background.rounded)) return false

    // Check layout
    if (!isTailwindClass(config.layout.display)) return false
    if (!isTailwindClass(config.layout.maxWidth)) return false
    if (!isTailwindClass(config.layout.alignment)) return false
    Object.values(config.layout.padding).forEach(p => {
      if (!isTailwindClass(p)) return false
    })

    // Check navigation
    if (!isTailwindClass(config.navigation.spacing)) return false
    if (!isTailwindClass(config.navigation.fontSize)) return false
    if (!isTailwindClass(config.navigation.textColor)) return false
    if (!isTailwindClass(config.navigation.fontWeight)) return false
    if (!isTailwindClass(config.navigation.hoverColor)) return false
    if (!isTailwindClass(config.navigation.activeColor)) return false

    // Check buttons
    if (!isTailwindClass(config.buttons.primary.padding)) return false
    if (!isTailwindClass(config.buttons.primary.textColor)) return false
    if (!isTailwindClass(config.buttons.primary.borderRadius)) return false
    if (!isTailwindClass(config.buttons.primary.backgroundColor)) return false
    if (!isTailwindClass(config.buttons.primary.hoverBackgroundColor)) return false
    if (!isTailwindClass(config.buttons.primary.hoverTextColor)) return false

    if (!isTailwindClass(config.buttons.language.textColor)) return false
    if (!isTailwindClass(config.buttons.language.borderRadius)) return false
    if (!isTailwindClass(config.buttons.language.backgroundColor)) return false

    return true
  } catch (error) {
    console.error("Config validation failed:", error)
    return false
  }
}