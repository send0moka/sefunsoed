import { createClient } from '@supabase/supabase-js'

// Define types since Payload doesn't export them
interface UploadFileArgs {
  file: {
    data: Buffer | ArrayBuffer | Uint8Array | Blob
    type: string
    name: string
    size: number
  }
  filename: string
}

interface DeleteFileArgs {
  filename: string
}

interface GetFileURLArgs {
  filename: string
}

interface StorageAdapter {
  name: string
  uploadFile: (args: UploadFileArgs) => Promise<string>
  deleteFile: (args: DeleteFileArgs) => Promise<void>
  getFileURL: (args: GetFileURLArgs) => Promise<string>
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const supabaseAdapter: StorageAdapter = {
  name: 'supabase',

  async uploadFile({ file, filename }: UploadFileArgs): Promise<string> {
    try {
      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = filename.split('.').pop()
      const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

      // Upload to Supabase using file.data
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(uniqueFilename, file.data, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

      console.log('Successfully uploaded to Supabase:', urlData.publicUrl)
      return urlData.publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  async deleteFile({ filename }): Promise<void> {
    try {
      // Extract the actual filename from URL if it's a full URL
      const actualFilename = filename.includes('/') ? filename.split('/').pop() : filename

      if (actualFilename) {
        const { error } = await supabase.storage.from('media').remove([actualFilename])

        if (error) {
          console.error('Supabase delete error:', error)
        }
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  },

  async getFileURL({ filename }): Promise<string> {
    try {
      // If it's already a full URL, return it
      if (filename.startsWith('http')) {
        return filename
      }

      // Otherwise, generate URL
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filename)

      return urlData.publicUrl
    } catch (error) {
      console.error('Get URL error:', error)
      return filename
    }
  },
}
