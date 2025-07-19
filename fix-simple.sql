-- SOLUSI SEDERHANA: Hapus SEMUA orphan records sekaligus
-- Script ini akan bersihkan semua masalah foreign key constraint

-- 1. Timeline orphans
DELETE FROM "_pages_v_blocks_timeline_events" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_timeline");

-- 2. Content orphans  
DELETE FROM "_pages_v_blocks_content_columns" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_content");

-- 3. Carousel orphans
DELETE FROM "_pages_v_blocks_carousel_images" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_carousel");

-- 4. Calendar orphans
DELETE FROM "_pages_v_blocks_calendar_block_events" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_calendar_block");

-- 5. Accordion people orphans (sudah diperbaiki tapi pastikan)
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections");

DELETE FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block");

-- DONE. Coba restart server sekarang.
