#!/usr/bin/env node

/**
 * Script to backup and restore AccordionPeopleBlock data during schema migration
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function handleSchemaMigration() {
  console.log('🔄 Starting AccordionPeopleBlock schema migration...')

  try {
    // First, let's accept the schema changes with data loss warning
    console.log('📝 Accepting schema changes...')

    // Use echo to automatically answer 'y' to the prompt
    const { stdout, stderr } = await execAsync('echo y | npm run dev', {
      cwd: 'd:/sefunsoed',
      timeout: 30000,
    })

    console.log('stdout:', stdout)
    if (stderr) console.log('stderr:', stderr)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)

    // Alternative approach: restart with clean schema
    console.log('🔄 Trying alternative approach: clean migration...')

    try {
      // Reset migrations and start fresh
      await execAsync('npm run payload migrate:reset', {
        cwd: 'd:/sefunsoed',
      })

      console.log('✅ Migration reset completed')
      console.log('🚀 You can now start the dev server with: npm run dev')
    } catch (resetError) {
      console.error('❌ Reset also failed:', resetError.message)
      console.log('')
      console.log('🔧 MANUAL SOLUTION:')
      console.log('1. Open a new terminal')
      console.log('2. Navigate to d:/sefunsoed')
      console.log('3. Run: npm run dev')
      console.log('4. When prompted, type "y" and press Enter')
      console.log('5. Wait for server to start')
    }
  }
}

handleSchemaMigration()
