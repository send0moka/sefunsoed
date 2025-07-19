-- Fix terakhir untuk payload locked documents
DELETE FROM "payload_locked_documents_rels" 
WHERE "parent_id" NOT IN (SELECT "id" FROM "payload_locked_documents");

-- Atau lebih radikal, hapus semua locked documents (ini aman)
DELETE FROM "payload_locked_documents_rels";
DELETE FROM "payload_locked_documents";
