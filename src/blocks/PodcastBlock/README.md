# PodcastBlock Component

Komponen PodcastBlock memungkinkan Anda untuk menampilkan podcast dengan dua cara: menggunakan Spotify embed atau custom audio player.

## Features

### 🎵 Custom Audio Player
- ✅ Tombol Play/Pause dengan feedback visual
- ✅ Progress bar yang bisa diklik untuk seek
- ✅ Display waktu (current / total)
- ✅ Indikator waktu sisa
- ✅ Responsive design
- ✅ Loading states
- ✅ Link ke Spotify untuk episode lainnya
- ✅ Support MP3 files dari folder public

### 🎧 Spotify Embed
- ✅ Embed langsung dari Spotify
- ✅ Full Spotify player functionality
- ✅ Link ke Spotify show

## Usage

### 1. Dengan Custom Player

```tsx
<PodcastBlock
  title="Listen to Our Podcasts on Spotify"
  spotifyUrl="https://open.spotify.com/show/your-show-id"
  useCustomPlayer={true}
  episode={{
    title: "Episode Title",
    description: "Episode description...",
    publishedDate: "2024-01-15",
    coverImage: "/media/podcast-cover.jpg",
    audioFile: "/media/episode1.mp3",
    duration: 1800 // 30 minutes in seconds
  }}
/>
```

### 2. Dengan Spotify Embed

```tsx
<PodcastBlock
  title="Listen to Our Podcasts on Spotify"
  spotifyUrl="https://open.spotify.com/show/your-show-id"
  useCustomPlayer={false}
  spotifyEmbedCode={`
    <iframe 
      src="https://open.spotify.com/embed/episode/episode-id" 
      width="100%" 
      height="352" 
      frameBorder="0" 
      allowfullscreen="" 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy">
    </iframe>
  `}
/>
```

## Setup di Payload CMS

1. **Tambahkan PodcastBlock ke halaman**:
   - Buka Payload admin panel
   - Edit halaman yang ingin ditambahkan podcast
   - Tambah block baru → Pilih "Podcast Block"

2. **Konfigurasi block**:
   - **Title**: Judul section (default: "Listen to Our Podcasts on Spotify")
   - **Spotify URL**: Link ke Spotify show
   - **Use Custom Player**: Checkbox untuk memilih mode

### Mode Custom Player
Jika "Use Custom Player" dicentang:
- **Episode Title**: Judul episode
- **Episode Description**: Deskripsi episode
- **Published Date**: Tanggal publish
- **Cover Image**: Upload gambar cover
- **Audio File Path**: Path ke file MP3 (contoh: `/media/episode1.mp3`)
- **Duration**: Durasi dalam detik

### Mode Spotify Embed
Jika "Use Custom Player" tidak dicentang:
- **Spotify Embed Code**: Paste iframe code dari Spotify

## Cara Mendapat Spotify Embed Code

1. Buka halaman podcast di Spotify
2. Klik tombol "Share" (bagikan)
3. Pilih "Embed episode"
4. Copy iframe code yang diberikan
5. Paste ke field "Spotify Embed Code"

## File Audio untuk Custom Player

1. **Upload file MP3** ke folder `/public/media/`
2. **Gunakan path relatif** seperti `/media/episode1.mp3`
3. **Format yang didukung**: MP3 (recommended), WAV, OGG
4. **Ukuran**: Pastikan file tidak terlalu besar untuk performa website

## Contoh Implementasi

Lihat demo lengkap di: `/podcast-demo`

### Struktur File:
```
public/
  media/
    podcast-cover.jpg
    episode1.mp3
    episode2.mp3

src/
  blocks/
    PodcastBlock/
      Component.tsx
      config.ts
      index.ts
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | "Listen to Our Podcasts on Spotify" | Judul section |
| `spotifyUrl` | string | - | URL ke Spotify show |
| `useCustomPlayer` | boolean | true | Gunakan custom player atau embed |
| `spotifyEmbedCode` | string | - | Iframe code dari Spotify |
| `episode` | object | - | Data episode untuk custom player |

### Episode Object:
| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Judul episode |
| `description` | string | Deskripsi episode |
| `publishedDate` | string | Tanggal publish (YYYY-MM-DD) |
| `coverImage` | string | Path ke gambar cover |
| `audioFile` | string | Path ke file MP3 |
| `duration` | number | Durasi dalam detik |

## Custom Styling

Component menggunakan Tailwind CSS dan dapat di-customize melalui:
- CSS classes yang sudah ada
- Theme colors (green untuk Spotify branding)
- Dark mode support

## Browser Support

- ✅ Chrome/Edge (Chromium-based)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Touch devices

## Tips & Best Practices

1. **Audio Quality**: Gunakan MP3 dengan bitrate 128kbps untuk balance antara kualitas dan ukuran file
2. **Cover Image**: Gunakan ukuran 300x300px atau 500x500px untuk hasil optimal
3. **Description**: Buat deskripsi yang menarik tapi tidak terlalu panjang
4. **Duration**: Isi duration untuk user experience yang lebih baik
5. **Loading**: Component sudah handle loading states untuk audio

## Troubleshooting

### Audio tidak bisa diplay
- Pastikan file MP3 ada di folder `/public/media/`
- Check browser console untuk error messages
- Pastikan path file benar (case sensitive)

### Spotify embed tidak muncul
- Pastikan iframe code valid
- Check apakah embed diizinkan oleh Spotify
- Verifikasi episode ID dalam URL

### Styling issues
- Pastikan Tailwind CSS ter-load dengan benar
- Check responsive breakpoints
- Verifikasi dark mode configuration
