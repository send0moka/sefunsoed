'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: mainTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    // Use headerTheme if available, otherwise use mainTheme
    const themeToUse = headerTheme || mainTheme
    if (themeToUse && themeToUse !== theme) setTheme(themeToUse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme, mainTheme])

  // Get logo size classes based on configuration
  const getLogoSizeClasses = (size?: string | null) => {
    switch (size) {
      case 'small':
        return 'h-10 w-auto max-w-[140px] md:max-w-[180px]'
      case 'large':
        return 'h-14 w-auto max-w-[200px] md:max-w-[240px]'
      default: // medium
        return 'h-12 w-auto max-w-[160px] md:max-w-[200px]'
    }
  }

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          {data?.logo && typeof data.logo === 'object' ? (
            <Media
              resource={data.logo}
              className="block"
              imgClassName={`${getLogoSizeClasses(data.logoSize)} object-contain invert dark:invert-0`}
              loading="eager"
              priority
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
