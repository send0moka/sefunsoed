-- Simplified fix untuk masalah foreign key constraint accordion people block
-- Script ini hanya membersihkan orphan records yang menyebabkan error

-- 1. Backup check - lihat data yang akan dihapus
SELECT 'Orphan sections that will be deleted:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
);

SELECT 'Orphan people that will be deleted:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 2. Hapus orphan records di tabel people terlebih dahulu (child table)
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 3. Hapus orphan records di tabel sections
DELETE FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
);

-- 4. Verifikasi bahwa semua orphan sudah dibersihkan
SELECT 'Remaining orphan sections after cleanup:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
)
UNION ALL
SELECT 'Remaining orphan people after cleanup:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 5. Cek apakah ada masalah referential integrity lain
-- Tampilkan parent IDs yang menyebabkan masalah
SELECT DISTINCT "_parent_id" as "problematic_parent_ids"
FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
)
ORDER BY "_parent_id";

-- Final verification query - ini harus return 0 untuk semua
SELECT 
    'Final check - all should be 0' as status,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block")) as orphan_sections,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections_people" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections")) as orphan_people;
