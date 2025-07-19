import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Quick publish endpoint with minimal processing
export async function POST(request: NextRequest) {
  try {
    console.log('=== QUICK PUBLISH START ===')
    const body = await request.json()
    const { collection, id, data } = body

    if (!collection || !id) {
      return NextResponse.json({ error: 'Collection and ID required' }, { status: 400 })
    }

    // Set strict timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 18000) // 18 seconds

    try {
      const payload = await getPayload({ config })

      console.log(`Publishing ${collection} ID: ${id}`)

      // Use pages collection specifically to avoid type issues
      if (collection === 'pages') {
        const result = await payload.update({
          collection: 'pages',
          id,
          data: {
            _status: 'published',
            ...data, // Allow additional data if provided
          },
          depth: 0, // No relations
        })

        clearTimeout(timeoutId)

        console.log('=== QUICK PUBLISH SUCCESS ===')
        return NextResponse.json({
          success: true,
          id: result.id,
          status: result._status,
        })
      } else {
        throw new Error('Only pages collection supported in quick publish')
      }
    } catch (updateError) {
      clearTimeout(timeoutId)
      throw updateError
    }
  } catch (error: unknown) {
    console.error('=== QUICK PUBLISH ERROR ===', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Return different status codes for different errors
    let statusCode = 500
    if (errorMessage.includes('timeout') || errorMessage.includes('abort')) {
      statusCode = 408 // Request Timeout
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        hint: 'Try using direct database update if timeout persists',
      },
      { status: statusCode },
    )
  }
}

// GET endpoint to check status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const id = searchParams.get('id')

    if (!collection || !id || collection !== 'pages') {
      return NextResponse.json({ error: 'Only pages collection supported' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const doc = await payload.findByID({
      collection: 'pages',
      id,
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      status: doc._status,
      updatedAt: doc.updatedAt,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
