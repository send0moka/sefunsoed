import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../../payload.config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const { filename } = await params

    // Remove query parameters from filename if any
    const cleanFilename = filename.split('?')[0]

    // First try to get media record from database to check for Supabase URL
    try {
      const payload = await getPayloadHMR({ config: configPromise })

      const media = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: cleanFilename,
          },
        },
        limit: 1,
      })

      if (media.docs.length > 0) {
        const doc = media.docs[0] as any

        // If we have a Supabase URL, redirect to it
        if (doc.supabaseUrl) {
          console.log(`Redirecting ${cleanFilename} to Supabase URL: ${doc.supabaseUrl}`)
          return NextResponse.redirect(doc.supabaseUrl, 302)
        }
      }
    } catch (dbError) {
      console.log('Database lookup failed, falling back to local file:', dbError)
    }

    // Fallback to local file serving
    const filePath = path.join(process.cwd(), 'public', 'media', cleanFilename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type
    const contentType = getContentType(cleanFilename)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error serving media via API:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const contentTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }

  return contentTypes[ext] || 'application/octet-stream'
}
