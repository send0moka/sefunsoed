# 🗄️ SUPABASE DATABASE MIGRATION GUIDE

## 🎯 Masalah yang Dipecahkan

Error di Payload admin panel:
```
Error: The value passed to the Lexical editor is not an object. This is not supported. 
Please remove the data from the field and start again. This is the value that was passed in: 
"Wave Goodbye to the Old, Say Hello to SEF 2025: The Welcoming Wave Begins!"
```

**Root Cause**: 
1. Field `title` dan `title_id` di table `posts` masih berisi string, tapi setelah update collection config, Payload mengharapkan rich text object (JSON format).
2. **Column type masih VARCHAR** - Payload mencoba ALTER TABLE untuk mengubah ke JSONB tapi gagal karena ada data yang tidak compatible.

**Solution**: 
1. Konversi data dari string ke JSON format
2. **Ubah tipe kolom database dari VARCHAR ke JSONB**

## 📋 Langkah-Langkah Migration (AMAN)

### STEP 1: Verifikasi Data
```sql
-- Jalankan file: supabase-verification-only.sql
-- Ini HANYA MELIHAT data, tidak mengubah apapun
```

### STEP 2: Backup Database (WAJIB!)
1. Masuk ke Supabase Dashboard
2. Settings → Backup
3. Buat backup manual sebelum migration
4. Atau jalankan backup table: 
   ```sql
   CREATE TABLE posts_backup_before_richtext AS SELECT * FROM posts;
   ```

### STEP 3: Konversi Data String ke JSON
```sql
-- Jalankan file: supabase-migration-titles-to-richtext.sql
-- Script ini akan mengkonversi string → rich text JSON
```

### STEP 4: ⚠️ CRITICAL - Ubah Tipe Kolom Database
```sql
-- Jalankan file: supabase-column-type-migration.sql
-- Script ini akan mengubah kolom dari VARCHAR ke JSONB
-- WAJIB dilakukan setelah step 3!
```

### STEP 5: Verifikasi Hasil
```sql
-- Cek hasil konversi
SELECT 
    id,
    title->'root'->'children'->0->'children'->0->>'text' as title_text,
    title_id->'root'->'children'->0->'children'->0->>'text' as title_id_text
FROM posts 
LIMIT 5;
```

### STEP 6: Test Payload Admin
1. Restart Payload development server
2. Buka admin panel
3. Edit post manapun
4. Pastikan rich text editor berfungsi tanpa error
5. Test publish dan lihat frontend

## 🛡️ Keamanan Data

### ✅ Yang AMAN dari script ini:
- **TIDAK menghapus data** - Hanya mengkonversi format
- **TIDAK mengubah struktur table** - Hanya update isi field
- **Conditional update** - Hanya update string, skip yang sudah JSON
- **Rollback ready** - Bisa dikembalikan jika ada masalah
- **Verification included** - Ada langkah cek sebelum dan sesudah

### ⚠️ Precautions:
- **BACKUP WAJIB** sebelum menjalankan
- **Test di development** terlebih dahulu jika memungkinkan
- **Jalankan verification** terlebih dahulu
- **Monitor hasil** setelah migration

## 🔄 Proses Konversi

### Before (String):
```
title: "Wave Goodbye to the Old, Say Hello to SEF 2025"
```

### After (Rich Text JSON):
```json
{
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "Wave Goodbye to the Old, Say Hello to SEF 2025",
            "type": "text",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}
```

## 📊 Query untuk Monitoring

### Cek Status Konversi:
```sql
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN title ~ '^{.*}$' AND jsonb_typeof(title::jsonb) = 'object' THEN 1 END) as title_as_json,
    COUNT(CASE WHEN title_id ~ '^{.*}$' AND jsonb_typeof(title_id::jsonb) = 'object' THEN 1 END) as title_id_as_json
FROM posts;
```

### Extract Text dari Rich Text:
```sql
SELECT 
    id,
    CASE 
        WHEN title ~ '^{.*}$' THEN title::jsonb->'root'->'children'->0->'children'->0->>'text'
        ELSE title
    END as title_text,
    CASE 
        WHEN title_id ~ '^{.*}$' THEN title_id::jsonb->'root'->'children'->0->'children'->0->>'text'
        ELSE title_id
    END as title_id_text
FROM posts 
WHERE title IS NOT NULL OR title_id IS NOT NULL;
```

## 🚨 Rollback Plan (Jika Diperlukan)

Jika ada masalah dan perlu rollback:

### Option 1: Dari Backup Table
```sql
UPDATE posts 
SET title = posts_backup_before_richtext.title, 
    title_id = posts_backup_before_richtext.title_id 
FROM posts_backup_before_richtext 
WHERE posts.id = posts_backup_before_richtext.id;
```

### Option 2: Dari Supabase Backup
1. Masuk ke Supabase Dashboard
2. Settings → Backup
3. Restore dari backup yang dibuat sebelumnya

## 📝 Checklist Migration

**Pre-Migration:**
- [ ] Backup database dibuat
- [ ] Verification script dijalankan
- [ ] Data review selesai
- [ ] Development environment tested (opsional)

**Data Migration:**
- [ ] String to JSON conversion script dijalankan
- [ ] No errors dalam data conversion
- [ ] All titles converted to JSON format

**Column Migration:**
- [ ] Column type migration script dijalankan  
- [ ] VARCHAR to JSONB conversion successful
- [ ] Database structure updated correctly

**Post-Migration:**
- [ ] Payload admin panel tidak error
- [ ] Rich text editors berfungsi normal
- [ ] Post editing bekerja dengan baik
- [ ] Frontend display masih normal
- [ ] generateStaticParams tidak error lagi

**Cleanup:**
- [ ] Backup table dihapus (opsional, setelah konfirmasi everything OK)
- [ ] Migration scripts dihapus (opsional)

## 🎉 Expected Results

Setelah migration berhasil:

1. **Admin Panel**: No more Lexical editor errors
2. **Rich Text Editing**: Full rich text capabilities untuk titles
3. **Data Integrity**: Semua title text tetap sama, hanya format yang berubah
4. **Functionality**: Semua features berfungsi normal
5. **Performance**: No performance impact

## 🆘 Troubleshooting

### Error: "jsonb_build_object does not exist"
- **Cause**: PostgreSQL version terlalu lama
- **Solution**: Update PostgreSQL atau gunakan alternative JSON functions

### Error: "relation posts does not exist"  
- **Cause**: Table name salah atau tidak ada permission
- **Solution**: Cek table name dan database permissions

### Rich text editor masih error setelah migration
- **Cause**: Browser cache atau Payload cache
- **Solution**: 
  1. Clear browser cache
  2. Restart Payload server
  3. Hard refresh admin panel

### Error: "ALTER TABLE posts ALTER COLUMN title SET DATA TYPE jsonb" fails
- **Cause**: Payload mencoba mengubah column type tapi ada data string yang tidak bisa di-convert
- **Solution**: 
  1. Jalankan data migration terlebih dahulu (step 3)
  2. Jalankan column type migration (step 4)
  3. Restart Payload server

### Data tidak muncul di frontend
- **Cause**: Component masih expect string format
- **Solution**: Pastikan menggunakan `extractTextFromRichText` utility di components

---

**🔥 PENTING: Selalu backup database sebelum menjalankan migration apapun!**
