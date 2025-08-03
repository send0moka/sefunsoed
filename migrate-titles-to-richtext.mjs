/**
 * Migration Script: Convert String Titles to Rich Text Format
 *
 * This script converts existing post titles from string format to rich text format
 * to fix the Lexical editor error when loading existing posts.
 *
 * Run this script ONCE after updating the Posts collection to use richText fields.
 */

import { getPayload } from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const convertStringToRichText = (text) => {
  if (!text || typeof text !== 'string') {
    return null
  }

  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function migrateTitlesToRichText() {
  console.log('🚀 Starting migration: Convert string titles to rich text...')

  try {
    // Initialize Payload
    const payload = await getPayload({
      config: await import('./src/payload.config.ts'),
    })

    console.log('✅ Payload initialized successfully')

    // Get all posts
    const posts = await payload.find({
      collection: 'posts',
      limit: 1000, // Adjust if you have more posts
      depth: 0,
    })

    console.log(`📊 Found ${posts.docs.length} posts to migrate`)

    let migratedCount = 0
    let skippedCount = 0

    for (const post of posts.docs) {
      let needsUpdate = false
      const updateData = {}

      // Check title field (English)
      if (post.title && typeof post.title === 'string') {
        console.log(`🔄 Converting English title for post ${post.id}: "${post.title}"`)
        updateData.title = convertStringToRichText(post.title)
        needsUpdate = true
      }

      // Check title_id field (Indonesian)
      if (post.title_id && typeof post.title_id === 'string') {
        console.log(`🔄 Converting Indonesian title for post ${post.id}: "${post.title_id}"`)
        updateData.title_id = convertStringToRichText(post.title_id)
        needsUpdate = true
      }

      if (needsUpdate) {
        try {
          await payload.update({
            collection: 'posts',
            id: post.id,
            data: updateData,
          })
          migratedCount++
          console.log(`✅ Migrated post ${post.id}`)
        } catch (error) {
          console.error(`❌ Failed to migrate post ${post.id}:`, error.message)
        }
      } else {
        skippedCount++
        console.log(`⏭️  Skipped post ${post.id} (already rich text or no title)`)
      }
    }

    console.log(`\n📈 Migration completed:`)
    console.log(`   ✅ Migrated: ${migratedCount} posts`)
    console.log(`   ⏭️  Skipped: ${skippedCount} posts`)
    console.log(`   📊 Total: ${posts.docs.length} posts processed`)

    if (migratedCount > 0) {
      console.log(`\n🎉 Successfully converted ${migratedCount} post titles to rich text format!`)
      console.log(`\n📝 Next steps:`)
      console.log(`   1. Refresh your admin panel`)
      console.log(`   2. Open any post to verify rich text titles work`)
      console.log(`   3. Delete this migration script if everything works`)
    } else {
      console.log(`\n💡 No posts needed migration. All titles are already in rich text format.`)
    }
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateTitlesToRichText()
  .then(() => {
    console.log('\n✨ Migration script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration script failed:', error)
    process.exit(1)
  })
