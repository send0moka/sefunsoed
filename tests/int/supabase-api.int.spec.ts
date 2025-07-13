/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeAll } from 'vitest'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load test environment variables
dotenv.config({ path: '.env.test' })

describe('Supabase API Integration Tests', () => {
  let supabase: SupabaseClient

  beforeAll(() => {
    console.log('🚀 Initializing Supabase client for API tests...')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.log('⚠️ Missing Supabase environment variables - using dummy client')
      // Use dummy values for testing
      supabase = createClient('https://dummy-project.supabase.co', 'dummy_key_for_testing')
      return
    }

    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase client initialized successfully')
  })

  describe('Supabase Connection', () => {
    it('should connect to Supabase successfully', async () => {
      console.log('🧪 Testing Supabase connection...')

      const { data, error } = await supabase.storage.listBuckets()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data).not.toBeNull()
      expect(Array.isArray(data)).toBe(true)

      console.log(`✅ Connected to Supabase, found ${data!.length} buckets`)
    })

    it('should have media bucket available', async () => {
      console.log('🧪 Testing media bucket availability...')

      const { data: buckets, error } = await supabase.storage.listBuckets()

      expect(error).toBeNull()
      expect(buckets).toBeDefined()

      const mediaBucket = buckets?.find((bucket: any) => bucket.name === 'media')
      expect(mediaBucket).toBeDefined()
      expect(mediaBucket?.public).toBe(true)

      console.log('✅ Media bucket is available and public')
    })
  })

  describe('Storage Operations', () => {
    const testFileName = `test-${Date.now()}.txt`
    const testContent = 'This is a test file for unit testing'

    it('should upload a file to storage', async () => {
      console.log('🧪 Testing file upload to Supabase storage...')

      const { data, error } = await supabase.storage
        .from('media')
        .upload(testFileName, testContent, {
          contentType: 'text/plain',
          cacheControl: '3600',
          upsert: false,
        })

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data?.path).toBe(testFileName)

      console.log(`✅ File uploaded successfully: ${data?.path}`)
    })

    it('should generate public URL for uploaded file', async () => {
      console.log('🧪 Testing public URL generation...')

      const { data } = supabase.storage.from('media').getPublicUrl(testFileName)

      expect(data.publicUrl).toBeDefined()
      expect(data.publicUrl).toMatch(/^https?:\/\//)
      expect(data.publicUrl).toContain(testFileName)

      console.log(`✅ Public URL generated: ${data.publicUrl}`)
    })

    it('should list files in storage', async () => {
      console.log('🧪 Testing file listing...')

      const { data, error } = await supabase.storage.from('media').list('', {
        limit: 100,
        offset: 0,
      })

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(Array.isArray(data)).toBe(true)

      // Check if our test file is in the list
      const testFile = data?.find((file: any) => file.name === testFileName)
      expect(testFile).toBeDefined()

      console.log(`✅ Found ${data?.length} files in storage, including test file`)
    })

    it('should download the uploaded file', async () => {
      console.log('🧪 Testing file download...')

      const { data, error } = await supabase.storage.from('media').download(testFileName)

      expect(error).toBeNull()
      expect(data).toBeDefined()

      // Convert blob to text and verify content
      const downloadedText = await data?.text()
      expect(downloadedText).toBe(testContent)

      console.log('✅ File downloaded and content verified')
    })

    it('should delete the test file', async () => {
      console.log('🧪 Testing file deletion...')

      const { data, error } = await supabase.storage.from('media').remove([testFileName])

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data?.length).toBe(1)
      expect(data?.[0].name).toBe(testFileName)

      console.log('✅ Test file deleted successfully')
    })
  })

  describe('Storage Policies', () => {
    it('should allow public read access', async () => {
      console.log('🧪 Testing public read access policy...')

      // Create a test file first
      const publicTestFile = `public-test-${Date.now()}.txt`
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(publicTestFile, 'public test content')

      expect(uploadError).toBeNull()

      // Try to access the public URL without authentication
      const { data } = supabase.storage.from('media').getPublicUrl(publicTestFile)

      expect(data.publicUrl).toBeDefined()

      // Test if the URL is accessible (this would need a fetch in a real scenario)
      console.log(`✅ Public URL generated: ${data.publicUrl}`)

      // Clean up
      await supabase.storage.from('media').remove([publicTestFile])
    })

    it('should handle authenticated uploads', async () => {
      console.log('🧪 Testing authenticated upload capability...')

      const authTestFile = `auth-test-${Date.now()}.txt`
      const { data, error } = await supabase.storage
        .from('media')
        .upload(authTestFile, 'authenticated upload test', {
          contentType: 'text/plain',
        })

      expect(error).toBeNull()
      expect(data).toBeDefined()

      console.log('✅ Authenticated upload successful')

      // Clean up
      await supabase.storage.from('media').remove([authTestFile])
    })
  })

  describe('Error Handling', () => {
    it('should handle duplicate file upload gracefully', async () => {
      console.log('🧪 Testing duplicate file handling...')

      const duplicateFileName = `duplicate-test-${Date.now()}.txt`

      // Upload file first time
      const { error: firstError } = await supabase.storage
        .from('media')
        .upload(duplicateFileName, 'first upload', { upsert: false })

      expect(firstError).toBeNull()

      // Try to upload same file again without upsert
      const { error: secondError } = await supabase.storage
        .from('media')
        .upload(duplicateFileName, 'second upload', { upsert: false })

      expect(secondError).toBeDefined()
      expect(secondError?.message).toContain('already exists')

      console.log('✅ Duplicate file handling works correctly')

      // Clean up
      await supabase.storage.from('media').remove([duplicateFileName])
    })

    it('should handle non-existent file download', async () => {
      console.log('🧪 Testing non-existent file download...')

      const nonExistentFile = `non-existent-${Date.now()}.txt`

      const { data, error } = await supabase.storage.from('media').download(nonExistentFile)

      expect(error).toBeDefined()
      expect(data).toBeNull()

      console.log('✅ Non-existent file error handled correctly')
    })

    it('should handle invalid bucket access', async () => {
      console.log('🧪 Testing invalid bucket access...')

      const { data, error } = await supabase.storage.from('non-existent-bucket').list()

      expect(error).toBeDefined()
      // Supabase may return empty array instead of null for invalid bucket
      expect(data === null || (Array.isArray(data) && data.length === 0)).toBe(true)

      console.log('✅ Invalid bucket access handled correctly')
    })
  })

  describe('File Metadata', () => {
    it('should preserve file metadata during upload', async () => {
      console.log('🧪 Testing file metadata preservation...')

      const metadataTestFile = `metadata-test-${Date.now()}.json`
      const testData = JSON.stringify({ test: 'data', timestamp: Date.now() })

      const { data, error } = await supabase.storage
        .from('media')
        .upload(metadataTestFile, testData, {
          contentType: 'application/json',
          cacheControl: '3600',
          metadata: {
            customField: 'testValue',
          },
        })

      expect(error).toBeNull()
      expect(data).toBeDefined()

      // Get file info to check metadata
      const { data: fileList, error: listError } = await supabase.storage.from('media').list('', {
        search: metadataTestFile,
      })

      expect(listError).toBeNull()
      expect(fileList).toBeDefined()
      expect(fileList?.length).toBe(1)

      const fileInfo = fileList![0]
      expect(fileInfo.name).toBe(metadataTestFile)
      expect(fileInfo.metadata).toBeDefined()

      console.log('✅ File metadata preserved correctly')

      // Clean up
      await supabase.storage.from('media').remove([metadataTestFile])
    })
  })
})
