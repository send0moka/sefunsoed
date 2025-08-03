-- ================================================
-- FRESH START: Drop & Recreate Posts Table
-- ================================================
-- 
-- CLEAN SOLUTION: Drop posts table dan buat ulang dengan struktur yang benar
-- 
-- CONTEXT:
-- - Hanya ada 1 post (bisa diinput ulang)
-- - Cleanup temp columns dengan fresh start
-- - Payload akan detect clean schema tanpa conflicts
--
-- ⚠️ WARNING: Script ini akan MENGHAPUS SEMUA DATA di table posts!
-- Pastikan sudah backup data post jika diperlukan!
--
-- ================================================

-- STEP 1: BACKUP EXISTING DATA (OPTIONAL)
-- Uncomment jika ingin backup data post yang ada:
-- CREATE TABLE posts_backup_before_recreate AS SELECT * FROM posts;

-- STEP 2: DROP EXISTING POSTS TABLE
-- Drop semua foreign key constraints yang mengarah ke posts table dulu
-- (jika ada table lain yang reference ke posts)

-- Check existing foreign key constraints
SELECT 
    conname as constraint_name,
    conrelid::regclass as table_name,
    confrelid::regclass as referenced_table
FROM pg_constraint 
WHERE confrelid = 'posts'::regclass;

-- Drop posts table (akan otomatis drop semua constraints)
DROP TABLE IF EXISTS posts CASCADE;

-- STEP 3: RECREATE POSTS TABLE WITH CLEAN STRUCTURE
CREATE TABLE public.posts (
    id serial NOT NULL,
    title jsonb NULL,
    title_id jsonb NULL,
    hero_image_id integer NULL,
    content jsonb NULL,
    content_id jsonb NULL,
    meta_title character varying NULL,
    meta_image_id integer NULL,
    meta_description character varying NULL,
    published_at timestamp with time zone NULL,
    slug character varying NULL,
    slug_lock boolean NULL DEFAULT true,
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    _status public.enum_posts_status NULL DEFAULT 'draft'::enum_posts_status,
    
    -- PRIMARY KEY
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    
    -- FOREIGN KEY CONSTRAINTS
    CONSTRAINT posts_hero_image_id_media_id_fk 
        FOREIGN KEY (hero_image_id) REFERENCES media (id) ON DELETE SET NULL,
    CONSTRAINT posts_meta_image_id_media_id_fk 
        FOREIGN KEY (meta_image_id) REFERENCES media (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- STEP 4: CREATE INDEXES
CREATE INDEX IF NOT EXISTS posts_hero_image_idx 
    ON public.posts USING btree (hero_image_id) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS posts_meta_meta_image_idx 
    ON public.posts USING btree (meta_image_id) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS posts_slug_idx 
    ON public.posts USING btree (slug) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS posts_updated_at_idx 
    ON public.posts USING btree (updated_at) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS posts_created_at_idx 
    ON public.posts USING btree (created_at) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS posts__status_idx 
    ON public.posts USING btree (_status) TABLESPACE pg_default;

-- STEP 5: VERIFICATION
-- Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- Check constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'posts'::regclass;

-- Check indexes
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'posts';

-- Verify empty table
SELECT COUNT(*) as post_count FROM posts;

-- ================================================
-- STEP 6: INSERT SAMPLE DATA (OPTIONAL)
-- ================================================
-- Jika ingin langsung test dengan sample data:
-- 
-- INSERT INTO posts (
--     title,
--     title_id,
--     content,
--     content_id,
--     meta_title,
--     meta_description,
--     slug,
--     published_at,
--     _status
-- ) VALUES (
--     '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sample Post Title", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}'::jsonb,
--     '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Judul Post Sample", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}'::jsonb,
--     '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This is sample content for testing.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}'::jsonb,
--     '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ini adalah konten sample untuk testing.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}'::jsonb,
--     'Sample Post Title',
--     'This is a sample post for testing the new rich text implementation.',
--     'sample-post',
--     NOW(),
--     'published'
-- );

-- ================================================
-- EXPECTED RESULT:
-- ✅ Clean posts table dengan struktur yang benar
-- ✅ Tidak ada temp columns
-- ✅ title dan title_id bertipe jsonb
-- ✅ Semua indexes dan constraints berfungsi
-- ✅ Payload schema push tidak akan ada warnings
-- ✅ pnpm dev start normal tanpa konfirmasi
-- ================================================

-- ================================================
-- CLEANUP BACKUP (AFTER CONFIRMING EVERYTHING WORKS)
-- ================================================
-- After confirming Payload and frontend work fine:
-- DROP TABLE IF EXISTS posts_backup_before_recreate;

-- ================================================
-- NEXT STEPS:
-- 1. Jalankan script ini di Supabase
-- 2. Restart Payload development server (pnpm dev)
-- 3. Buka admin panel dan buat post baru
-- 4. Test rich text editors untuk title dan content
-- 5. Publish post dan cek frontend
-- ================================================
