import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function cleanDatabase() {
  console.log('🧹 Cleaning database to fix foreign key constraints...')

  try {
    // Reset all migrations to clean state
    console.log('📊 Resetting migrations...')
    const { stdout: resetOutput } = await execAsync('npm run payload migrate:reset', {
      cwd: 'd:/sefunsoed',
    })
    console.log(resetOutput)

    // Generate fresh types
    console.log('🔧 Generating fresh types...')
    const { stdout: typesOutput } = await execAsync('npm run payload generate:types', {
      cwd: 'd:/sefunsoed',
    })
    console.log(typesOutput)

    console.log('✅ Database cleaned successfully!')
    console.log('🚀 You can now start the dev server with: npm run dev')
  } catch (error) {
    console.error('❌ Cleaning failed:', error.message)
    console.log('')
    console.log('🔧 MANUAL SOLUTION:')
    console.log('1. Connect to your database manually')
    console.log('2. Drop these tables if they exist:')
    console.log('   - _pages_v_blocks_accordion_people_block_sections_people')
    console.log('   - _pages_v_blocks_accordion_people_block_sections')
    console.log('   - pages_blocks_accordion_people_block_sections_people')
    console.log('   - pages_blocks_accordion_people_block_sections')
    console.log('3. Then run: npm run dev')
  }
}

cleanDatabase()
