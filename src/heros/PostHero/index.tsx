'use client'

import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { LanguageAwareTitle } from '@/components/LanguageAwareTitle'
import { ShareButtons } from '@/components/ShareButtons'
import { extractTextFromRichText } from '@/utilities/extractTextFromRichText'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, title_id, slug } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const [currentUrl, setCurrentUrl] = React.useState('')

  // Effect to set the correct URL after component mounts
  React.useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      // Construct the full URL using current domain and post slug
      const protocol = window.location.protocol
      const host = window.location.host
      const fullUrl = `${protocol}//${host}/posts/${slug}`

      // Debug log for production troubleshooting
      console.log('PostHero URL Debug:', {
        slug,
        protocol,
        host,
        fullUrl,
        currentLocation: window.location.href,
      })

      setCurrentUrl(fullUrl)
    }
  }, [slug])

  const postTitle =
    typeof title === 'string' ? title : extractTextFromRichText(title) || 'Untitled Post'
  const postDescription = post.meta?.description || ''

  return (
    <div className="container">
      <div className="max-w-[48rem] mx-auto">
        <div className="mb-6 text-sm uppercase w-fit py-1 px-2 bg-neutral-600 text-white">
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
                <p className="text-neutral-900 dark:text-white">
                  {formatAuthors(populatedAuthors)}
                </p>
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
                  year: 'numeric',
                })}
              </time>
            </div>
          )}
        </div>
        {heroImage && typeof heroImage !== 'string' && (
          <Media resource={heroImage} imgClassName="w-full h-auto rounded-xl" />
        )}
        {currentUrl && (
          <div className="mt-6">
            <ShareButtons url={currentUrl} title={postTitle} description={postDescription} />
          </div>
        )}
      </div>
    </div>
  )
}
