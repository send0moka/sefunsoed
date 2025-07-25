import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

async function debugTopics() {
  try {
    console.log('🔍 Debugging FAQ Topics...')
    
    const payload = await getPayload({ config: configPromise })
    
    // Get all pages with FAQ blocks
    const pages = await payload.find({
      collection: 'pages',
      depth: 3,
      limit: 100
    })
    
    console.log(`📄 Found ${pages.docs.length} pages`)
    
    pages.docs.forEach((page, pageIndex) => {
      console.log(`\n📄 Page ${pageIndex + 1}: "${page.title}" (ID: ${page.id})`)
      
      if (page.layout) {
        page.layout.forEach((block, blockIndex) => {
          if (block.blockType === 'faqBlock') {
            console.log(`  📦 FAQ Block ${blockIndex + 1}:`)
            console.log(`    - Block ID: ${block.id}`)
            console.log(`    - enableTopicFilter: ${block.enableTopicFilter}`)
            console.log(`    - topics: ${block.topics ? JSON.stringify(block.topics, null, 2) : 'null'}`)
            console.log(`    - faqItems: ${block.faqItems ? block.faqItems.length : 'null'} items`)
            
            if (block.faqItems && block.faqItems.length > 0) {
              block.faqItems.forEach((item, itemIndex) => {
                console.log(`      ${itemIndex + 1}. "${item.question}" -> topic: "${item.topic}"`)
              })
            }
          }
        })
      }
    })
    
    console.log('\n✅ Debug completed')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Error debugging topics:', error)
    process.exit(1)
  }
}

debugTopics()
