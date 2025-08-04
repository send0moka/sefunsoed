# FAQ Indonesian Columns Migration - Supabase

## Panduan Menjalankan Migration

### 1. Menggunakan Supabase Dashboard
1. Login ke [Supabase Dashboard](https://app.supabase.io)
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Copy paste isi file `supabase-add-faq-indonesian-columns.sql`
5. Klik **Run** untuk menjalankan migration

### 2. Menggunakan Supabase CLI (jika sudah setup)
```bash
# Login ke Supabase
supabase login

# Link ke project Anda
supabase link --project-ref YOUR_PROJECT_REF

# Jalankan migration
supabase db reset --db-url "YOUR_DATABASE_URL"
```

### 3. Menggunakan psql dengan connection string Supabase
```bash
# Dapatkan connection string dari Supabase Dashboard > Settings > Database
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" -f supabase-add-faq-indonesian-columns.sql
```

## Struktur Kolom Baru

Setelah migration berhasil, tabel FAQ akan memiliki kolom tambahan:

### `pages_blocks_faq_block_faq_items`
- `question_id` (varchar) - Versi bahasa Indonesia dari pertanyaan
- `answer_id` (jsonb) - Versi bahasa Indonesia dari jawaban (format Lexical Editor)

### `_pages_v_blocks_faq_block_faq_items` (Version table)
- `question_id` (varchar) - Versi bahasa Indonesia dari pertanyaan  
- `answer_id` (jsonb) - Versi bahasa Indonesia dari jawaban (format Lexical Editor)

## Contoh Data

Migration akan mengupdate data existing dengan terjemahan Indonesia:

| English Question | Indonesian Question (question_id) |
|-----------------|-----------------------------------|
| What is SEF Unsoed? | Apa itu SEF Unsoed? |
| Who can join SEF Unsoed? | Siapa yang bisa bergabung dengan SEF Unsoed? |
| What are the benefits of joining SEF? | Apa manfaat bergabung dengan SEF? |

## Verifikasi Migration

Setelah migration, jalankan query ini untuk memverifikasi:

```sql
SELECT 
  question, 
  question_id,
  CASE 
    WHEN answer_id IS NOT NULL THEN 'Has Indonesian translation'
    ELSE 'No Indonesian translation'
  END as indonesian_status
FROM public.pages_blocks_faq_block_faq_items
ORDER BY _order;
```

## Penggunaan di Frontend

Setelah migration berhasil, FAQ Block akan otomatis mendeteksi bahasa yang dipilih user dan menampilkan konten yang sesuai:

- Bahasa Inggris: Menggunakan kolom `question` dan `answer`
- Bahasa Indonesia: Menggunakan kolom `question_id` dan `answer_id` (fallback ke English jika tidak ada)

Sistem sudah terintegrasi dengan `useLanguage` hook dan akan berfungsi otomatis.
