import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Custom publish endpoint dengan timeout handling
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> },
) {
  try {
    const { collection, id } = await params

    if (collection !== 'pages') {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Add timeout untuk publish operation
    const publishPromise = payload.update({
      collection: 'pages',
      id: parseInt(id),
      data: {
        _status: 'published',
      },
      depth: 0, // Reduce depth untuk speed
    })

    const timeoutPromise = new Promise(
      (_, reject) => setTimeout(() => reject(new Error('Publish timeout')), 25000), // 25 second timeout
    )

    const result = await Promise.race([publishPromise, timeoutPromise])

    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error('Publish error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage === 'Publish timeout') {
      return NextResponse.json(
        { error: 'Publish operation timed out. Please try again.' },
        { status: 408 },
      )
    }

    return NextResponse.json({ error: 'Failed to publish page' }, { status: 500 })
  }
}
