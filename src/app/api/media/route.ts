import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../payload.config'
import { Media } from '../../../payload-types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// This endpoint replaces the default Payload media upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ errors: [{ message: 'No file provided' }] }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

    // Upload to Supabase Storage
    const buffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        {
          errors: [{ message: 'Failed to upload to Supabase', details: uploadError }],
        },
        { status: 500 },
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

    // Create record in Payload CMS
    const payload = await getPayloadHMR({ config: configPromise })

    try {
      const mediaRecord = await payload.create({
        collection: 'media',
        data: {
          filename: file.name,
          mimeType: file.type,
          filesize: file.size,
          alt: '',
          supabaseUrl: urlData.publicUrl,
          supabaseKey: uniqueFilename,
          url: urlData.publicUrl,
          width: null,
          height: null,
        },
        // Override access control for admin operations
        overrideAccess: true,
      })

      console.log('Successfully created media record:', mediaRecord.id)

      // Return response in Payload format
      return NextResponse.json({
        message: 'Uploaded successfully',
        doc: {
          id: mediaRecord.id,
          filename: file.name,
          url: urlData.publicUrl,
          supabaseUrl: urlData.publicUrl,
          supabaseKey: uniqueFilename,
          filesize: file.size,
          mimeType: file.type,
          alt: '',
          width: null,
          height: null,
          createdAt: (mediaRecord as Media).createdAt,
          updatedAt: (mediaRecord as Media).updatedAt,
        },
      })
    } catch (payloadError) {
      console.error('Payload create error:', payloadError)

      // If Payload fails, clean up Supabase file
      await supabase.storage.from('media').remove([uniqueFilename])

      return NextResponse.json(
        {
          errors: [{ message: 'Failed to create media record', details: payloadError }],
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Upload failed',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Custom Payload media upload with Supabase storage',
    status: 'ready',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing',
  })
}
