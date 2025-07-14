# Sample Post Data with Indonesian Translation

Ini adalah contoh data post yang sudah memiliki konten dalam kedua bahasa (English dan Indonesian).

## English Content
```json
{
  "title": "The Welcoming Wave 2025: A New Beginning for SEF",
  "content": {
    "root": {
      "type": "root",
      "format": "",
      "indent": 0,
      "version": 1,
      "children": [
        {
          "tag": "h4",
          "type": "heading",
          "format": "",
          "indent": 0,
          "version": 1,
          "children": [
            {
              "mode": "normal",
              "text": "Starting a new period is the first challenge for any organization.",
              "type": "text",
              "style": "",
              "detail": 0,
              "format": 0,
              "version": 1
            }
          ],
          "direction": "ltr"
        }
      ],
      "direction": "ltr"
    }
  }
}
```

## Indonesian Content
```json
{
  "title_id": "The Welcoming Wave 2025: Awal Baru untuk SEF",
  "content_id": {
    "root": {
      "type": "root",
      "format": "",
      "indent": 0,
      "version": 1,
      "children": [
        {
          "tag": "h4",
          "type": "heading",
          "format": "",
          "indent": 0,
          "version": 1,
          "children": [
            {
              "mode": "normal",
              "text": "Memulai periode baru adalah tantangan pertama bagi setiap organisasi.",
              "type": "text",
              "style": "",
              "detail": 0,
              "format": 0,
              "version": 1
            }
          ],
          "direction": "ltr"
        }
      ],
      "direction": "ltr"
    }
  }
}
```

## Cara Menambahkan Konten Indonesian di Admin Panel

1. Buka admin panel Payload di `/admin`
2. Pilih "Posts" dari menu kiri
3. Buat post baru atau edit post yang sudah ada
4. Isi field berikut:
   - **Title (English)**: Judul dalam bahasa Inggris
   - **Title (Indonesian)**: Judul dalam bahasa Indonesia
   - **Content (English)**: Konten dalam bahasa Inggris
   - **Content (Indonesian)**: Konten dalam bahasa Indonesia
5. Save post

## Testing
Setelah menambahkan konten dalam kedua bahasa:

1. Buka halaman post di frontend
2. Lihat button switch bahasa di bagian hero (flag icons)
3. Klik flag British (🇬🇧) untuk English
4. Klik flag Indonesian (🇮🇩) untuk Indonesian
5. Perhatikan bahwa title dan content berubah sesuai bahasa yang dipilih

## SQL untuk Sample Data
Jika ingin menambahkan sample data langsung ke database:

```sql
-- Update existing post with Indonesian content
UPDATE posts 
SET 
  title_id = 'The Welcoming Wave 2025: Awal Baru untuk SEF',
  content_id = '{
    "root": {
      "type": "root",
      "format": "",
      "indent": 0,
      "version": 1,
      "children": [
        {
          "tag": "h4",
          "type": "heading",
          "format": "",
          "indent": 0,
          "version": 1,
          "children": [
            {
              "mode": "normal",
              "text": "Memulai periode baru adalah tantangan pertama bagi setiap organisasi.",
              "type": "text",
              "style": "",
              "detail": 0,
              "format": 0,
              "version": 1
            }
          ],
          "direction": "ltr"
        }
      ],
      "direction": "ltr"
    }
  }'::jsonb
WHERE slug = 'the-welcoming-wave-2025';
```
