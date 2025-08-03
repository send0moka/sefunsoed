'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { useLanguage } from '@/providers/LanguageProvider'
import { Post } from '@/payload-types'
import { extractTextFromRichText } from '@/utilities/extractTextFromRichText'

interface LanguageAwareTitleProps {
  englishTitle: Post['title']
  indonesianTitle: Post['title_id']
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  enableGutter?: boolean
  fallbackText?: string
}

export const LanguageAwareTitle: React.FC<LanguageAwareTitleProps> = ({
  englishTitle,
  indonesianTitle,
  className,
  as: Component = 'h1',
  enableGutter = false,
  fallbackText = 'Untitled',
}) => {
  const { language } = useLanguage()

  // Determine which title to use based on language
  const currentTitle = language === 'en' ? englishTitle : indonesianTitle || englishTitle

  // If no rich text content, use fallback
  if (!currentTitle) {
    return <Component className={className}>{fallbackText}</Component>
  }

  // Check if there's actually content in the rich text
  const plainText = extractTextFromRichText(currentTitle)
  if (!plainText.trim()) {
    return <Component className={className}>{fallbackText}</Component>
  }

  // Render as rich text in the specified component wrapper
  return (
    <Component className={className}>
      <RichText data={currentTitle} enableGutter={enableGutter} />
    </Component>
  )
}

export default LanguageAwareTitle
