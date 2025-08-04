'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { extractTextFromRichText } from '@/utilities/extractTextFromRichText'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'title_id'>

// Additional type for search results where title is a string
export type CardSearchData = {
  id: number
  slug?: string | null
  categories?: Array<{
    relationTo?: string | null
    categoryID?: string | null
    title?: string | null
    id?: string | null
  }> | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: number | null
  }
  title?: string | null
  title_id?: never // search results don't have title_id
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData | CardSearchData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, title_id } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  // Handle both string titles (from search) and rich text titles (from posts)
  const titleToUse =
    titleFromProps ||
    (typeof title === 'string' ? title : extractTextFromRichText(title)) ||
    extractTextFromRichText(title_id) ||
    'Untitled Post'
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
