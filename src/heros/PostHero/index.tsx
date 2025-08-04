'use client'

import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useLanguage } from '@/providers/LanguageProvider'
import { LanguageAwareTitle } from '@/components/LanguageAwareTitle'
import '/node_modules/flag-icons/css/flag-icons.min.css'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, title_id } = post
  const { language, setLanguage } = useLanguage()

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <div className="container py-8">
      <div className="max-w-[48rem] mx-auto">
        <div className="mb-6 text-sm uppercase text-neutral-600">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category

              const titleToUse = categoryTitle || 'Untitled category'

              const isLast = index === categories.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div>

        <div className="mb-6">
          <LanguageAwareTitle
            englishTitle={title}
            indonesianTitle={title_id}
            className="mb-6 text-3xl font-semibold md:text-5xl lg:text-6xl text-neutral-900"
            as="h1"
            enableGutter={false}
            fallbackText="Untitled Post"
          />
        </div>

        

        <div className="flex flex-col mb-4 gap-4 md:flex-row md:gap-16">
          {hasAuthors && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-600 dark:text-white/60">Author</p>
                <p className="text-neutral-900 dark:text-white">{formatAuthors(populatedAuthors)}</p>
              </div>
            </div>
          )}
          {publishedAt && (
            <div className="flex flex-col gap-1">
              <p className="text-sm text-neutral-600 dark:text-white/60">Date Published</p>
              <time dateTime={publishedAt} className="text-neutral-900 dark:text-white">
                {new Date(publishedAt).toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </time>
            </div>
          )}
          {/* button switch en/id */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-600 dark:text-white/60">Language</p>
            <div className="relative">
              <button
                className="flex items-center gap-2 text-neutral-900"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {language === 'en' ? (
                  <span className="fi fi-gb"></span>
                ) : (
                  <span className="fi fi-id"></span>
                )}
                <svg
                  className={`w-4 h-4 transition-transform text-neutral-900 dark:text-white ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 overflow-hidden border rounded-md top-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 shadow-lg">
                  <button
                    className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-neutral-100"
                    onClick={() => {
                      setLanguage('en')
                      setIsDropdownOpen(false)
                    }}
                  >
                    <span className="fi fi-gb"></span>
                  </button>
                  <button
                    className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-neutral-100"
                    onClick={() => {
                      setLanguage('id')
                      setIsDropdownOpen(false)
                    }}
                  >
                    <span className="fi fi-id"></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {heroImage && typeof heroImage !== 'string' && (

            <Media resource={heroImage} imgClassName="w-full h-auto rounded-xl" />

        )}
      </div>
    </div>
  )
}
