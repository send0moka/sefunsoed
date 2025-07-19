-- SOLUSI TERAKHIR: HAPUS SEMUA VERSION DATA SEKALIGUS
-- Ini akan mengatasi SEMUA foreign key constraint errors

-- 1. HAPUS SEMUA blocks version (ALL blocks yang ada)
DELETE FROM "_pages_v_blocks_podcast_block";
DELETE FROM "_pages_v_blocks_partnership_block_partners";
DELETE FROM "_pages_v_blocks_partnership_block";
DELETE FROM "_pages_v_blocks_timeline_events";
DELETE FROM "_pages_v_blocks_timeline";
DELETE FROM "_pages_v_blocks_content_columns";
DELETE FROM "_pages_v_blocks_content";
DELETE FROM "_pages_v_blocks_carousel_images";
DELETE FROM "_pages_v_blocks_carousel";
DELETE FROM "_pages_v_blocks_calendar_block_events";
DELETE FROM "_pages_v_blocks_calendar_block";
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people";
DELETE FROM "_pages_v_blocks_accordion_people_block_sections";
DELETE FROM "_pages_v_blocks_accordion_people_block";
DELETE FROM "_pages_v_blocks_archive";

-- 2. HAPUS SEMUA version data pages
DELETE FROM "_pages_v";

-- 3. Reset sequences agar ID mulai dari 1 lagi
ALTER SEQUENCE "_pages_v_id_seq" RESTART WITH 1;
