import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  // Get logo size classes based on configuration
  const getLogoSizeClasses = (size?: string | null) => {
    switch (size) {
      case 'small':
        return 'h-8 w-auto max-w-[120px] md:max-w-[140px]'
      case 'large':
        return 'h-12 w-auto max-w-[180px] md:max-w-[200px]'
      default: // medium
        return 'h-10 w-auto max-w-[140px] md:max-w-[160px]'
    }
  }

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col space-y-6">
          <Link className="flex items-center" href="/">
            {footerData?.logo && typeof footerData.logo === 'object' ? (
              <Media
                resource={footerData.logo}
                className="block"
                imgClassName={`${getLogoSizeClasses(footerData.logoSize)} object-contain`}
                loading="lazy"
              />
            ) : (
              <Logo />
            )}
          </Link>
        </div>

        <div className="flex flex-col-reverse items-start lg:flex-row gap-4 lg:items-center">
          {footerData?.showThemeSelector && <ThemeSelector />}
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
