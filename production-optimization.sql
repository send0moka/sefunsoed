-- Production optimization script untuk mengatasi timeout issues
-- Jalankan ini di production database untuk optimasi performa

-- Ternyata index-index utama sudah ada! Hanya perlu optimasi tambahan:

-- 1. Add index untuk published_at jika ada kolom tersebut
-- (Skip jika tidak ada kolom published_at)
-- CREATE INDEX IF NOT EXISTS idx_pages_published_at ON "pages" ("published_at");

-- 2. Add indexes untuk relation tables yang mungkin belum ada
CREATE INDEX IF NOT EXISTS idx_pages_rels_parent ON "pages_rels" ("parent_id") WHERE "parent_id" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pages_rels_path ON "pages_rels" ("path") WHERE "path" IS NOT NULL;

-- 3. Add indexes untuk block relations yang sering di-query
CREATE INDEX IF NOT EXISTS idx_pages_blocks_parent_path ON "pages_rels" ("parent_id", "path") WHERE "parent_id" IS NOT NULL AND "path" IS NOT NULL;

-- 4. Update table statistics (tidak perlu VACUUM karena tidak bisa dalam transaction)
ANALYZE "pages";
ANALYZE "media"; 
ANALYZE "_pages_v";
ANALYZE "pages_rels";

-- 5. Cek query performance untuk pages dengan draft
-- Ini akan membantu debug kenapa draft queries lambat
SELECT 
    'Pages with draft versions:' as info,
    COUNT(*) as count
FROM "_pages_v" 
WHERE "version__status" = 'draft';

-- 6. Cek apakah ada pages yang bermasalah
SELECT 
    'Pages count by status:' as info,
    "_status",
    COUNT(*) as count
FROM "pages" 
GROUP BY "_status";

-- Selesai - kebanyakan index sudah ada!
