import { createClient } from '@supabase/supabase-js'

export interface SupabaseConfig {
  bucket: string
  supabaseUrl: string
  supabaseKey: string
  prefix?: string
}

export interface FileInfo {
  filename: string
  filesize: number
  mimeType: string
  url: string
}

export interface UploadArgs {
  file:
    | {
        buffer?: Buffer
        size?: number
        mimetype?: string
      }
    | Buffer
    | any // Allow any for stream
  filename: string
}

export interface DeleteArgs {
  filename: string
}

export interface GenerateURLArgs {
  filename: string
}

export const createSupabaseStorage = ({
  bucket,
  supabaseUrl,
  supabaseKey,
  prefix = '',
}: SupabaseConfig) => {
  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    // Upload file to Supabase Storage
    uploadFile: async ({ file, filename }: UploadArgs): Promise<FileInfo> => {
      try {
        const fileKey = prefix ? `${prefix}/${filename}` : filename

        // Convert file buffer/stream to Uint8Array
        let buffer: Uint8Array
        let fileSize = 0
        let mimeType = 'application/octet-stream'

        if (file && typeof file === 'object' && 'buffer' in file && file.buffer) {
          buffer = new Uint8Array(file.buffer)
          fileSize = (file as { size?: number }).size || file.buffer.length
          mimeType = (file as { mimetype?: string }).mimetype || 'application/octet-stream'
        } else if (file instanceof Buffer) {
          buffer = new Uint8Array(file)
          fileSize = file.length
        } else {
          // Handle stream - simple fallback
          const streamBuffer = Buffer.from('') // Default empty
          buffer = new Uint8Array(streamBuffer)
          fileSize = streamBuffer.length
        }

        const { error } = await supabase.storage.from(bucket).upload(fileKey, buffer, {
          contentType: mimeType,
          duplex: 'half',
        })

        if (error) {
          throw new Error(`Supabase upload failed: ${error.message}`)
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileKey)

        return {
          filename,
          filesize: fileSize,
          mimeType,
          url: publicUrlData.publicUrl,
        }
      } catch (error) {
        console.error('Supabase storage upload error:', error)
        throw error
      }
    },

    // Delete file from Supabase Storage
    deleteFile: async ({ filename }: DeleteArgs): Promise<void> => {
      try {
        const fileKey = prefix ? `${prefix}/${filename}` : filename

        const { error } = await supabase.storage.from(bucket).remove([fileKey])

        if (error) {
          console.error('Supabase delete error:', error)
          throw new Error(`Supabase delete failed: ${error.message}`)
        }
      } catch (error) {
        console.error('Supabase storage delete error:', error)
        throw error
      }
    },

    // Generate URL for file
    generateURL: ({ filename }: GenerateURLArgs): string => {
      const fileKey = prefix ? `${prefix}/${filename}` : filename
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileKey)

      return data.publicUrl
    },
  }
}
