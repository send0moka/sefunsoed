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
    const contentType = request.headers.get('content-type')

    // Handle JSON requests (for admin panel queries)
    if (contentType?.includes('application/json')) {
      const jsonData = await request.json()
      const payload = await getPayloadHMR({ config: configPromise })

      // Handle different JSON operations
      if (jsonData.query) {
        // GraphQL-like query
        const result = await payload.find({
          collection: 'media',
          depth: jsonData.depth || 0,
          limit: jsonData.limit || 10,
          page: jsonData.page || 1,
          where: jsonData.where || {},
          overrideAccess: true,
        })
        return NextResponse.json(result)
      }

      // Default response for JSON requests
      return NextResponse.json({
        message: 'JSON API endpoint ready',
        supported: ['query'],
      })
    }

    // Handle multipart form data (file uploads)
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { errors: [{ message: 'Content-Type must be multipart/form-data or application/json' }] },
        { status: 400 },
      )
    }

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // If there are query parameters, it's a request for media list
    if (searchParams.toString()) {
      const payload = await getPayloadHMR({ config: configPromise })

      // Get query parameters
      const depth = searchParams.get('depth') || '0'
      const limit = searchParams.get('limit') || '10'
      const page = searchParams.get('page') || '1'
      const where = searchParams.get('where')

      // Build query options
      const options = {
        depth: parseInt(depth),
        limit: parseInt(limit),
        page: parseInt(page),
        overrideAccess: true, // Allow access for admin panel
      }

      // Add where clause if provided
      let whereClause = undefined
      if (where) {
        try {
          whereClause = JSON.parse(decodeURIComponent(where))
        } catch (e) {
          console.error('Invalid where clause:', e)
        }
      }

      // Get media documents
      const result = await payload.find({
        collection: 'media',
        ...options,
        ...(whereClause && { where: whereClause }),
      })

      return NextResponse.json(result)
    }

    // Default status response
    return NextResponse.json({
      message: 'Custom Payload media upload with Supabase storage',
      status: 'ready',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing',
    })
  } catch (error) {
    console.error('Media GET error:', error)
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Failed to fetch media',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      },
      { status: 500 },
    )
  }
}
