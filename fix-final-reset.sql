-- SOLUSI FINAL: Reset SEMUA version data
-- Hapus semua data version yang corrupt dan biarkan sistem rebuild otomatis

-- 1. Hapus SEMUA version data (mulai dari child tables dulu)
DELETE FROM "_pages_v_blocks_partnership_block_partners";
DELETE FROM "_pages_v_blocks_timeline_events";
DELETE FROM "_pages_v_blocks_content_columns";
DELETE FROM "_pages_v_blocks_carousel_images";
DELETE FROM "_pages_v_blocks_calendar_block_events";
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people";
DELETE FROM "_pages_v_blocks_accordion_people_block_sections";
DELETE FROM "_pages_v_blocks_archive";

-- 2. Hapus parent blocks
DELETE FROM "_pages_v_blocks_partnership_block";
DELETE FROM "_pages_v_blocks_timeline";
DELETE FROM "_pages_v_blocks_content";
DELETE FROM "_pages_v_blocks_carousel";
DELETE FROM "_pages_v_blocks_calendar_block";
DELETE FROM "_pages_v_blocks_accordion_people_block";

-- 3. Reset version pages (HATI-HATI: ini akan reset semua draft)
DELETE FROM "_pages_v" WHERE "version__status" = 'draft';

-- SELESAI. Sekarang coba pnpm dev lagi.
-- Sistem akan rebuild version data secara otomatis dari published data.
