-- ================================================
-- SUPABASE COLUMN TYPE MIGRATION: VARCHAR to JSONB
-- ================================================
-- 
-- PENTING: Script ini akan mengubah struktur kolom dari VARCHAR ke JSONB
-- Jalankan ini SETELAH data sudah dikonversi ke format JSON
-- 
-- BACKUP database terlebih dahulu sebelum menjalankan!
--
-- ================================================

-- STEP 1: VERIFICATION - Pastikan semua data sudah dalam format JSON
SELECT 
    id,
    title,
    title_id,
    CASE 
        WHEN title ~ '^{.*}$' THEN 'JSON Format'
        WHEN title IS NOT NULL AND title != '' THEN 'STRING Format - NEEDS CONVERSION!'
        ELSE 'Empty/NULL'
    END as title_format,
    CASE 
        WHEN title_id ~ '^{.*}$' THEN 'JSON Format'
        WHEN title_id IS NOT NULL AND title_id != '' THEN 'STRING Format - NEEDS CONVERSION!'
        ELSE 'Empty/NULL'
    END as title_id_format
FROM posts 
ORDER BY created_at DESC
LIMIT 10;

-- STEP 2: COUNT - Pastikan tidak ada string yang tersisa
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN title IS NOT NULL AND title != '' AND NOT (title ~ '^{.*}$') THEN 1 END) as title_still_string,
    COUNT(CASE WHEN title_id IS NOT NULL AND title_id != '' AND NOT (title_id ~ '^{.*}$') THEN 1 END) as title_id_still_string
FROM posts;

-- ⚠️ JIKA ADA STRING YANG TERSISA, JALANKAN DULU MIGRATION DATA SEBELUM LANJUT!

-- ================================================
-- STEP 3: COLUMN TYPE MIGRATION
-- ================================================

-- BACKUP table terlebih dahulu (HIGHLY RECOMMENDED!)
CREATE TABLE posts_backup_before_column_change AS SELECT * FROM posts;

-- Option A: Direct ALTER (jika semua data sudah JSON format)
-- Uncomment baris di bawah jika yakin semua data sudah JSON:

-- ALTER TABLE posts ALTER COLUMN title TYPE jsonb USING title::jsonb;
-- ALTER TABLE posts ALTER COLUMN title_id TYPE jsonb USING title_id::jsonb;

-- Option B: Safe Migration dengan temporary columns (RECOMMENDED)
-- Langkah ini lebih aman karena kita bisa rollback jika ada masalah

-- 1. Tambah kolom temporary dengan tipe jsonb
ALTER TABLE posts ADD COLUMN title_temp jsonb;
ALTER TABLE posts ADD COLUMN title_id_temp jsonb;

-- 2. Copy data ke kolom temporary dengan conversion
UPDATE posts 
SET title_temp = CASE 
    WHEN title ~ '^{.*}$' THEN title::jsonb
    WHEN title IS NOT NULL AND title != '' THEN 
        jsonb_build_object(
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
    ELSE NULL
END;

UPDATE posts 
SET title_id_temp = CASE 
    WHEN title_id ~ '^{.*}$' THEN title_id::jsonb
    WHEN title_id IS NOT NULL AND title_id != '' THEN 
        jsonb_build_object(
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
    ELSE NULL
END;

-- 3. Verify data in temporary columns
SELECT 
    id,
    title_temp->'root'->'children'->0->'children'->0->>'text' as title_text,
    title_id_temp->'root'->'children'->0->'children'->0->>'text' as title_id_text,
    jsonb_typeof(title_temp) as title_type,
    jsonb_typeof(title_id_temp) as title_id_type
FROM posts 
WHERE title_temp IS NOT NULL OR title_id_temp IS NOT NULL
LIMIT 5;

-- 4. Drop old columns and rename temporary columns
-- ⚠️ POINT OF NO RETURN - Pastikan data sudah benar sebelum menjalankan ini!

-- DROP old columns
ALTER TABLE posts DROP COLUMN title;
ALTER TABLE posts DROP COLUMN title_id;

-- Rename temporary columns
ALTER TABLE posts RENAME COLUMN title_temp TO title;
ALTER TABLE posts RENAME COLUMN title_id_temp TO title_id;

-- 5. Add back any constraints if needed
-- (Payload biasanya tidak menggunakan NOT NULL constraints untuk rich text fields)

-- ================================================
-- STEP 4: VERIFICATION - Verifikasi hasil akhir
-- ================================================

-- Cek struktur kolom
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
    AND column_name IN ('title', 'title_id')
ORDER BY ordinal_position;

-- Cek data hasil migrasi
SELECT 
    id,
    title->'root'->'children'->0->'children'->0->>'text' as title_text,
    title_id->'root'->'children'->0->'children'->0->>'text' as title_id_text,
    jsonb_typeof(title) as title_type,
    jsonb_typeof(title_id) as title_id_type,
    created_at
FROM posts 
WHERE title IS NOT NULL OR title_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;

-- Count final results
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN jsonb_typeof(title) = 'object' THEN 1 END) as title_as_jsonb,
    COUNT(CASE WHEN jsonb_typeof(title_id) = 'object' THEN 1 END) as title_id_as_jsonb,
    COUNT(CASE WHEN title IS NOT NULL THEN 1 END) as total_with_title,
    COUNT(CASE WHEN title_id IS NOT NULL THEN 1 END) as total_with_title_id
FROM posts;

-- ================================================
-- CLEANUP (OPTIONAL)
-- ================================================
-- Setelah yakin semuanya berfungsi dengan baik:
-- DROP TABLE posts_backup_before_column_change;

-- ================================================
-- ROLLBACK SCRIPT (EMERGENCY ONLY!)
-- ================================================
-- HANYA gunakan jika ada masalah serius dan perlu rollback:
-- 
-- -- Restore from backup
-- DROP TABLE posts;
-- ALTER TABLE posts_backup_before_column_change RENAME TO posts;
-- 
-- ================================================

-- ✅ EXPECTED RESULT:
-- - Kolom title dan title_id sekarang bertipe jsonb
-- - Semua data dalam format rich text JSON
-- - Payload admin panel berfungsi normal
-- - Frontend pages tidak error lagi
