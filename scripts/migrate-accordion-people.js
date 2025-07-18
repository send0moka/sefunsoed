#!/usr/bin/env node

/**
 * Migration script to handle AccordionPeopleBlock schema changes
 */

import postgres from 'postgres'
import { config } from 'dotenv'

config()

async function runMigration() {
  const connectionString = process.env.DATABASE_URI

  if (!connectionString) {
    console.error('DATABASE_URI not found in environment variables')
    process.exit(1)
  }

  const sql = postgres(connectionString)

  try {
    console.log('Starting AccordionPeopleBlock schema migration...')

    // Check if the table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pages_blocks_accordion_people_block_sections_people'
      )
    `

    if (tableExists[0].exists) {
      console.log('Table found, proceeding with migration...')

      // Add new columns if they don't exist
      try {
        await sql`
          ALTER TABLE pages_blocks_accordion_people_block_sections_people 
          ADD COLUMN IF NOT EXISTS linkedin VARCHAR
        `
        console.log('✓ Added linkedin column')
      } catch (_ignore) {
        console.log('LinkedIn column already exists')
      }

      try {
        await sql`
          ALTER TABLE pages_blocks_accordion_people_block_sections_people 
          ADD COLUMN IF NOT EXISTS instagram VARCHAR
        `
        console.log('✓ Added instagram column')
      } catch (_ignore) {
        console.log('Instagram column already exists')
      }

      // Migrate data from old columns if they exist
      try {
        await sql`
          UPDATE pages_blocks_accordion_people_block_sections_people 
          SET linkedin = social_media_linkedin 
          WHERE social_media_linkedin IS NOT NULL AND linkedin IS NULL
        `
        console.log('✓ Migrated linkedin data')
      } catch (_ignore) {
        console.log('No social_media_linkedin column to migrate from')
      }

      try {
        await sql`
          UPDATE pages_blocks_accordion_people_block_sections_people 
          SET instagram = social_media_instagram 
          WHERE social_media_instagram IS NOT NULL AND instagram IS NULL
        `
        console.log('✓ Migrated instagram data')
      } catch (_ignore) {
        console.log('No social_media_instagram column to migrate from')
      }

      // Drop old columns if they exist
      try {
        await sql`
          ALTER TABLE pages_blocks_accordion_people_block_sections_people 
          DROP COLUMN IF EXISTS social_media_linkedin
        `
        console.log('✓ Dropped old social_media_linkedin column')
      } catch (_ignore) {
        // Column doesn't exist
      }

      try {
        await sql`
          ALTER TABLE pages_blocks_accordion_people_block_sections_people 
          DROP COLUMN IF EXISTS social_media_instagram
        `
        console.log('✓ Dropped old social_media_instagram column')
      } catch (_ignore) {
        // Column doesn't exist
      }
    } else {
      console.log('Table does not exist yet, will be created on next schema sync')
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

runMigration()
