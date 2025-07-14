# 🔧 TROUBLESHOOTING & TESTING GUIDE

## ✅ Issues Fixed

### 1. **Build Errors (RESOLVED)**
- ❌ **Issue**: Type errors pada seed files karena missing `title_id` dan `content_id`
- ✅ **Fix**: Menambahkan field Indonesia ke semua seed files (post-1.ts, post-2.ts, post-3.ts)

### 2. **Required Field Validation (RESOLVED)**
- ❌ **Issue**: Field `title_id` dan `content_id` di-set required tapi data existing masih null
- ✅ **Fix**: Mengubah field menjadi `required: false` di Posts collection

### 3. **Module Resolution Error (RESOLVED)**
- ❌ **Issue**: Cannot find module date-fns vendor chunk
- ✅ **Fix**: Clean rebuild dengan `rm -rf .next && npm run build`

## 🚀 Testing Instructions

### 1. Server Status
```bash
# Server now running at:
http://localhost:3000

# Admin panel:
http://localhost:3000/admin
```

### 2. Test Admin Panel
1. **Login ke admin panel**: `http://localhost:3000/admin`
2. **Navigate ke Posts**: Click "Posts" di sidebar
3. **Edit existing post**: Pilih post yang sudah ada (ID: 3)
4. **Isi field Indonesia**:
   - `Title (Indonesian)`: Masukkan judul dalam bahasa Indonesia
   - `Content (Indonesian)`: Masukkan konten dalam bahasa Indonesia
5. **Save**: Click submit button

### 3. Test Frontend Language Switch
1. **Buka post detail**: `http://localhost:3000/posts/[slug]`
2. **Lihat switch button**: Di hero section ada flag icons (🇬🇧/🇮🇩)
3. **Test switching**: 
   - Click flag GB untuk English
   - Click flag ID untuk Indonesian
   - Perhatikan title berubah sesuai bahasa

### 4. Validasi Database
```sql
-- Check if columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'posts' 
AND column_name IN ('title_id', 'content_id');

-- Check sample data
SELECT id, title, title_id, 
       CASE WHEN content_id IS NULL THEN 'null' ELSE 'has data' END as content_id_status
FROM posts 
LIMIT 5;
```

## 🐛 Potential Issues & Solutions

### Issue: "Internal Server Error" on Save
**Symptom**: Error saat save post di admin panel
**Possible Causes**:
1. Database constraint violation
2. Field validation error
3. Network/connection issue

**Solutions**:
```bash
# 1. Check server logs
# Look for detailed error in terminal where dev server running

# 2. Check database connection
# Ensure Supabase database is accessible

# 3. Verify field configuration
# title_id and content_id should be required: false
```

### Issue: Language Switch Not Working
**Symptom**: Button tidak berpengaruh pada content
**Possible Causes**:
1. Indonesian content belum diisi
2. LanguageProvider tidak ter-wrap dengan benar
3. Component tidak menggunakan context

**Solutions**:
```bash
# 1. Pastikan data Indonesia sudah diisi di admin
# 2. Check console untuk JavaScript errors
# 3. Verify provider hierarchy di app layout
```

### Issue: TypeScript Errors
**Symptom**: Build fails dengan type errors
**Solutions**:
```bash
# 1. Regenerate types
npm run generate:types

# 2. Clean rebuild
rm -rf .next && npm run build

# 3. Check payload-types.ts includes new fields
```

## 📋 Testing Checklist

### ✅ Backend Testing
- [ ] Database columns `title_id` dan `content_id` exist
- [ ] Admin panel shows Indonesian fields  
- [ ] Can save posts with Indonesian content
- [ ] No validation errors on save
- [ ] Generated types include new fields

### ✅ Frontend Testing
- [ ] Language switch button visible in PostHero
- [ ] Flag icons render correctly (🇬🇧/🇮🇩)
- [ ] Clicking flags changes language state
- [ ] Title changes based on selected language
- [ ] Content changes based on selected language (when LanguageAwareRichText implemented)
- [ ] Language state persists during navigation

### ✅ Integration Testing
- [ ] Create new post with both languages
- [ ] Edit existing post to add Indonesian content  
- [ ] Test language switching on multiple posts
- [ ] Verify fallback to English when Indonesian content missing

## 🎯 Next Development Steps

1. **Implement LanguageAwareRichText in post detail page**
2. **Add language persistence (localStorage)**
3. **Extend to other collections (Pages, Categories)**
4. **Add language indicator in admin list view**
5. **Create language-specific URLs (/en/posts, /id/posts)**

## 📱 Access URLs

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin  
- **Sample Post**: http://localhost:3000/posts/wave-goodbye-to-the-old-say-hello-to-sef-2025-the-welcoming-wave-begins
- **GraphQL Playground**: http://localhost:3000/api/graphql-playground

## 🔍 Debug Commands

```bash
# Check server status
npm run dev

# View migration SQL
npm run migration:show

# Generate fresh types
npm run generate:types

# Clean rebuild
rm -rf .next && npm run build && npm run dev

# Check for errors
npm run lint
```
