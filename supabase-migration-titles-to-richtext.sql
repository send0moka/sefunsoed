-- ================================================
-- SUPABASE MIGRATION: Convert String Titles to Rich Text Format
-- ================================================
-- 
-- PENTING: Script ini AMAN dan TIDAK AKAN MENGHAPUS DATA!
-- Script ini hanya mengkonversi string titles menjadi rich text JSON format
-- untuk memperbaiki error Lexical editor di Payload CMS.
--
-- SEBELUM MENJALANKAN:
-- 1. Backup database terlebih dahulu (sangat direkomendasikan)
-- 2. Test di environment development jika memungkinkan
-- 3. Jalankan query verification terlebih dahulu untuk melihat data
--
-- ================================================

-- STEP 1: VERIFICATION - Cek data yang akan diubah
-- Jalankan query ini terlebih dahulu untuk melihat data yang akan dikonversi
SELECT 
    id,
    title,
    title_id,
    CASE 
        WHEN title ~ '^{.*}$' THEN 'Already JSON'
        WHEN title IS NOT NULL AND title != '' THEN 'String - needs conversion'
        ELSE 'Empty/NULL'
    END as title_status,
    CASE 
        WHEN title_id ~ '^{.*}$' THEN 'Already JSON' 
        WHEN title_id IS NOT NULL AND title_id != '' THEN 'String - needs conversion'
        ELSE 'Empty/NULL'
    END as title_id_status,
    created_at
FROM posts 
ORDER BY created_at DESC
LIMIT 10;

-- STEP 2: COUNT - Hitung berapa record yang akan diubah
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN title IS NOT NULL AND title != '' AND NOT (title ~ '^{.*}$') THEN 1 END) as title_to_convert,
    COUNT(CASE WHEN title_id IS NOT NULL AND title_id != '' AND NOT (title_id ~ '^{.*}$') THEN 1 END) as title_id_to_convert
FROM posts;

-- ================================================
-- STEP 3: BACKUP TABLE (OPSIONAL TAPI DIREKOMENDASIKAN)
-- ================================================
-- Uncomment baris di bawah jika ingin membuat backup table
-- CREATE TABLE posts_backup_before_richtext AS SELECT * FROM posts;

-- ================================================
-- STEP 4: MIGRATION - Konversi string titles ke rich text format
-- ================================================

-- Update English titles (title field)
-- Hanya update jika title berisi string (bukan JSON) dan tidak kosong
UPDATE posts 
SET title = jsonb_build_object(
    'root', jsonb_build_object(
        'children', jsonb_build_array(
            jsonb_build_object(
                'children', jsonb_build_array(
                    jsonb_build_object(
                        'detail', 0,
                        'format', 0,
                        'mode', 'normal',
                        'style', '',
                        'text', title,
                        'type', 'text',
                        'version', 1
                    )
                ),
                'direction', 'ltr',
                'format', '',
                'indent', 0,
                'type', 'paragraph',
                'version', 1
            )
        ),
        'direction', 'ltr',
        'format', '',
        'indent', 0,
        'type', 'root',
        'version', 1
    )
)
WHERE title IS NOT NULL 
    AND title != ''
    AND NOT (title ~ '^{.*}$');  -- Only update if it's not already JSON

-- Update Indonesian titles (title_id field)
-- Hanya update jika title_id berisi string (bukan JSON) dan tidak kosong
UPDATE posts 
SET title_id = jsonb_build_object(
    'root', jsonb_build_object(
        'children', jsonb_build_array(
            jsonb_build_object(
                'children', jsonb_build_array(
                    jsonb_build_object(
                        'detail', 0,
                        'format', 0,
                        'mode', 'normal',
                        'style', '',
                        'text', title_id,
                        'type', 'text',
                        'version', 1
                    )
                ),
                'direction', 'ltr',
                'format', '',
                'indent', 0,
                'type', 'paragraph',
                'version', 1
            )
        ),
        'direction', 'ltr',
        'format', '',
        'indent', 0,
        'type', 'root',
        'version', 1
    )
)
WHERE title_id IS NOT NULL 
    AND title_id != ''
    AND NOT (title_id ~ '^{.*}$');  -- Only update if it's not already JSON

-- ================================================
-- STEP 5: VERIFICATION - Verifikasi hasil konversi
-- ================================================

-- Cek hasil konversi
SELECT 
    id,
    -- Extract text from rich text JSON (with proper type casting)
    CASE 
        WHEN title ~ '^{.*}$' THEN title::jsonb->'root'->'children'->0->'children'->0->>'text'
        ELSE title
    END as extracted_title_text,
    CASE 
        WHEN title_id ~ '^{.*}$' THEN title_id::jsonb->'root'->'children'->0->'children'->0->>'text'
        ELSE title_id
    END as extracted_title_id_text,
    -- Check if it's valid JSON
    CASE 
        WHEN title ~ '^{.*}$' THEN 
            CASE 
                WHEN jsonb_typeof(title::jsonb) = 'object' THEN 'Valid JSON Object'
                ELSE 'Invalid JSON'
            END
        ELSE 'String (not JSON)'
    END as title_json_status,
    CASE 
        WHEN title_id ~ '^{.*}$' THEN 
            CASE 
                WHEN jsonb_typeof(title_id::jsonb) = 'object' THEN 'Valid JSON Object'
                ELSE 'Invalid JSON'
            END
        ELSE 'String (not JSON)'
    END as title_id_json_status,
    created_at
FROM posts 
WHERE title IS NOT NULL OR title_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;

-- Count hasil akhir
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN title ~ '^{.*}$' AND jsonb_typeof(title::jsonb) = 'object' THEN 1 END) as title_as_json,
    COUNT(CASE WHEN title_id ~ '^{.*}$' AND jsonb_typeof(title_id::jsonb) = 'object' THEN 1 END) as title_id_as_json,
    COUNT(CASE WHEN title IS NOT NULL AND title != '' THEN 1 END) as total_with_title,
    COUNT(CASE WHEN title_id IS NOT NULL AND title_id != '' THEN 1 END) as total_with_title_id
FROM posts;

-- ================================================
-- ROLLBACK SCRIPT (JIKA DIPERLUKAN)
-- ================================================
-- HANYA JALANKAN JIKA ADA MASALAH DAN INGIN ROLLBACK!
-- 
-- Uncomment dan jalankan script di bawah jika ada masalah:
-- 
-- -- Rollback from backup table (jika sudah dibuat backup)
-- -- UPDATE posts SET title = posts_backup_before_richtext.title, 
-- --                  title_id = posts_backup_before_richtext.title_id 
-- -- FROM posts_backup_before_richtext 
-- -- WHERE posts.id = posts_backup_before_richtext.id;
-- 
-- -- Drop backup table setelah selesai (opsional)
-- -- DROP TABLE IF EXISTS posts_backup_before_richtext;

-- ================================================
-- SUMMARY
-- ================================================
-- Script ini akan:
-- ✅ Mengkonversi string titles menjadi rich text JSON format
-- ✅ TIDAK menghapus data yang sudah ada
-- ✅ TIDAK mengubah struktur table
-- ✅ Hanya update field yang berisi string (skip yang sudah JSON)
-- ✅ Memberikan verifikasi sebelum dan sesudah migration
-- ✅ Menyediakan rollback option jika diperlukan
-- ================================================
