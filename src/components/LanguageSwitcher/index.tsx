'use client'

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import '/node_modules/flag-icons/css/flag-icons.min.css'

export const LanguageSwitcher: React.FC<{
  className?: string
  showLabel?: boolean
}> = ({ className = '', showLabel = false }) => {
  const { language, setLanguage } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center gap-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="Switch language"
      >
        {language === 'en' ? (
          <span className="fi fi-gb w-5 h-4"></span>
        ) : (
          <span className="fi fi-id w-5 h-4"></span>
        )}
        {showLabel && (
          <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ID'}</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 overflow-hidden border rounded-md top-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 shadow-lg z-50">
          <button
            className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              setLanguage('en')
              setIsDropdownOpen(false)
            }}
          >
            <span className="fi fi-gb w-5 h-4"></span>
          </button>
          <button
            className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              setLanguage('id')
              setIsDropdownOpen(false)
            }}
          >
            <span className="fi fi-id w-5 h-4"></span>
          </button>
        </div>
      )}
    </div>
  )
}
