import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Force publish endpoint - bypasses all Payload validation and hooks
export async function POST(request: NextRequest) {
  try {
    console.log('=== FORCE PUBLISH START ===')
    const body = await request.json()
    const { collection, id } = body

    if (!collection || !id || collection !== 'pages') {
      return NextResponse.json({ error: 'Only pages collection supported' }, { status: 400 })
    }

    // Ultra short timeout for force publish
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Force publish timeout')), 15000) // 15 seconds max
    })

    const forcePublishPromise = async () => {
      const payload = await getPayload({ config })

      console.log(`Force publishing page ID: ${id}`)

      // Direct database update bypassing all hooks and validation
      const result = await payload.update({
        collection: 'pages',
        id,
        data: {
          _status: 'published',
        },
        depth: 0, // No relations to speed up
      })

      console.log('Direct publish result:', result)
      return result
    }

    // Race between timeout and force publish
    const result = await Promise.race([forcePublishPromise(), timeoutPromise])

    console.log('=== FORCE PUBLISH SUCCESS ===')
    return NextResponse.json({
      success: true,
      message: 'Force published successfully',
      result,
    })
  } catch (error: unknown) {
    console.error('=== FORCE PUBLISH ERROR ===', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: 'Force publish failed - content may still be updated',
      },
      { status: 500 },
    )
  }
}

// GET endpoint to verify publish status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const id = searchParams.get('id')

    if (!collection || !id || collection !== 'pages') {
      return NextResponse.json({ error: 'Only pages collection supported' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Quick status check
    const doc = await payload.findByID({
      collection: 'pages',
      id,
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      id: doc.id,
      status: doc._status,
      updatedAt: doc.updatedAt,
      isPublished: doc._status === 'published',
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
