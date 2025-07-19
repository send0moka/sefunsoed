import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Get additional fields from form data
    const alt = formData.get('alt') as string
    const caption = formData.get('caption') as string

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

    // Upload to Supabase Storage
    const buffer = await file.arrayBuffer()
    const { data: _uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload to Supabase', details: uploadError },
        { status: 500 },
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

    // Create record in Payload CMS
    const payload = await getPayload({ config: configPromise })

    const mediaRecord = await payload.create({
      collection: 'media',
      data: {
        filename: file.name,
        mimeType: file.type,
        filesize: file.size,
        alt: alt || '',
        caption: caption
          ? {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: caption,
                      },
                    ],
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            }
          : undefined,
        supabaseUrl: urlData.publicUrl,
        supabaseKey: uniqueFilename,
        url: urlData.publicUrl, // For compatibility
        width: null, // Will be updated by image processing if needed
        height: null, // Will be updated by image processing if needed
      },
    })

    console.log('Successfully created media record:', mediaRecord.id)

    return NextResponse.json({
      success: true,
      file: {
        id: mediaRecord.id,
        filename: file.name,
        url: urlData.publicUrl,
        supabaseUrl: urlData.publicUrl,
        supabaseKey: uniqueFilename,
        alt: alt || '',
        caption: caption || '',
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    console.error('Admin upload error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin Supabase upload endpoint',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing',
  })
}
