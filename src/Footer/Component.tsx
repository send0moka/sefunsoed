import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { VisitorsTable } from '@/components/VisitorsTable'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col space-y-6">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          {/* Visitors Table */}
          <div className="lg:max-w-xs">
            <VisitorsTable />
          </div>
        </div>

        <div className="flex flex-col-reverse items-start lg:flex-row gap-4 lg:items-center">
          <ThemeSelector />
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
