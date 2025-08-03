/**
 * Simple Migration Script: Convert String Titles to Rich Text Format
 *
 * This script directly updates the database to convert string titles to rich text format.
 * Run this to fix Lexical editor errors when loading existing posts.
 *
 * Usage: node migrate-simple.mjs
 */

import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
  console.log('🚀 Starting title migration...')

  // Connect to database
  const dbPath = path.join(__dirname, 'payload.db')
  const db = new Database(dbPath)

  try {
    // Get all posts with string titles
    const posts = db
      .prepare(
        `
      SELECT id, title, title_id 
      FROM posts 
      WHERE (title IS NOT NULL AND json_valid(title) = 0) 
         OR (title_id IS NOT NULL AND json_valid(title_id) = 0)
    `,
      )
      .all()

    console.log(`📊 Found ${posts.length} posts with string titles to migrate`)

    let migratedCount = 0

    for (const post of posts) {
      const updates = []
      const params = { id: post.id }

      // Convert English title
      if (post.title && typeof post.title === 'string') {
        const richText = createRichTextFromString(post.title)
        updates.push('title = $title')
        params.title = JSON.stringify(richText)
        console.log(`🔄 Converting EN title: "${post.title}"`)
      }

      // Convert Indonesian title
      if (post.title_id && typeof post.title_id === 'string') {
        const richText = createRichTextFromString(post.title_id)
        updates.push('title_id = $title_id')
        params.title_id = JSON.stringify(richText)
        console.log(`🔄 Converting ID title: "${post.title_id}"`)
      }

      if (updates.length > 0) {
        const query = `UPDATE posts SET ${updates.join(', ')} WHERE id = $id`
        db.prepare(query).run(params)
        migratedCount++
        console.log(`✅ Migrated post ${post.id}`)
      }
    }

    console.log(`\n📈 Migration completed!`)
    console.log(`   ✅ Migrated: ${migratedCount} posts`)
    console.log(`   📊 Total checked: ${posts.length} posts`)

    // Verify migration
    console.log(`\n🔍 Verifying migration...`)
    const verification = db
      .prepare(
        `
      SELECT 
        id,
        json_extract(title, '$.root.children[0].children[0].text') as title_text,
        json_extract(title_id, '$.root.children[0].children[0].text') as title_id_text
      FROM posts 
      WHERE title IS NOT NULL OR title_id IS NOT NULL
      ORDER BY id
      LIMIT 5
    `,
      )
      .all()

    console.log(`\n📋 Sample migrated titles:`)
    verification.forEach((row, index) => {
      console.log(`   ${index + 1}. ID: ${row.id}`)
      if (row.title_text) console.log(`      EN: "${row.title_text}"`)
      if (row.title_id_text) console.log(`      ID: "${row.title_id_text}"`)
    })

    console.log(`\n🎉 Migration successful! You can now:`)
    console.log(`   1. Restart your Payload admin`)
    console.log(`   2. Open any post to verify rich text editors work`)
    console.log(`   3. Delete this migration script`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    db.close()
  }
}

// Run migration
migrateTitles().catch(console.error)
