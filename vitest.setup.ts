// Any setup scripts you might need go here

// Load test environment variables
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load test environment file
dotenv.config({ path: resolve(process.cwd(), '.env.test') })

// Also load default .env file as fallback
import 'dotenv/config'
