'use client'

import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Monitor, Sun, Moon } from 'lucide-react'
import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

// Custom SelectItem without check icon and with active background
const CustomSelectItem: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
  isActive?: boolean
}> = ({ children, className, value, isActive, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center justify-center rounded py-2 px-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      isActive && 'bg-primary text-primary-foreground',
      className,
    )}
    value={value}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  const getThemeIcon = () => {
    switch (value) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto gap-2 pl-0 bg-transparent border-none md:pl-3"
      >
        <SelectValue placeholder="Theme">{getThemeIcon()}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-auto min-w-0">
        <CustomSelectItem value="auto" isActive={value === 'auto'}>
          <Monitor className="w-4 h-4" />
        </CustomSelectItem>
        <CustomSelectItem value="light" isActive={value === 'light'}>
          <Sun className="w-4 h-4" />
        </CustomSelectItem>
        <CustomSelectItem value="dark" isActive={value === 'dark'}>
          <Moon className="w-4 h-4" />
        </CustomSelectItem>
      </SelectContent>
    </Select>
  )
}
