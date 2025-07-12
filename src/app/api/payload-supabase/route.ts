import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { createSupabaseStorage } from '../../../storage/supabaseAdapter'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    console.log('=== PAYLOAD SUPABASE UPLOAD START ===')

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const payload = await getPayload({
      config: configPromise,
    })

    const supabaseStorage = createSupabaseStorage({
      bucket: 'media',
      supabaseUrl,
      supabaseKey: supabaseServiceKey,
      prefix: 'uploads',
    })

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File:', file.name, file.size, 'bytes')

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`

    console.log('Uploading to Supabase via adapter...')

    // Upload via Supabase adapter
    const uploadResult = await supabaseStorage.uploadFile({
      file: {
        buffer,
        size: file.size,
        mimetype: file.type,
      },
      filename,
    })

    console.log('Supabase upload successful:', uploadResult.url)

    // Create media record in Payload database
    console.log('Creating Payload media record...')

    const mediaRecord = await payload.create({
      collection: 'media',
      data: {
        alt: `Uploaded: ${file.name}`,
        filename: uploadResult.filename,
        mimeType: uploadResult.mimeType,
        filesize: uploadResult.filesize,
        url: uploadResult.url, // Supabase URL
      },
      overrideAccess: true,
    })

    console.log('Media record created:', mediaRecord.id)

    const result = {
      success: true,
      id: mediaRecord.id,
      filename: uploadResult.filename,
      url: uploadResult.url,
      supabaseUrl: uploadResult.url,
      payloadRecord: {
        id: mediaRecord.id,
        filename: mediaRecord.filename,
        url: mediaRecord.url,
      },
    }

    console.log('=== PAYLOAD SUPABASE UPLOAD END ===')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Payload Supabase upload error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Payload + Supabase Storage upload endpoint',
    features: ['Uploads to Supabase', 'Creates Payload media record', 'Returns both URLs'],
  })
}
