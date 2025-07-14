'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { useLanguage } from '@/providers/LanguageProvider'
import { Post } from '@/payload-types'

interface LanguageAwareRichTextProps {
  englishContent: Post['content']
  indonesianContent: Post['content'] | null | undefined
  className?: string
  enableGutter?: boolean
}

export const LanguageAwareRichText: React.FC<LanguageAwareRichTextProps> = ({
  englishContent,
  indonesianContent,
  className,
  enableGutter = false,
}) => {
  const { language } = useLanguage()

  // Fallback to English content if Indonesian content is null/undefined
  const currentContent = language === 'en' ? englishContent : indonesianContent || englishContent

  return <RichText className={className} data={currentContent} enableGutter={enableGutter} />
}
