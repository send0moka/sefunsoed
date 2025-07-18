import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  // Default fallback image
  let url = serverUrl + '/cover.png'

  if (image && typeof image === 'object' && 'url' in image) {
    // Ensure the URL is absolute
    const imageUrl = image.url
    if (imageUrl) {
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        // Already absolute URL
        url = imageUrl
      } else {
        // Relative URL, make it absolute
        url = serverUrl + (imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl)
      }
    }
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()

  const title = doc?.meta?.title ? doc?.meta?.title + ' | SEF UNSOED' : 'SEF UNSOED'

  // Generate the correct URL path
  let urlPath = '/'
  if (doc?.slug) {
    if (Array.isArray(doc.slug)) {
      urlPath = '/' + doc.slug.join('/')
    } else {
      // Check if this is a post by looking at the document structure
      // Posts will have content, heroImage, etc. Pages will have layout
      const isPost = doc && typeof doc === 'object' && ('content' in doc || 'heroImage' in doc)
      urlPath = isPost ? '/posts/' + doc.slug : '/' + doc.slug
    }
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doc?.meta?.title || title,
            },
          ]
        : undefined,
      title,
      url: serverUrl + urlPath,
    }),
    title,
  }
}
