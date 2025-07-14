#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationPath = path.join(__dirname, '..', 'migrations', '001_add_indonesian_fields.sql')

try {
  const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

  console.log('🚀 Running database migration...')
  console.log('Migration SQL:')
  console.log(migrationSQL)

  // You would need to run this SQL against your PostgreSQL database
  // For example, using psql command:
  // execSync(`psql "${process.env.DATABASE_URI}" -c "${migrationSQL}"`)

  console.log('\n⚠️  Please run the above SQL migration manually in your PostgreSQL database.')
  console.log('💡 You can copy and paste the SQL into your database management tool.')
} catch (error) {
  console.error('❌ Error reading migration file:', error)
  process.exit(1)
}
