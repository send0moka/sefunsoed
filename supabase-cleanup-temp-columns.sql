-- ================================================
-- CLEANUP TEMPORARY COLUMNS: Remove title_temp & title_id_temp
-- ================================================
-- 
-- SAFE CLEANUP: Menghapus kolom temporary yang tersisa dari migration process
-- 
-- CONTEXT: 
-- - Migration sudah berhasil (title & title_id sudah jsonb)
-- - Data sudah terkonversi dengan benar
-- - Temp columns tidak diperlukan lagi
-- - Payload mendeteksi temp columns dan ingin menghapusnya
--
-- ================================================

-- STEP 1: VERIFICATION - Pastikan data utama sudah benar
SELECT 
    id,
    title->'root'->'children'->0->'children'->0->>'text' as title_text,
    title_id->'root'->'children'->0->'children'->0->>'text' as title_id_text,
    jsonb_typeof(title) as title_type,
    jsonb_typeof(title_id) as title_id_type,
    -- Check temp columns
    CASE 
        WHEN title_temp IS NOT NULL THEN 'Has temp data'
        ELSE 'No temp data'
    END as title_temp_status,
    CASE 
        WHEN title_id_temp IS NOT NULL THEN 'Has temp data'
        ELSE 'No temp data'
    END as title_id_temp_status
FROM posts 
ORDER BY created_at DESC
LIMIT 5;

-- STEP 2: COMPARE DATA - Pastikan temp = main columns (should be identical)
SELECT 
    id,
    -- Compare title vs title_temp
    CASE 
        WHEN title::text = title_temp::text THEN 'IDENTICAL'
        WHEN title IS NULL AND title_temp IS NULL THEN 'BOTH NULL'
        ELSE 'DIFFERENT - CHECK NEEDED!'
    END as title_comparison,
    -- Compare title_id vs title_id_temp  
    CASE 
        WHEN title_id::text = title_id_temp::text THEN 'IDENTICAL'
        WHEN title_id IS NULL AND title_id_temp IS NULL THEN 'BOTH NULL'
        ELSE 'DIFFERENT - CHECK NEEDED!'
    END as title_id_comparison
FROM posts 
ORDER BY created_at DESC;

-- STEP 3: COUNT CHECK - Berapa banyak temp data
SELECT 
    COUNT(*) as total_posts,
    COUNT(title_temp) as posts_with_title_temp,
    COUNT(title_id_temp) as posts_with_title_id_temp,
    COUNT(CASE WHEN title_temp IS NOT NULL AND title IS NULL THEN 1 END) as temp_but_no_main_title,
    COUNT(CASE WHEN title_id_temp IS NOT NULL AND title_id IS NULL THEN 1 END) as temp_but_no_main_title_id
FROM posts;

-- ⚠️ JIKA ADA 'DIFFERENT' ATAU 'temp_but_no_main', JANGAN LANJUT!
-- Investigasi dulu kenapa data berbeda

-- ================================================
-- STEP 4: BACKUP (OPTIONAL BUT RECOMMENDED)
-- ================================================
-- Backup data temp columns sebelum dihapus (just in case)
CREATE TABLE posts_temp_columns_backup AS 
SELECT id, title_temp, title_id_temp 
FROM posts 
WHERE title_temp IS NOT NULL OR title_id_temp IS NOT NULL;

-- ================================================
-- STEP 5: SAFE CLEANUP - Drop temporary columns
-- ================================================

-- Drop temp columns (safe karena data sudah ada di main columns)
ALTER TABLE posts DROP COLUMN IF EXISTS title_temp;
ALTER TABLE posts DROP COLUMN IF EXISTS title_id_temp;

-- ================================================
-- STEP 6: VERIFICATION - Confirm cleanup
-- ================================================

-- Check table structure (temp columns should be gone)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'posts' 
    AND column_name LIKE '%title%'
ORDER BY ordinal_position;

-- Verify main data still intact
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
LIMIT 5;

-- Final count
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN jsonb_typeof(title) = 'object' THEN 1 END) as titles_as_jsonb,
    COUNT(CASE WHEN jsonb_typeof(title_id) = 'object' THEN 1 END) as title_ids_as_jsonb
FROM posts;

-- ================================================
-- CLEANUP BACKUP (OPTIONAL - after confirming everything works)
-- ================================================
-- After confirming Payload works fine, you can drop the backup:
-- DROP TABLE IF EXISTS posts_temp_columns_backup;

-- ================================================
-- EXPECTED RESULT:
-- ✅ title_temp and title_id_temp columns removed
-- ✅ Main title and title_id columns intact (jsonb type)
-- ✅ All data preserved and working
-- ✅ Payload schema push will not show warnings anymore
-- ✅ pnpm dev will start without schema conflicts
-- ================================================
