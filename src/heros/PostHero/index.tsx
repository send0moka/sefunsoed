'use client'

import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useLanguage } from '@/providers/LanguageProvider'
import '/node_modules/flag-icons/css/flag-icons.min.css'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, title_id } = post
  const { language, setLanguage } = useLanguage()

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  // Get current title based on selected language
  const currentTitle = language === 'en' ? title : title_id

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-span-1 col-start-1 md:col-start-2 md:col-span-2">
          <div className="mb-6 text-sm uppercase">
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

          <div className="">
            <h1 className="mb-6 text-3xl font-semibold md:text-5xl lg:text-6xl">{currentTitle}</h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
            {/* button switch en/id */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">Language</p>
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {language === 'en' ? (
                    <span className="fi fi-gb"></span>
                  ) : (
                    <span className="fi fi-id"></span>
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                  <div className="absolute left-0 mt-1 overflow-hidden border rounded-md top-full bg-white/10 backdrop-blur-md border-white/20">
                    <button
                      className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-white/20"
                      onClick={() => {
                        setLanguage('en')
                        setIsDropdownOpen(false)
                      }}
                    >
                      <span className="fi fi-gb"></span>
                    </button>
                    <button
                      className="flex items-center w-full gap-2 px-3 py-2 transition-colors hover:bg-white/20"
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
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        {/* Gradient overlay at the top */}
        <div className="absolute top-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-b from-black to-transparent" />
        {/* Gradient overlay at the bottom */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
