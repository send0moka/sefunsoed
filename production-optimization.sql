-- Production optimization script untuk mengatasi timeout issues
-- Jalankan ini di production database untuk optimasi performa

-- 1. Add indexes untuk query yang sering digunakan (menggunakan nama kolom yang benar)
CREATE INDEX IF NOT EXISTS idx_pages_slug ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS idx_pages_status ON "pages" ("_status");
CREATE INDEX IF NOT EXISTS idx_pages_published_at ON "pages" ("published_at");

-- 2. Add indexes untuk media queries
CREATE INDEX IF NOT EXISTS idx_media_filename ON "media" ("filename");
CREATE INDEX IF NOT EXISTS idx_media_created_at ON "media" ("created_at");
CREATE INDEX IF NOT EXISTS idx_media_updated_at ON "media" ("updated_at");

-- 3. Optimize version tables
CREATE INDEX IF NOT EXISTS idx_pages_v_parent ON "_pages_v" ("parent_id");
CREATE INDEX IF NOT EXISTS idx_pages_v_status ON "_pages_v" ("version__status");
CREATE INDEX IF NOT EXISTS idx_pages_v_updated_at ON "_pages_v" ("version_updated_at");

-- 4. Add indexes untuk blocks yang sering di-query
CREATE INDEX IF NOT EXISTS idx_pages_blocks_parent ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS idx_pages_blocks_order ON "pages_rels" ("order");

-- 5. Vacuum dan analyze untuk performa
VACUUM ANALYZE "pages";
VACUUM ANALYZE "media";
VACUUM ANALYZE "_pages_v";
VACUUM ANALYZE "pages_rels";

-- 6. Update table statistics
ANALYZE;
