-- Script untuk membersihkan orphan people records yang tersisa
-- Berdasarkan hasil sebelumnya masih ada 122 orphan people records

-- 1. Tampilkan detail orphan people records untuk debugging
SELECT 
    p."_parent_id" as missing_section_id,
    COUNT(*) as count_orphans,
    STRING_AGG(DISTINCT p."name", ', ') as orphan_names
FROM "_pages_v_blocks_accordion_people_block_sections_people" p
WHERE p."_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
)
GROUP BY p."_parent_id"
ORDER BY p."_parent_id";

-- 2. Tampilkan existing valid section IDs untuk referensi
SELECT 'Valid section IDs:' as info, STRING_AGG("id"::text, ', ' ORDER BY "id") as section_ids
FROM "_pages_v_blocks_accordion_people_block_sections";

-- 3. Hapus semua orphan people records
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 4. Verifikasi pembersihan
SELECT 
    'After cleanup - orphan people count:' as status,
    COUNT(*) as remaining_orphan_people
FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 5. Final comprehensive check
SELECT 
    'FINAL VERIFICATION' as check_type,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block")) as orphan_sections,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections_people" 
     WHERE "_parent_id" NOT IN (SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections")) as orphan_people,
    'Both should be 0' as expected_result;

-- 6. Cek struktur data yang tersisa untuk memastikan konsistensi
SELECT 
    'Data structure after cleanup:' as info,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block") as total_blocks,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections") as total_sections,
    (SELECT COUNT(*) FROM "_pages_v_blocks_accordion_people_block_sections_people") as total_people;
