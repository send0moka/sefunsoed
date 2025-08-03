import type { FieldHook } from 'payload'
import { extractTextFromRichText } from '@/utilities/extractTextFromRichText'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      // Handle rich text object
      if (fallbackData && typeof fallbackData === 'object') {
        const extractedText = extractTextFromRichText(fallbackData)
        if (extractedText) {
          return formatSlug(extractedText)
        }
      }

      // Handle string (legacy support)
      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
