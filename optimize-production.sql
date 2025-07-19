-- Aggressive optimization for production publish operations
-- Run this ONLY on production database

-- 1. Create indexes for faster lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pages_status ON pages(_status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pages_updated_at ON pages(updated_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_pages_v_version_status ON pages_v(version__status);

-- 2. Clean up old versions (keep only last 10 per page)
WITH version_cleanup AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY parent_id ORDER BY updated_at DESC) as rn
  FROM pages_v
  WHERE parent_id IS NOT NULL
)
DELETE FROM pages_v 
WHERE id IN (
  SELECT id FROM version_cleanup WHERE rn > 10
);

-- 3. Vacuum and analyze for better performance  
VACUUM ANALYZE pages;
VACUUM ANALYZE pages_v;

-- 4. Update statistics
ANALYZE pages;
ANALYZE pages_v;

-- 5. Check current connection count
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';

-- 6. Show table sizes after cleanup
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE tablename LIKE 'pages%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- 7. Show slow queries if any
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements 
WHERE query LIKE '%pages%' 
  AND mean_exec_time > 1000
ORDER BY mean_exec_time DESC
LIMIT 10;
