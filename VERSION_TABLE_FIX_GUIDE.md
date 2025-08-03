# 🔧 FIX: Version Table Schema Mismatch

## 🎯 New Problem Identified

**Error**: `ALTER TABLE "_posts_v" ALTER COLUMN "version_title" SET DATA TYPE jsonb`

**Root Cause**: 
1. ✅ Main posts table sudah benar (title & title_id sebagai jsonb)
2. ❌ **Version table (_posts_v) masih outdated** - version_title masih VARCHAR
3. ❌ Payload mencoba ALTER version table tapi gagal karena data incompatible

## 📊 Understanding Version Tables

Payload automatically creates version tables untuk:
- **Draft functionality** - Save drafts before publish
- **Version history** - Track changes over time
- **Rollback capability** - Restore previous versions

**Table Structure**:
```sql
posts          -- Main table (✅ fixed)
_posts_v       -- Version table (❌ outdated)
```

**Column Mapping**:
```sql
-- Main table:
title      jsonb     ✅ Correct
title_id   jsonb     ✅ Correct

-- Version table:
version_title      varchar    ❌ Wrong - should be jsonb
version_title_id   varchar    ❌ Wrong - should be jsonb
```

## 🚀 Solution Options

### Option A: Fresh Start (RECOMMENDED for new projects)
**Pros**: Simple, clean, fast
**Cons**: Lose version history (acceptable untuk project baru)

```sql
-- Drop version table - Payload will recreate with correct structure
DROP TABLE IF EXISTS _posts_v CASCADE;
```

### Option B: Safe Migration (for production)
**Pros**: Preserve version history
**Cons**: More complex, takes longer

```sql
-- Convert existing version data + change column types
-- See: supabase-fix-version-table.sql
```

## 📁 File Created

**`supabase-fix-version-table.sql`** - Complete solution dengan:
- ✅ **Verification steps** - Check current state
- ✅ **Option A**: Fresh start approach
- ✅ **Option B**: Safe migration with data preservation
- ✅ **Backup procedures** - Safety measures
- ✅ **Final verification** - Confirm fix works

## 🎯 Recommended Approach

Karena ini project baru dengan minimal data:

### Step 1: Fresh Start
```sql
-- Simply drop version table
DROP TABLE IF EXISTS _posts_v CASCADE;
```

### Step 2: Restart Payload
```bash
# Stop current dev server (Ctrl+C)
pnpm dev
```

### Step 3: Test Workflow
1. Create new post dengan rich text title
2. Save as draft
3. Publish post  
4. Access frontend page
5. Verify no more errors

## ✅ Expected Results

After fixing version table:

### Database:
- ✅ **Main table**: posts dengan jsonb titles
- ✅ **Version table**: _posts_v dengan jsonb version_titles (recreated)
- ✅ **Schema consistency**: No type mismatches

### Payload Admin:
- ✅ **Draft saving** works normally
- ✅ **Publishing** works without errors
- ✅ **Version history** starts fresh (if using Option A)

### Frontend:
- ✅ **generateStaticParams** runs without errors
- ✅ **Post pages** load correctly
- ✅ **Rich text titles** display properly

## 🚨 Why This Happened

**Migration Sequence Issue**:
1. ✅ Updated main posts table structure
2. ✅ Updated Payload collection config
3. ❌ **MISSED**: Version table structure wasn't updated
4. ❌ **Result**: Schema mismatch between main & version tables

**Lesson**: When changing field types in Payload, both main and version tables need updates.

## 🔧 Prevention for Future

**Best Practice**: When updating collection field types:
1. Update main table structure
2. **Also update version table structure**
3. Test both draft and publish workflows
4. Verify frontend pages load correctly

---

**🎯 NEXT ACTION: Run `supabase-fix-version-table.sql` (Option A recommended) and restart Payload server.**
