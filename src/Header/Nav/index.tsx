'use client'

import React, { useState, useEffect, useRef } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
        <LanguageSwitcher />
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden" ref={mobileMenuRef}>
        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-primary hover:text-primary/80 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50">
            <nav className="container py-4 flex flex-col gap-4">
              {navItems.map(({ link }, i) => {
                return (
                  <div key={i} onClick={() => setIsMobileMenuOpen(false)}>
                    <CMSLink {...link} appearance="link" className="py-2 text-base" />
                  </div>
                )
              })}
              <Link
                href="/search"
                className="flex items-center gap-2 py-2 text-base text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <SearchIcon className="w-5" />
                <span>Search</span>
              </Link>
              <div className="py-2">
                <LanguageSwitcher showLabel={true} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  )
}
