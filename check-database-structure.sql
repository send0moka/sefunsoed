-- Safe production optimization script
-- Script ini akan cek kolom yang ada dulu sebelum membuat index

-- 1. Cek struktur tabel pages
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'pages' 
ORDER BY ordinal_position;

-- 2. Cek struktur tabel media  
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'media' 
ORDER BY ordinal_position;

-- 3. Cek struktur tabel _pages_v
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = '_pages_v' 
ORDER BY ordinal_position;

-- 4. Tampilkan existing indexes
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE tablename IN ('pages', 'media', '_pages_v')
ORDER BY tablename, indexname;
