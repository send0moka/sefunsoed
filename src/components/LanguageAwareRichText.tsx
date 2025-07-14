'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { useLanguage } from '@/providers/LanguageProvider'
import { Post } from '@/payload-types'

interface LanguageAwareRichTextProps {
  englishContent: Post['content']
  indonesianContent: Post['content']
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

  const currentContent = language === 'en' ? englishContent : indonesianContent

  return <RichText className={className} data={currentContent} enableGutter={enableGutter} />
}
