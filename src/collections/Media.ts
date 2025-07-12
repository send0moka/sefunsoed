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
      console.log('Media create access check - User:', req.user?.id)
      console.log('Media create access check - Environment:', process.env.NODE_ENV)
      console.log('Media create access check - Headers:', req.headers)

      // Allow if user is authenticated
      if (req.user) {
        console.log('User authenticated, allowing access')
        return true
      }

      // In production, allow if request comes from admin panel
      if (process.env.NODE_ENV === 'production') {
        const userAgent = req.headers.get('user-agent')
        const referer = req.headers.get('referer')
        console.log('Production check - User Agent:', userAgent)
        console.log('Production check - Referer:', referer)

        // Allow if coming from admin panel
        if (referer && referer.includes('/admin/')) {
          console.log('Request from admin panel, allowing access')
          return true
        }
      }

      console.log('Access denied')
      return false
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
    disableLocalStorage: true, // Always use Supabase now
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
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
      async ({ data, operation, req }) => {
        console.log('=== Media Before Change Hook ===')
        console.log('Operation:', operation)
        console.log('Data:', JSON.stringify(data, null, 2))

        if (operation === 'create' && req.file) {
          console.log('File upload detected, uploading to Supabase...')

          try {
            // Generate unique filename for Supabase
            const timestamp = Date.now()
            const randomString = Math.random().toString(36).substring(2, 15)
            const fileExtension = req.file.name.split('.').pop()
            const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

            console.log('Generated unique filename:', uniqueFilename)

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
              .from('media')
              .upload(uniqueFilename, req.file.data, {
                contentType: req.file.mimetype,
                cacheControl: '3600',
                upsert: false,
              })

            if (uploadError) {
              console.error('Supabase upload error:', uploadError)
              throw new Error(`Supabase upload failed: ${uploadError.message}`)
            }

            console.log('Successfully uploaded to Supabase storage')

            // Get public URL
            const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

            console.log('Got public URL:', urlData.publicUrl)

            // Update data with Supabase information
            data.supabaseUrl = urlData.publicUrl
            data.supabaseKey = uniqueFilename
            data.url = urlData.publicUrl // Set primary URL to Supabase

            console.log('Updated data with Supabase URL')
          } catch (error) {
            console.error('Supabase upload error:', error)
            throw error // This will prevent the media record from being created
          }
        }

        console.log('=== End Media Before Change Hook ===')
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req: _req }) => {
        console.log('=== Media After Change Hook ===')
        console.log('Operation:', operation)
        console.log('Doc ID:', doc.id)
        console.log('Doc filename:', doc.filename)
        console.log('Doc supabaseUrl:', (doc as { supabaseUrl?: string }).supabaseUrl)

        // Log successful creation
        if (operation === 'create') {
          console.log('Media record created successfully with Supabase URL')
        }

        console.log('=== End Media After Change Hook ===')
        return doc
      },
    ],
  },
}
