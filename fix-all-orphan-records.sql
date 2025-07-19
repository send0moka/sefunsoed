-- Comprehensive fix untuk semua foreign key constraint issues
-- Script ini akan membersihkan orphan records di semua version tables

-- 1. Fix content block orphans
-- Cek orphan records di content columns
SELECT 'Content columns orphans:', COUNT(*)
FROM "_pages_v_blocks_content_columns" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_content"
);

-- Hapus orphan content columns
DELETE FROM "_pages_v_blocks_content_columns" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_content"
);

-- 2. Fix carousel orphans (jika ada)
-- Cek orphan records di carousel images
SELECT 'Carousel images orphans:', COUNT(*)
FROM "_pages_v_blocks_carousel_images" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_carousel"
);

-- Hapus orphan carousel images
DELETE FROM "_pages_v_blocks_carousel_images" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_carousel"
);

-- 3. Fix calendar orphans (jika ada)
-- Cek orphan records di calendar events
SELECT 'Calendar events orphans:', COUNT(*)
FROM "_pages_v_blocks_calendar_block_events" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_calendar_block"
);

-- Hapus orphan calendar events
DELETE FROM "_pages_v_blocks_calendar_block_events" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_calendar_block"
);

-- 4. Fix timeline orphans (jika ada)
-- Cek orphan records di timeline events (jika ada tabel seperti ini)
-- Ini mungkin tidak ada, tapi mari kita cek

-- 5. Cek semua tabel version yang mungkin bermasalah
-- Tampilkan semua tabel yang berpotensi memiliki orphan records

-- List semua foreign key constraints yang mungkin bermasalah
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name LIKE '_pages_v_blocks_%'
    AND tc.table_name NOT LIKE '%_rels'
ORDER BY tc.table_name, tc.constraint_name;

-- 6. Final verification untuk semua yang sudah diperbaiki
SELECT 
    'FINAL CHECK - All orphans should be 0' as status,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block")) as accordion_sections_orphans,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections_people" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections")) as accordion_people_orphans,
    (SELECT COUNT(*) FROM "_pages_v_blocks_content_columns" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_content")) as content_columns_orphans,
    (SELECT COUNT(*) FROM "_pages_v_blocks_carousel_images" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_carousel")) as carousel_images_orphans,
    (SELECT COUNT(*) FROM "_pages_v_blocks_calendar_block_events" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_calendar_block")) as calendar_events_orphans;

-- 7. Tampilkan struktur data final
SELECT 
    'Data structure summary:' as info,
    (SELECT COUNT(*) FROM "_pages_v") as total_page_versions,
    (SELECT COUNT(*) FROM "_pages_v_blocks_content") as content_blocks,
    (SELECT COUNT(*) FROM "_pages_v_blocks_content_columns") as content_columns,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block") as accordion_blocks,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections") as accordion_sections,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections_people") as accordion_people;
