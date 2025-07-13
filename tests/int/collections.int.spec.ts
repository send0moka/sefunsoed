/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest'

let payload: Payload
let createdTestUser: any

describe('Collections Integration Tests', () => {
  beforeAll(async () => {
    console.log('🚀 Initializing Payload for Collections Integration Tests...')
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    console.log('✅ Payload initialized successfully')
  })

  describe('Users Collection', () => {
    beforeEach(async () => {
      // Clean up any existing test users
      const existingUsers = await payload.find({
        collection: 'users',
        where: {
          email: { equals: 'test-user@example.com' },
        },
      })

      for (const user of existingUsers.docs) {
        await payload.delete({
          collection: 'users',
          id: user.id,
        })
      }
    })

    it('should create a new user', async () => {
      console.log('🧪 Testing user creation...')

      const userData = {
        email: 'test-user@example.com',
        password: 'testPassword123',
        name: 'Test User',
      }

      const result = await payload.create({
        collection: 'users',
        data: userData,
      })

      createdTestUser = result

      expect(result).toBeDefined()
      expect(result.email).toBe(userData.email)
      expect(result.name).toBe(userData.name)
      expect(result.id).toBeDefined()

      console.log(`✅ User created with ID: ${result.id}`)
    })

    it('should find users with pagination', async () => {
      console.log('🧪 Testing user pagination...')

      const result = await payload.find({
        collection: 'users',
        limit: 10,
        page: 1,
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)
      expect(result.totalDocs).toBeTypeOf('number')
      expect(result.page).toBe(1)
      expect(result.hasNextPage).toBeTypeOf('boolean')

      console.log(`✅ Found ${result.totalDocs} users`)
    })

    it('should update a user', async () => {
      if (!createdTestUser) {
        console.log('⚠️ No test user found, creating one...')
        createdTestUser = await payload.create({
          collection: 'users',
          data: {
            email: 'test-user@example.com',
            password: 'testPassword123',
            name: 'Test User',
          },
        })
      }

      console.log('🧪 Testing user update...')

      const updatedName = 'Updated Test User'
      const result = await payload.update({
        collection: 'users',
        id: createdTestUser.id,
        data: {
          name: updatedName,
        },
      })

      expect(result.name).toBe(updatedName)
      console.log(`✅ User updated successfully`)
    })
  })

  describe('Posts Collection', () => {
    let createdTestPost: any

    beforeEach(async () => {
      if (!createdTestUser) {
        createdTestUser = await payload.create({
          collection: 'users',
          data: {
            email: 'test-user@example.com',
            password: 'testPassword123',
            name: 'Test User',
          },
        })
      }
    })

    it('should create a new post', async () => {
      console.log('🧪 Testing post creation...')

      const postData = {
        title: 'Test Post',
        slug: 'test-post',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'This is a test post content.',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        authors: [createdTestUser.id],
        _status: 'published',
      }

      const result = await payload.create({
        collection: 'posts',
        data: postData as any,
      })

      createdTestPost = result

      expect(result).toBeDefined()
      expect(result.title).toBe(postData.title)
      expect(result.slug).toBe(postData.slug)
      expect(result._status).toBe('published')
      expect(result.authors).toContain(createdTestUser.id)

      console.log(`✅ Post created with ID: ${result.id}`)
    })

    it('should find posts by status', async () => {
      console.log('🧪 Testing posts filtering by status...')

      const result = await payload.find({
        collection: 'posts',
        where: {
          _status: { equals: 'published' },
        },
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)

      // Check that all returned posts have published status
      result.docs.forEach((post) => {
        expect(post._status).toBe('published')
      })

      console.log(`✅ Found ${result.docs.length} published posts`)
    })

    it('should find posts by author', async () => {
      console.log('🧪 Testing posts filtering by author...')

      const result = await payload.find({
        collection: 'posts',
        where: {
          authors: { in: [createdTestUser.id] },
        },
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)

      console.log(`✅ Found ${result.docs.length} posts by test user`)
    })

    afterAll(async () => {
      // Clean up test post
      if (createdTestPost) {
        try {
          await payload.delete({
            collection: 'posts',
            id: createdTestPost.id,
          })
          console.log(`🧹 Cleaned up test post: ${createdTestPost.id}`)
        } catch (error) {
          console.log(`⚠️ Could not clean up test post: ${error}`)
        }
      }
    })
  })

  describe('Pages Collection', () => {
    let createdTestPage: any

    it('should create a new page', async () => {
      console.log('🧪 Testing page creation...')

      const pageData = {
        title: 'Test Page',
        slug: 'test-page',
        _status: 'published',
      }

      const result = await payload.create({
        collection: 'pages',
        data: pageData as any,
      })

      createdTestPage = result

      expect(result).toBeDefined()
      expect(result.title).toBe(pageData.title)
      expect(result.slug).toBe(pageData.slug)
      expect(result._status).toBe('published')

      console.log(`✅ Page created with ID: ${result.id}`)
    })

    it('should find pages with layout blocks', async () => {
      console.log('🧪 Testing pages with layout blocks...')

      const result = await payload.find({
        collection: 'pages',
        where: {
          layout: { exists: true },
        },
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)

      console.log(`✅ Found ${result.docs.length} pages with layout blocks`)
    })

    afterAll(async () => {
      // Clean up test page
      if (createdTestPage) {
        try {
          await payload.delete({
            collection: 'pages',
            id: createdTestPage.id,
          })
          console.log(`🧹 Cleaned up test page: ${createdTestPage.id}`)
        } catch (error) {
          console.log(`⚠️ Could not clean up test page: ${error}`)
        }
      }
    })
  })

  describe('Media Collection', () => {
    it('should find media files', async () => {
      console.log('🧪 Testing media collection access...')

      const result = await payload.find({
        collection: 'media',
        limit: 5,
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)
      expect(result.totalDocs).toBeTypeOf('number')

      console.log(`✅ Found ${result.totalDocs} media files`)

      // Test media file structure
      if (result.docs.length > 0) {
        const mediaFile = result.docs[0]
        expect(mediaFile.filename).toBeDefined()
        expect(mediaFile.url).toBeDefined()

        // Check for Supabase fields if they exist
        if (mediaFile.supabaseUrl) {
          expect(mediaFile.supabaseUrl).toMatch(/^https?:\/\//)
          console.log(`✅ Media file has Supabase URL: ${mediaFile.supabaseUrl}`)
        }
      }
    })

    it('should filter media by file type', async () => {
      console.log('🧪 Testing media filtering by file type...')

      const result = await payload.find({
        collection: 'media',
        where: {
          mimeType: { like: 'image/%' },
        },
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)

      // Verify all results are images
      result.docs.forEach((media) => {
        expect(media.mimeType).toMatch(/^image\//)
      })

      console.log(`✅ Found ${result.docs.length} image files`)
    })
  })

  describe('Categories Collection', () => {
    let createdTestCategory: any

    it('should create a new category', async () => {
      console.log('🧪 Testing category creation...')

      const categoryData = {
        title: 'Test Category',
        slug: 'test-category',
      }

      const result = await payload.create({
        collection: 'categories',
        data: categoryData,
      })

      createdTestCategory = result

      expect(result).toBeDefined()
      expect(result.title).toBe(categoryData.title)
      expect(result.slug).toBe(categoryData.slug)

      console.log(`✅ Category created with ID: ${result.id}`)
    })

    it('should find categories', async () => {
      console.log('🧪 Testing categories retrieval...')

      const result = await payload.find({
        collection: 'categories',
      })

      expect(result).toBeDefined()
      expect(result.docs).toBeInstanceOf(Array)

      console.log(`✅ Found ${result.totalDocs} categories`)
    })

    afterAll(async () => {
      // Clean up test category
      if (createdTestCategory) {
        try {
          await payload.delete({
            collection: 'categories',
            id: createdTestCategory.id,
          })
          console.log(`🧹 Cleaned up test category: ${createdTestCategory.id}`)
        } catch (error) {
          console.log(`⚠️ Could not clean up test category: ${error}`)
        }
      }
    })
  })

  afterAll(async () => {
    // Clean up test user
    if (createdTestUser) {
      try {
        await payload.delete({
          collection: 'users',
          id: createdTestUser.id,
        })
        console.log(`🧹 Cleaned up test user: ${createdTestUser.id}`)
      } catch (error) {
        console.log(`⚠️ Could not clean up test user: ${error}`)
      }
    }

    console.log('🏁 Collections Integration Tests completed')
  })
})
