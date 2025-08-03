-- ================================================
-- FIX VERSION TABLE: Update _posts_v structure
-- ================================================
-- 
-- PROBLEM: Version table (_posts_v) masih punya kolom version_title bertipe VARCHAR
-- SOLUTION: Update version table structure untuk match main posts table
-- 
-- CONTEXT:
-- - Payload creates version tables for draft/versioning
-- - Version table columns must match main table types
-- - version_title & version_title_id harus jsonb (bukan varchar)
--
-- ================================================

-- STEP 1: CHECK IF VERSION TABLE EXISTS
SELECT table_name 
FROM information_schema.tables 
WHERE table_name LIKE '%posts_v%' 
    AND table_schema = 'public';

-- STEP 2: CHECK VERSION TABLE STRUCTURE
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = '_posts_v' 
    AND column_name LIKE '%title%'
ORDER BY ordinal_position;

-- STEP 3: CHECK EXISTING DATA IN VERSION TABLE
SELECT 
    id,
    version_title,
    version_title_id,
    CASE 
        WHEN version_title ~ '^{.*}$' THEN 'JSON Format'
        WHEN version_title IS NOT NULL AND version_title != '' THEN 'STRING Format - NEEDS CONVERSION!'
        ELSE 'Empty/NULL'
    END as version_title_format,
    CASE 
        WHEN version_title_id ~ '^{.*}$' THEN 'JSON Format'
        WHEN version_title_id IS NOT NULL AND version_title_id != '' THEN 'STRING Format - NEEDS CONVERSION!'
        ELSE 'Empty/NULL'
    END as version_title_id_format,
    created_at
FROM _posts_v 
ORDER BY created_at DESC
LIMIT 10;

-- STEP 4: COUNT VERSION TABLE DATA
SELECT 
    COUNT(*) as total_versions,
    COUNT(CASE WHEN version_title IS NOT NULL AND version_title != '' AND NOT (version_title ~ '^{.*}$') THEN 1 END) as version_title_strings,
    COUNT(CASE WHEN version_title_id IS NOT NULL AND version_title_id != '' AND NOT (version_title_id ~ '^{.*}$') THEN 1 END) as version_title_id_strings
FROM _posts_v;

-- ================================================
-- OPTION A: FRESH START - Drop & Recreate (SIMPLE)
-- ================================================
-- If you don't need version history, just recreate version table

-- BACKUP (optional)
-- CREATE TABLE _posts_v_backup AS SELECT * FROM _posts_v;

-- Drop version table
DROP TABLE IF EXISTS _posts_v CASCADE;

-- Payload will recreate it automatically with correct structure when needed

-- ================================================
-- OPTION B: SAFE MIGRATION - Convert existing data
-- ================================================
-- If you want to preserve version history:

-- Backup version table
CREATE TABLE _posts_v_backup_before_conversion AS SELECT * FROM _posts_v;

-- Convert existing string data to rich text format
UPDATE _posts_v 
SET version_title = jsonb_build_object(
    'root', jsonb_build_object(
        'children', jsonb_build_array(
            jsonb_build_object(
                'children', jsonb_build_array(
                    jsonb_build_object(
                        'detail', 0,
                        'format', 0,
                        'mode', 'normal',
                        'style', '',
                        'text', version_title,
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
WHERE version_title IS NOT NULL 
    AND version_title != ''
    AND NOT (version_title ~ '^{.*}$');

UPDATE _posts_v 
SET version_title_id = jsonb_build_object(
    'root', jsonb_build_object(
        'children', jsonb_build_array(
            jsonb_build_object(
                'children', jsonb_build_array(
                    jsonb_build_object(
                        'detail', 0,
                        'format', 0,
                        'mode', 'normal',
                        'style', '',
                        'text', version_title_id,
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
WHERE version_title_id IS NOT NULL 
    AND version_title_id != ''
    AND NOT (version_title_id ~ '^{.*}$');

-- Change column types to jsonb
ALTER TABLE _posts_v ALTER COLUMN version_title TYPE jsonb USING version_title::jsonb;
ALTER TABLE _posts_v ALTER COLUMN version_title_id TYPE jsonb USING version_title_id::jsonb;

-- ================================================
-- STEP 5: VERIFICATION
-- ================================================

-- Check final structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = '_posts_v' 
    AND column_name LIKE '%title%'
ORDER BY ordinal_position;

-- Verify converted data
SELECT 
    id,
    version_title->'root'->'children'->0->'children'->0->>'text' as title_text,
    version_title_id->'root'->'children'->0->'children'->0->>'text' as title_id_text,
    jsonb_typeof(version_title) as title_type,
    jsonb_typeof(version_title_id) as title_id_type,
    created_at
FROM _posts_v 
WHERE version_title IS NOT NULL OR version_title_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 5;

-- ================================================
-- RECOMMENDED APPROACH:
-- 
-- 1. Use OPTION A (fresh start) if you don't need version history
-- 2. Use OPTION B (safe migration) if you want to preserve versions
-- 3. After running either option, restart Payload dev server
-- 4. Test creating/editing posts
-- 5. Verify frontend pages work
-- ================================================
