import type { PayloadRequest } from 'payload'
import { timelineDemo } from './timeline-demo'
import type { Page } from '@/payload-types'

export const seedTimelineDemo = async (req: PayloadRequest): Promise<Page> => {
  try {
    const existingPage = await req.payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: timelineDemo.slug,
        },
      },
    })

    if (existingPage.docs.length > 0) {
      console.log('Timeline demo page already exists')
      return existingPage.docs[0] as Page
    }

    const result = await req.payload.create({
      collection: 'pages',
      data: timelineDemo as any,
      req,
    })

    console.log('✅ Timeline demo page created successfully')
    return result as Page
  } catch (error) {
    console.error('❌ Error creating timeline demo page:', error)
    throw error
  }
}
