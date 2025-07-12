import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    console.log('=== DEBUG UPLOAD START ===')

    // Get the payload instance
    const payload = await getPayload({
      config: configPromise,
    })

    console.log('Payload instance created successfully')

    // Parse the form data
    const formData = await req.formData()
    const file = formData.get('file') as File

    console.log('File from form data:', {
      name: file?.name,
      type: file?.type,
      size: file?.size,
    })

    if (!file) {
      console.log('No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log('File converted to buffer, size:', buffer.length)

    // Try to create media using Payload
    console.log('Attempting to create media...')

    const result = await payload.create({
      collection: 'media',
      data: {
        alt: `Uploaded file: ${file.name}`,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    console.log('Media created successfully:', result.id)
    console.log('=== DEBUG UPLOAD END ===')

    // Sanitize result to avoid serialization issues
    const sanitizedResult = {
      id: result.id,
      filename: result.filename,
      url: result.url,
      alt: result.alt,
      mimeType: result.mimeType,
      filesize: result.filesize,
      width: result.width,
      height: result.height,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }

    return NextResponse.json({
      success: true,
      media: sanitizedResult,
    })
  } catch (error) {
    console.error('=== DEBUG UPLOAD ERROR ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('=== DEBUG UPLOAD ERROR END ===')

    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error instanceof Error ? error.message : String(error),
        type: error instanceof Error ? error.constructor.name : typeof error,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Debug upload endpoint. Use POST to upload files.',
    timestamp: new Date().toISOString(),
  })
}
