import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'

export async function POST(req: NextRequest) {
  try {
    console.log('=== BYPASS UPLOAD START ===')

    const payload = await getPayload({
      config: configPromise,
    })

    console.log('Payload instance created')

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File:', file.name, file.size, 'bytes')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log('Attempting upload with overrideAccess...')

    const result = await payload.create({
      collection: 'media',
      data: {
        alt: `Uploaded: ${file.name}`,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    })

    console.log('Success! Media ID:', result.id)

    return NextResponse.json({
      success: true,
      media: result,
    })
  } catch (error) {
    console.error('Upload error:', error)
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
    message: 'Upload endpoint with access override',
  })
}
