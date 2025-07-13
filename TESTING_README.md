# Unit Testing Suite untuk SEFUNSOED Backend

Sistem unit testing yang komprehensif untuk backend Payload CMS dengan integrasi Supabase API.

## 📋 Overview

Suite testing ini mencakup:
- **Collections Testing**: Testing CRUD operations untuk semua collections (Users, Posts, Pages, Media, Categories)
- **Supabase API Testing**: Testing integrasi dengan Supabase Storage API
- **API Validation Testing**: Testing validasi data dan error handling
- **Environment Testing**: Testing konfigurasi environment variables

## 🚀 Quick Start

### Prerequisites

Pastikan Anda memiliki:
- Node.js >= 18.20.2
- pnpm >= 9 atau npm
- Environment variables yang diperlukan (lihat bagian Environment)

### Install Dependencies

```bash
pnpm install
# atau
npm install
```

### Run All Tests

```bash
# Menjalankan semua test dengan output profesional
pnpm run test:unit

# Atau menjalankan test integration biasa
pnpm run test:int
```

### Run Specific Test Suites

```bash
# Test Collections (Users, Posts, Pages, Media, Categories)
pnpm run test:collections

# Test Supabase API integration
pnpm run test:supabase

# Test API validation dan error handling
pnpm run test:api
```

## 🔧 Test Structure

### Collections Integration Tests
File: `tests/int/collections.int.spec.ts`

Testing untuk semua collections:
- ✅ **Users Collection**: Create, read, update, delete users
- ✅ **Posts Collection**: Create posts, filter by status/author
- ✅ **Pages Collection**: Create pages with layout blocks
- ✅ **Media Collection**: File management dan Supabase integration
- ✅ **Categories Collection**: Category CRUD operations

### Supabase API Tests  
File: `tests/int/supabase-api.int.spec.ts`

Testing untuk Supabase Storage:
- ✅ **Connection Testing**: Verify Supabase connection
- ✅ **Storage Operations**: Upload, download, delete files
- ✅ **Public URL Generation**: Test public URL access
- ✅ **Error Handling**: Duplicate files, invalid operations
- ✅ **File Metadata**: Metadata preservation

### API Validation Tests
File: `tests/int/api-validation.int.spec.ts`

Testing untuk validasi dan utility functions:
- ✅ **Environment Variables**: Required env vars validation
- ✅ **File Upload Validation**: Size limits, file types
- ✅ **Security Tests**: Authentication, CORS
- ✅ **Data Validation**: JSON structure, URL format
- ✅ **Error Handling**: Error codes, response format

## 🌍 Environment Variables

Pastikan environment variables berikut telah di-set:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database Configuration  
DATABASE_URI=postgresql://username:password@localhost:5432/database

# Payload Configuration
PAYLOAD_SECRET=your-payload-secret-key

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 Test Output

Test suite menggunakan output CLI yang profesional dengan:
- 🎨 **Colored Output**: Status yang mudah dibaca dengan warna
- 📈 **Progress Indicators**: Real-time progress untuk setiap test
- 📋 **Detailed Reporting**: Summary dan detailed results
- 🔍 **Error Details**: Informasi error yang comprehensive

### Sample Output

```
═══════════════════════════════════════════════════════════════════════════════
   SEFUNSOED - Backend API Unit Tests
═══════════════════════════════════════════════════════════════════════════════

📋 Environment Check
──────────────────────────────────────────────────────
✅ Node.js version: v18.20.2
✅ pnpm version: 9.0.0
✅ NEXT_PUBLIC_SUPABASE_URL: Set
✅ SUPABASE_SERVICE_ROLE_KEY: Set
✅ DATABASE_URI: Set
✅ PAYLOAD_SECRET: Set

📋 Running Integration Tests
──────────────────────────────────────────────────────
🧪 Testing user creation...
✅ User created with ID: 1
🧪 Testing post creation...
✅ Post created with ID: 1
🧪 Testing Supabase connection...
✅ Connected to Supabase, found 3 buckets

📋 Test Report Summary
──────────────────────────────────────────────────────
Total Suites: 4
Passed: 4
Failed: 0
Success Rate: 100%

✅ All tests passed! 🎉
```

## 🔧 Configuration

### Vitest Configuration
File: `vitest.config.mts`

Testing menggunakan Vitest dengan konfigurasi:
- **Environment**: jsdom untuk DOM testing
- **Setup Files**: `vitest.setup.ts` untuk environment setup
- **Include Pattern**: `tests/int/**/*.int.spec.ts`

### Test Setup
File: `vitest.setup.ts`

Setup yang di-load sebelum test:
- Environment variables loading
- Global test utilities

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Set**
   ```bash
   ⚠️ SUPABASE_SERVICE_ROLE_KEY: Not set
   ```
   Solution: Set the missing environment variable

2. **Database Connection Failed**
   ```bash
   ❌ Failed: Database connection
   ```
   Solution: Check DATABASE_URI and database status

3. **Supabase Connection Failed**
   ```bash
   ❌ Supabase connection failed
   ```
   Solution: Verify Supabase URL and service key

### Debug Mode

Untuk debug lebih detail, set environment variable:
```bash
DEBUG=1 pnpm run test:unit
```

## 🚀 Advanced Usage

### Running Tests in CI/CD

```yaml
# .github/workflows/test.yml
name: Run Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm run test:unit
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_KEY }}
          DATABASE_URI: ${{ secrets.DATABASE_URI }}
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
```

### Custom Test Configuration

Untuk menambah test baru, buat file dengan pattern:
- `tests/int/your-test.int.spec.ts`
- Export menggunakan Vitest syntax
- Include dalam test runner script

## 📝 Contributing

1. Tambah test cases baru sesuai kebutuhan
2. Pastikan test memiliki cleanup yang proper
3. Gunakan console.log dengan emoji untuk status yang jelas
4. Update dokumentasi jika menambah test suite baru

## 📄 License

MIT License - See LICENSE file for details
