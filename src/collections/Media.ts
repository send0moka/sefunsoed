import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: ({ req }) => {
      // Allow if user is authenticated
      if (req.user) {
        return true
      }

      // In production, allow access for admin panel
      if (process.env.NODE_ENV === 'production') {
        return true // Temporarily allow all access in production
      }

      // Development: require authentication
      return !!req.user
    },
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
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
    // Supabase Storage fields
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
    // Disable local storage in production, use Supabase instead
    staticDir:
      process.env.NODE_ENV === 'production'
        ? undefined
        : path.resolve(dirname, '../../public/media'),
    disableLocalStorage: process.env.NODE_ENV === 'production', // Only disable in production
    adminThumbnail: undefined, // Disable thumbnail to reduce processing
    focalPoint: false, // Disable to reduce processing
    imageSizes: [], // Disable all image sizes to prevent timeout
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && req.file) {
          try {
            // Check file size (limit to 5MB to prevent timeout)
            const maxSize = 5 * 1024 * 1024 // 5MB
            if (req.file.size > maxSize) {
              throw new Error('File too large. Maximum size is 5MB.')
            }

            // Generate unique filename for Supabase
            const timestamp = Date.now()
            const randomString = Math.random().toString(36).substring(2, 15)
            const fileExtension = req.file.name.split('.').pop()
            const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
              .from('media')
              .upload(uniqueFilename, req.file.data, {
                contentType: req.file.mimetype,
                cacheControl: '3600',
                upsert: false,
              })

            if (uploadError) {
              throw new Error(`Supabase upload failed: ${uploadError.message}`)
            }

            // Get public URL
            const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

            // Update data with Supabase information
            data.supabaseUrl = urlData.publicUrl
            data.supabaseKey = uniqueFilename
            data.url = urlData.publicUrl // Set primary URL to Supabase
            data.filename = uniqueFilename
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            throw new Error(`Upload failed: ${errorMessage}`)
          }
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        return doc
      },
    ],
  },
}
