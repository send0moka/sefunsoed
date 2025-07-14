# Implementasi Fitur Switch Bahasa untuk Posts

## Perubahan yang Dibuat

### 1. Database Schema (Migration SQL)
File: `migrations/001_add_indonesian_fields.sql`

Menambahkan kolom baru ke tabel `posts`:
- `title_id` (character varying) - Judul dalam bahasa Indonesia
- `content_id` (jsonb) - Konten dalam bahasa Indonesia

### 2. Backend/Collection Configuration
File: `src/collections/Posts/index.ts`

- Menambahkan field `title_id` untuk judul bahasa Indonesia
- Menambahkan field `content_id` untuk konten bahasa Indonesia
- Mengupdate label field untuk membedakan versi English dan Indonesian

### 3. Frontend Components

#### Language Provider
File: `src/providers/LanguageProvider.tsx`
- Context provider untuk mengelola state bahasa global
- Hook `useLanguage()` untuk mengakses dan mengubah bahasa

#### Language Aware RichText Component  
File: `src/components/LanguageAwareRichText.tsx`
- Komponen wrapper untuk RichText yang menampilkan konten sesuai bahasa yang dipilih
- Automatically switch antara English dan Indonesian content

#### PostHero Update
File: `src/heros/PostHero/index.tsx`
- Integrasi dengan language context
- Button switch bahasa dengan flag icons
- Menampilkan title sesuai bahasa yang dipilih

#### Post Detail Page Update
File: `src/app/(frontend)/posts/[slug]/page.tsx`
- Menggunakan LanguageAwareRichText component
- Update query untuk mengambil field `title_id` dan `content_id`

### 4. Utilities
File: `scripts/run-migration.mjs`
- Script untuk menampilkan SQL migration yang perlu dijalankan

## Cara Menggunakan

### 1. Jalankan Migration Database
Jalankan SQL berikut di PostgreSQL database:

```sql
-- Add title_id column for Indonesian title
ALTER TABLE public.posts 
ADD COLUMN title_id character varying;

-- Add content_id column for Indonesian content
ALTER TABLE public.posts 
ADD COLUMN content_id jsonb;

-- Create index for title_id for better search performance
CREATE INDEX IF NOT EXISTS posts_title_id_idx ON public.posts USING btree (title_id);

-- Add comments for documentation
COMMENT ON COLUMN public.posts.title_id IS 'Post title in Indonesian language';
COMMENT ON COLUMN public.posts.content_id IS 'Post content in Indonesian language (JSON format)';
```

### 2. Update Existing Posts
Untuk post yang sudah ada, Anda perlu menambahkan konten bahasa Indonesia melalui admin panel Payload.

### 3. Admin Panel Usage
1. Buka admin panel Payload
2. Edit post yang sudah ada atau buat post baru
3. Isi field "Title (Indonesian)" dan "Content (Indonesian)"
4. Save post

### 4. Frontend Usage
1. User dapat melihat button switch bahasa di PostHero
2. Klik flag untuk switch antara English (🇬🇧) dan Indonesian (🇮🇩)
3. Title dan content akan berubah sesuai bahasa yang dipilih

## Struktur Field Post

```typescript
interface Post {
  title: string           // English title
  title_id: string        // Indonesian title  
  content: RichTextContent    // English content
  content_id: RichTextContent // Indonesian content
  // ... other fields
}
```

## Type Safety
- Generated types sudah include field baru `title_id` dan `content_id`
- LanguageAwareRichText component menggunakan proper typing dari Post interface

## Admin Panel
Payload CMS tidak menyediakan custom UI admin panel secara default, tetapi field baru akan muncul di admin interface dengan label yang jelas:
- "Title (English)" 
- "Title (Indonesian)"
- "Content (English)"
- "Content (Indonesian)"

Field tersebut diorganisir dalam tab "Content" untuk kemudahan editing.

## Notes
- Language state disimpan di browser session (tidak persistent)
- Default bahasa adalah English
- Button switch bahasa menggunakan flag icons dari library `flag-icons`
- Content yang ditampilkan akan fallback ke English jika Indonesian content kosong

## Next Steps
1. Jalankan migration SQL di database
2. Restart development server jika belum
3. Buka admin panel dan edit post untuk menambahkan konten Indonesian
4. Test functionality di frontend
