import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ collection: string; id: string }> },
) {
  try {
    const { collection, id } = await context.params

    if (collection !== 'pages') {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const result = await payload.update({
      collection: 'pages',
      id,
      data: {
        _status: 'published',
      },
      depth: 0,
    })

    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error('Publish error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
