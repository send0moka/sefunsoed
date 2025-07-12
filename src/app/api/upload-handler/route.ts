import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    console.log('=== Custom Upload Handler ===')

    // Get the authorization header
    const authHeader = request.headers.get('Authorization')
    console.log('Auth header:', authHeader ? 'present' : 'missing')

    const formData = await request.formData()
    const file = formData.get('file') as File

    console.log('File received:', file?.name, file?.size)

    if (!file) {
      return NextResponse.json(
        {
          errors: [{ message: 'No file provided' }],
        },
        { status: 400 },
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

    console.log('Generated unique filename:', uniqueFilename)

    // Upload to Supabase Storage
    const buffer = await file.arrayBuffer()
    console.log('File buffer size:', buffer.byteLength)

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

    console.log('Successfully uploaded to Supabase')

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

    console.log('Got public URL:', urlData.publicUrl)

    // Create record in Payload CMS with override access
    const payload = await getPayload({ config: configPromise })

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
      } as any,
      overrideAccess: true, // This bypasses access control
    })

    console.log('Successfully created media record:', mediaRecord.id)

    // Return response that matches what Payload expects
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
        createdAt: mediaRecord.createdAt,
        updatedAt: mediaRecord.updatedAt,
      },
    })
  } catch (error) {
    console.error('Upload handler error:', error)
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
    message: 'Custom upload handler for production',
    status: 'ready',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing',
    environment: process.env.NODE_ENV,
  })
}
