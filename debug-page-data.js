// Debug the actual page data to see what's stored in database
import { getPayload } from 'payload'
import config from './src/payload.config.js'

console.log('=== DATABASE DEBUG ===')

async function debugPageData() {
  try {
    const payload = await getPayload({ config })

    // Get page 5 data
    const page = await payload.findByID({
      collection: 'pages',
      id: 5,
      depth: 0,
    })

    console.log('Page 5 found:', page.title)

    // Find registration form block
    const registrationBlock = page.layout?.find((block) => block.blockType === 'registrationForm')

    if (registrationBlock) {
      console.log('Registration form block found!')
      console.log('Personal fields:', JSON.stringify(registrationBlock.personalFields, null, 2))
    } else {
      console.log('No registration form block found')
      console.log(
        'Available blocks:',
        page.layout?.map((b) => b.blockType),
      )
    }
  } catch (error) {
    console.error('Database error:', error.message)
  }

  process.exit(0)
}

debugPageData()
