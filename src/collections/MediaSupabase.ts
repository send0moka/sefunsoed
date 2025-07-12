import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const MediaSupabase: CollectionConfig = {
  slug: 'media-supabase',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    // Custom fields for Supabase storage
    {
      name: 'supabaseUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Direct URL to file in Supabase Storage',
      },
    },
    {
      name: 'supabaseKey',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'File key/path in Supabase Storage',
      },
    },
  ],
  upload: {
    // Disable static directory since we're using Supabase
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => {
      // Return Supabase URL for thumbnails
      return (doc.supabaseUrl as string) || (doc.url as string) || null
    },
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        crop: 'center',
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        crop: 'center',
      },
      {
        name: 'small',
        width: 600,
        height: 400,
        crop: 'center',
      },
      {
        name: 'medium',
        width: 900,
        height: 600,
        crop: 'center',
      },
      {
        name: 'large',
        width: 1400,
        height: 900,
        crop: 'center',
      },
      {
        name: 'xlarge',
        width: 1920,
        height: 1080,
        crop: 'center',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          // Custom upload logic here if needed
          console.log('Creating new media with Supabase:', data.filename)
        }
      },
    ],
  },
}
