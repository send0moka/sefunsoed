-- Fix untuk masalah foreign key constraint accordion people block
-- Script ini akan membersihkan record orphan yang menyebabkan error

-- 1. Hapus orphan records di tabel sections yang tidak memiliki parent yang valid
DELETE FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
);

-- 2. Hapus orphan records di tabel people yang tidak memiliki parent yang valid
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);

-- 3. Verifikasi constraint dapat dibuat dengan aman
-- Query ini harus mengembalikan 0 rows jika semua orphan sudah dibersihkan
SELECT "_parent_id", COUNT(*) as count
FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
)
GROUP BY "_parent_id";

-- 4. Jika masih ada orphan records, tampilkan detail untuk debugging
SELECT s.*, p.id as parent_exists
FROM "_pages_v_blocks_accordion_people_block_sections" s
LEFT JOIN "_pages_v_blocks_accordion_people_block" p ON s."_parent_id" = p.id
WHERE p.id IS NULL;

-- 5. Cek juga untuk tabel people
SELECT sp.*, s.id as section_exists
FROM "_pages_v_blocks_accordion_people_block_sections_people" sp
LEFT JOIN "_pages_v_blocks_accordion_people_block_sections" s ON sp."_parent_id" = s.id
WHERE s.id IS NULL;

-- 6. Clean up duplicate atau invalid data untuk page version 2 yang bermasalah
-- Berdasarkan error, ini terkait dengan page ID 2
-- Hapus semua version data yang corrupt untuk page ini
DELETE FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" IN (
    SELECT s.id FROM "_pages_v_blocks_accordion_people_block_sections" s
    INNER JOIN "_pages_v_blocks_accordion_people_block" b ON s."_parent_id" = b.id
    INNER JOIN "_pages_v" pv ON b."_parent_id" = pv.id
    WHERE pv."parent_id" = 2
);

DELETE FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" IN (
    SELECT b.id FROM "_pages_v_blocks_accordion_people_block" b
    INNER JOIN "_pages_v" pv ON b."_parent_id" = pv.id
    WHERE pv."parent_id" = 2
);

DELETE FROM "_pages_v_blocks_accordion_people_block" 
WHERE "_parent_id" IN (
    SELECT id FROM "_pages_v" WHERE "parent_id" = 2
);

-- 7. Rebuild clean version untuk page 2 berdasarkan published version
-- Ambil data dari published version dan copy ke version table
-- First, let's check what columns actually exist in the published table
-- and map them to the version table structure

-- Get the version parent ID first
WITH version_parent AS (
    SELECT id FROM "_pages_v" WHERE "parent_id" = 2 ORDER BY "version_updated_at" DESC LIMIT 1
)
INSERT INTO "_pages_v_blocks_accordion_people_block" 
("_order", "_parent_id", "_path", "id", "title", "block_name")
SELECT 
    b."_order", 
    vp.id as "_parent_id",
    'version.layout' as "_path",
    nextval('_pages_v_blocks_accordion_people_block_id_seq') as "id",
    b."title",
    b."block_name"
FROM "pages_blocks_accordion_people_block" b
CROSS JOIN version_parent vp
INNER JOIN "pages" p ON b."_parent_id" = p.id
WHERE p.id = 2;

-- 8. Copy sections
-- Create mapping between published and version blocks first
WITH block_mapping AS (
    SELECT 
        pb.id as published_id,
        vb.id as version_id,
        pb."_order" as published_order
    FROM "pages_blocks_accordion_people_block" pb
    INNER JOIN "pages" p ON pb."_parent_id" = p.id
    INNER JOIN "_pages_v_blocks_accordion_people_block" vb ON pb."_order" = vb."_order"
    WHERE p.id = 2
)
INSERT INTO "_pages_v_blocks_accordion_people_block_sections"
("_order", "_parent_id", "id", "title", "subtitle", "description", "image_id")
SELECT 
    s."_order",
    bm.version_id as "_parent_id",
    nextval('_pages_v_blocks_accordion_people_block_sections_id_seq') as "id",
    s."title",
    s."subtitle", 
    s."description",
    s."image_id"
FROM "pages_blocks_accordion_people_block_sections" s
INNER JOIN block_mapping bm ON s."_parent_id" = bm.published_id;

-- 9. Copy people
-- Create mapping between published and version sections
WITH section_mapping AS (
    SELECT 
        ps.id as published_section_id,
        vs.id as version_section_id,
        ps."_order" as section_order
    FROM "pages_blocks_accordion_people_block_sections" ps
    INNER JOIN "pages_blocks_accordion_people_block" pb ON ps."_parent_id" = pb.id
    INNER JOIN "pages" p ON pb."_parent_id" = p.id
    INNER JOIN "_pages_v_blocks_accordion_people_block_sections" vs ON ps."_order" = vs."_order"
    WHERE p.id = 2
)
INSERT INTO "_pages_v_blocks_accordion_people_block_sections_people"
("_order", "_parent_id", "id", "name", "position", "major", "year", "photo_id", "linkedin", "instagram")
SELECT 
    sp."_order",
    sm.version_section_id as "_parent_id",
    nextval('_pages_v_blocks_accordion_people_block_sections_people_id_seq') as "id",
    sp."name",
    sp."position",
    sp."major", 
    sp."year",
    sp."photo_id",
    sp."linkedin",
    sp."instagram"
FROM "pages_blocks_accordion_people_block_sections_people" sp
INNER JOIN section_mapping sm ON sp."_parent_id" = sm.published_section_id;

-- 10. Final verification - these should return 0 orphans
SELECT 'Orphan sections:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block"
)
UNION ALL
SELECT 'Orphan people:', COUNT(*)
FROM "_pages_v_blocks_accordion_people_block_sections_people" 
WHERE "_parent_id" NOT IN (
    SELECT "id" FROM "_pages_v_blocks_accordion_people_block_sections"
);
