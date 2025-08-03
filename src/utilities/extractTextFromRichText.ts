import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Post } from '@/payload-types'

/**
 * Extract plain text from rich text editor state
 * Digunakan untuk mendapatkan text bersih dari rich text field untuk SEO dan display
 */
export const extractTextFromRichText = (richText: unknown): string => {
  if (!richText) return ''

  // Handle string case (fallback)
  if (typeof richText === 'string') {
    return richText.trim()
  }

  // Handle RichText object case (from CMS)
  if (typeof richText === 'object') {
    const content = richText as DefaultTypedEditorState
    if (!content.root?.children) return ''

    const extractTextFromNode = (node: unknown): string => {
      if (!node || typeof node !== 'object') return ''

      const nodeObj = node as { text?: string; children?: unknown[]; type?: string }

      // Handle text nodes
      if (nodeObj.text) return nodeObj.text

      // Handle nodes with children
      if (nodeObj.children && Array.isArray(nodeObj.children)) {
        return nodeObj.children.map(extractTextFromNode).join('')
      }

      return ''
    }

    return content.root.children.map(extractTextFromNode).join(' ').trim()
  }

  return ''
}

/**
 * Extract title from Post object with rich text title support
 * Fallback ke Indonesian title jika English title kosong
 */
export const extractPostTitle = (post: Partial<Post>): string => {
  // Try English title first
  const englishTitle = extractTextFromRichText(post?.title)
  if (englishTitle) return englishTitle

  // Fallback to Indonesian title
  const indonesianTitle = extractTextFromRichText(post?.title_id)
  if (indonesianTitle) return indonesianTitle

  // Final fallback
  return 'Untitled Post'
}
