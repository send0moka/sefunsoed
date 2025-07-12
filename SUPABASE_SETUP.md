# Supabase Storage Setup for Media Uploads

## 1. Create Storage Bucket

1. Login to Supabase Dashboard: https://supabase.com/dashboard
2. Go to your project: `sefunsoed`
3. Navigate to **Storage** in the sidebar
4. Click **Create Bucket**
5. Bucket name: `media`
6. Set as **Public bucket** (checked)
7. Click **Create bucket**

## 2. Set Bucket Policies

Go to **Storage** → **Policies** and create these policies for the `media` bucket:

### Policy 1: Allow Public Read
```sql
-- Name: Allow public read access
-- Target: media bucket, SELECT operation

CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');
```

### Policy 2: Allow Authenticated Upload
```sql
-- Name: Allow authenticated upload
-- Target: media bucket, INSERT operation

CREATE POLICY "Allow authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');
```

### Policy 3: Allow Service Role (for API)
```sql
-- Name: Allow service role all access
-- Target: media bucket, ALL operations

CREATE POLICY "Allow service role all access" ON storage.objects
FOR ALL USING (bucket_id = 'media');
```

## 3. Environment Variables

Add these to your Vercel environment variables:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. Test Upload

Use the test endpoint: `/api/supabase-upload`

Files will be accessible at:
`https://your-project.supabase.co/storage/v1/object/public/media/filename`

## 5. Integrate with Payload

Once working, we can create a custom Payload storage adapter for Supabase.
