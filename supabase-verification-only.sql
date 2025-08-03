-- ================================================
-- VERIFICATION ONLY - Cek Data Sebelum Migration
-- ================================================
-- Script ini HANYA UNTUK MELIHAT data, TIDAK mengubah apapun
-- Jalankan ini terlebih dahulu untuk memahami kondisi data saat ini

-- 1. Lihat sample data posts saat ini
SELECT 
    id,
    title,
    title_id,
    created_at,
    updated_at
FROM posts 
ORDER BY created_at DESC
LIMIT 5;

-- 2. Cek tipe data dan format titles
SELECT 
    id,
    title,
    title_id,
    -- Cek apakah title sudah dalam format JSON
    CASE 
        WHEN title ~ '^{.*}$' THEN 'Already JSON'
        WHEN title IS NOT NULL AND title != '' THEN 'String - needs conversion'
        ELSE 'Empty/NULL'
    END as title_status,
    -- Cek apakah title_id sudah dalam format JSON  
    CASE 
        WHEN title_id ~ '^{.*}$' THEN 'Already JSON'
        WHEN title_id IS NOT NULL AND title_id != '' THEN 'String - needs conversion'
        ELSE 'Empty/NULL'
    END as title_id_status
FROM posts 
ORDER BY created_at DESC;

-- 3. Count berapa yang perlu dikonversi
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN title IS NOT NULL AND title != '' AND NOT (title ~ '^{.*}$') THEN 1 END) as title_strings_to_convert,
    COUNT(CASE WHEN title_id IS NOT NULL AND title_id != '' AND NOT (title_id ~ '^{.*}$') THEN 1 END) as title_id_strings_to_convert,
    COUNT(CASE WHEN title ~ '^{.*}$' THEN 1 END) as title_already_json,
    COUNT(CASE WHEN title_id ~ '^{.*}$' THEN 1 END) as title_id_already_json
FROM posts;

-- 4. Cek struktur table posts
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
    AND column_name IN ('title', 'title_id')
ORDER BY ordinal_position;

-- 5. Test konversi pada 1 sample (TIDAK MENGUBAH DATA)
-- Ini hanya menunjukkan bagaimana hasil konversi akan terlihat
SELECT 
    id,
    title as original_title,
    title_id as original_title_id,
    -- Preview hasil konversi title
    CASE 
        WHEN title IS NOT NULL AND title != '' AND NOT (title ~ '^{.*}$') THEN
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
        WHEN title ~ '^{.*}$' THEN title::jsonb
        ELSE NULL
    END as preview_converted_title,
    -- Preview hasil konversi title_id
    CASE 
        WHEN title_id IS NOT NULL AND title_id != '' AND NOT (title_id ~ '^{.*}$') THEN
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
        WHEN title_id ~ '^{.*}$' THEN title_id::jsonb
        ELSE NULL
    END as preview_converted_title_id
FROM posts 
WHERE title IS NOT NULL OR title_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 3;
