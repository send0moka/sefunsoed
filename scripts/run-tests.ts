#!/usr/bin/env node

/**
 * Professional Test Runner Script
 * Menjalankan unit test untuk backend Payload dengan Supabase API
 * Output yang informatif dan terstruktur untuk CLI
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load test environment variables
dotenv.config({ path: join(__dirname, '..', '.env.test') })

const execAsync = promisify(exec)

// ANSI color codes untuk output yang menarik
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

// Fungsi untuk mencetak header yang menarik
function printHeader(title: string) {
  const border = '═'.repeat(80)
  console.log(`\n${colors.cyan}${border}${colors.reset}`)
  console.log(`${colors.bright}${colors.cyan}   ${title}${colors.reset}`)
  console.log(`${colors.cyan}${border}${colors.reset}\n`)
}

// Fungsi untuk mencetak section
function printSection(title: string) {
  console.log(`\n${colors.yellow}${colors.bright}📋 ${title}${colors.reset}`)
  console.log(`${colors.yellow}${'─'.repeat(50)}${colors.reset}`)
}

// Fungsi untuk mencetak status
function printStatus(status: 'success' | 'error' | 'warning' | 'info', message: string) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }

  const statusColors = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue,
  }

  console.log(`${statusColors[status]}${icons[status]} ${message}${colors.reset}`)
}

// Fungsi untuk menjalankan command dengan output yang bagus
async function runCommand(command: string, description: string): Promise<boolean> {
  try {
    printStatus('info', `Running: ${description}`)
    console.log(`${colors.blue}Command: ${command}${colors.reset}`)

    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    })

    if (stdout) {
      console.log(stdout)
    }

    if (stderr && !stderr.includes('warning')) {
      console.log(`${colors.yellow}Warnings:${colors.reset}`)
      console.log(stderr)
    }

    printStatus('success', `Completed: ${description}`)
    return true
  } catch (error: unknown) {
    printStatus('error', `Failed: ${description}`)
    const err = error as { message: string; stdout?: string; stderr?: string }
    console.log(`${colors.red}Error: ${err.message}${colors.reset}`)
    if (err.stdout) {
      console.log(`${colors.white}Output:${colors.reset}`)
      console.log(err.stdout)
    }
    if (err.stderr) {
      console.log(`${colors.red}Error Output:${colors.reset}`)
      console.log(err.stderr)
    }
    return false
  }
}

// Fungsi untuk check environment
async function checkEnvironment() {
  printSection('Environment Check')

  // Check Node.js version
  try {
    const { stdout } = await execAsync('node --version')
    printStatus('success', `Node.js version: ${stdout.trim()}`)
  } catch (_error) {
    printStatus('error', 'Node.js not found')
    return false
  }

  // Check package manager
  try {
    const { stdout } = await execAsync('pnpm --version')
    printStatus('success', `pnpm version: ${stdout.trim()}`)
  } catch (_error) {
    try {
      const { stdout } = await execAsync('npm --version')
      printStatus('success', `npm version: ${stdout.trim()}`)
    } catch (_error) {
      printStatus('error', 'No package manager found')
      return false
    }
  }

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'DATABASE_URI',
    'PAYLOAD_SECRET',
  ]

  let envCheckPassed = true

  console.log(`\n${colors.yellow}Environment Variables:${colors.reset}`)
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      printStatus('success', `${envVar}: Set`)
    } else {
      printStatus('warning', `${envVar}: Not set`)
      envCheckPassed = false
    }
  }

  return envCheckPassed
}

// Fungsi untuk install dependencies
async function installDependencies() {
  printSection('Dependencies Installation')

  const packageManager = process.env.npm_config_user_agent?.includes('pnpm') ? 'pnpm' : 'npm'
  const installCommand = packageManager === 'pnpm' ? 'pnpm install' : 'npm install'

  return await runCommand(installCommand, 'Installing dependencies')
}

// Fungsi untuk generate types
async function generateTypes() {
  printSection('Type Generation')

  return await runCommand('pnpm run generate:types', 'Generating Payload types')
}

// Fungsi untuk run tests
async function runTests() {
  printSection('Running Integration Tests')

  const testCommands = [
    {
      command: 'pnpm run test:int',
      description: 'Running all integration tests',
    },
  ]

  let allTestsPassed = true

  for (const testCmd of testCommands) {
    const success = await runCommand(testCmd.command, testCmd.description)
    if (!success) {
      allTestsPassed = false
    }
  }

  return allTestsPassed
}

// Fungsi untuk run specific test files
async function runSpecificTests() {
  printSection('Running Specific Test Suites')

  const testFiles = [
    {
      file: 'tests/int/collections.int.spec.ts',
      description: 'Collections Integration Tests',
    },
    {
      file: 'tests/int/supabase-api.int.spec.ts',
      description: 'Supabase API Integration Tests',
    },
    {
      file: 'tests/int/api-validation.int.spec.ts',
      description: 'API Validation Tests',
    },
  ]

  let allTestsPassed = true

  for (const test of testFiles) {
    const command = `npx vitest run ${test.file} --config ./vitest.config.mts`
    const success = await runCommand(command, test.description)
    if (!success) {
      allTestsPassed = false
    }
  }

  return allTestsPassed
}

// Fungsi untuk generate test report
function generateTestReport(results: { [key: string]: boolean }) {
  printSection('Test Report Summary')

  const totalTests = Object.keys(results).length
  const passedTests = Object.values(results).filter(Boolean).length
  const failedTests = totalTests - passedTests

  console.log(`\n${colors.bright}Test Results:${colors.reset}`)
  console.log(`Total Suites: ${totalTests}`)
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`)
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`)
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`)

  console.log(`\n${colors.bright}Detailed Results:${colors.reset}`)
  for (const [test, passed] of Object.entries(results)) {
    const icon = passed ? '✅' : '❌'
    console.log(`${icon} ${test}`)
  }

  if (failedTests === 0) {
    printStatus('success', 'All tests passed! 🎉')
  } else {
    printStatus('warning', `${failedTests} test suite(s) failed. Please check the logs above.`)
  }
}

// Main function
async function main() {
  printHeader('SEFUNSOED - Backend API Unit Tests')

  console.log(
    `${colors.bright}Professional Unit Test Suite for Payload CMS with Supabase${colors.reset}`,
  )
  console.log(`${colors.blue}Testing collections, API endpoints, and integrations${colors.reset}\n`)

  const results: { [key: string]: boolean } = {}

  // Check environment
  results['Environment Check'] = await checkEnvironment()

  // Install dependencies if needed
  const dependenciesInstalled = await installDependencies()
  results['Dependencies Installation'] = dependenciesInstalled

  if (!dependenciesInstalled) {
    printStatus('error', 'Cannot proceed without dependencies')
    process.exit(1)
  }

  // Generate types
  results['Type Generation'] = await generateTypes()

  // Run tests
  results['Integration Tests'] = await runTests()

  // Run specific tests
  results['Specific Test Suites'] = await runSpecificTests()

  // Generate report
  generateTestReport(results)

  // Exit with appropriate code
  const allPassed = Object.values(results).every(Boolean)
  process.exit(allPassed ? 0 : 1)
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  printStatus('error', `Uncaught Exception: ${error.message}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  printStatus('error', `Unhandled Rejection: ${reason}`)
  process.exit(1)
})

// Run the main function
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    printStatus('error', `Script failed: ${error.message}`)
    process.exit(1)
  })
}
