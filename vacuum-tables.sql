-- Script VACUUM terpisah - jalankan ini di terminal psql atau SQL Editor tanpa transaction
-- Jalankan SATU PER SATU, bukan sekaligus

-- VACUUM ANALYZE untuk optimasi performa
VACUUM ANALYZE "pages";

-- Tunggu selesai, lalu jalankan yang berikutnya:
VACUUM ANALYZE "media";

-- Tunggu selesai, lalu jalankan yang berikutnya:  
VACUUM ANALYZE "_pages_v";

-- Tunggu selesai, lalu jalankan yang berikutnya:
VACUUM ANALYZE "pages_rels";
