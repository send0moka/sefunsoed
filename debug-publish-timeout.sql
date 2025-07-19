-- Debug script untuk menganalisis masalah publish timeout
-- Jalankan ini untuk melihat masalah spesifik

-- 1. Cek ukuran data pages yang mungkin terlalu besar
SELECT 
    id,
    slug,
    _status,
    LENGTH(CAST(layout AS TEXT)) as layout_size,
    LENGTH(CAST(hero AS TEXT)) as hero_size,
    created_at,
    updated_at
FROM pages 
WHERE id = 3
ORDER BY updated_at DESC;

-- 2. Cek apakah ada version yang corrupt untuk page 3
SELECT 
    id,
    parent_id,
    version__status,
    LENGTH(CAST(version_layout AS TEXT)) as version_layout_size,
    version_created_at,
    version_updated_at
FROM "_pages_v" 
WHERE parent_id = 3
ORDER BY version_updated_at DESC
LIMIT 10;

-- 3. Cek apakah ada blocks yang bermasalah
SELECT 
    'Total blocks for page 3:' as info,
    COUNT(*) as count
FROM pages_rels 
WHERE parent_id = 3;

-- 4. Cek active connections ke database
SELECT 
    'Active connections:' as info,
    COUNT(*) as count,
    state
FROM pg_stat_activity 
WHERE datname = current_database()
GROUP BY state;

-- 5. Cek locks yang mungkin blocking
SELECT 
    'Locks on pages table:' as info,
    mode,
    COUNT(*) as count
FROM pg_locks l
JOIN pg_class c ON l.relation = c.oid
WHERE c.relname = 'pages'
GROUP BY mode;
