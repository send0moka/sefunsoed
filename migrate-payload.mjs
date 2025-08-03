/**
 * Payload Migration Script: Convert String Titles to Rich Text Format
 *
 * This script uses Payload's API to convert existing post titles from string
 * format to rich text format to fix Lexical editor errors.
 *
 * Usage: node migrate-payload.mjs
 */

import { getPayload } from 'payload'
import config from './src/payload.config.js'

// Create rich text object from string
function createRichTextFromString(text) {
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

async function migrateTitles() {
  console.log('🚀 Starting title migration with Payload API...')

  try {
    // Initialize Payload
    const payload = await getPayload({ config })
    console.log('✅ Payload initialized successfully')

    // Get all posts
    const posts = await payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
    })

    console.log(`📊 Found ${posts.docs.length} posts to check`)

    let migratedCount = 0
    let skippedCount = 0

    for (const post of posts.docs) {
      let needsUpdate = false
      const updateData = {}

      // Check if title is a string and needs conversion
      if (post.title && typeof post.title === 'string') {
        console.log(`🔄 Converting EN title for post ${post.id}: "${post.title}"`)
        updateData.title = createRichTextFromString(post.title)
        needsUpdate = true
      }

      // Check if title_id is a string and needs conversion
      if (post.title_id && typeof post.title_id === 'string') {
        console.log(`🔄 Converting ID title for post ${post.id}: "${post.title_id}"`)
        updateData.title_id = createRichTextFromString(post.title_id)
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
        console.log(`⏭️  Skipped post ${post.id} (already rich text or no string titles)`)
      }

      // Add small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log(`\n📈 Migration completed!`)
    console.log(`   ✅ Migrated: ${migratedCount} posts`)
    console.log(`   ⏭️  Skipped: ${skippedCount} posts`)
    console.log(`   📊 Total: ${posts.docs.length} posts processed`)

    if (migratedCount > 0) {
      console.log(`\n🎉 Successfully converted ${migratedCount} post titles to rich text format!`)
      console.log(`\n📝 Next steps:`)
      console.log(`   1. Refresh your admin panel`)
      console.log(`   2. Open any post to verify rich text editors work`)
      console.log(`   3. Delete this migration script if everything works`)
    } else {
      console.log(`\n💡 No posts needed migration. All titles are already in rich text format.`)
    }

    // Verify migration with a sample
    console.log(`\n🔍 Verifying migration with recent posts...`)
    const verifyPosts = await payload.find({
      collection: 'posts',
      limit: 3,
      depth: 0,
      sort: '-createdAt',
    })

    verifyPosts.docs.forEach((post, index) => {
      console.log(`   ${index + 1}. Post ${post.id}:`)
      if (post.title) {
        const titleType = typeof post.title
        const titleText =
          titleType === 'object'
            ? post.title?.root?.children?.[0]?.children?.[0]?.text || 'Rich text object'
            : post.title
        console.log(`      EN: ${titleText} (${titleType})`)
      }
      if (post.title_id) {
        const titleIdType = typeof post.title_id
        const titleIdText =
          titleIdType === 'object'
            ? post.title_id?.root?.children?.[0]?.children?.[0]?.text || 'Rich text object'
            : post.title_id
        console.log(`      ID: ${titleIdText} (${titleIdType})`)
      }
    })
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateTitles()
  .then(() => {
    console.log('\n✨ Migration script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration script failed:', error)
    process.exit(1)
  })
