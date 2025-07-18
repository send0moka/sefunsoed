# Carousel Block

Auto-playing image carousel block dengan navigation dots dan theme-adaptive overlay.

## Fitur

- ✅ **Auto-play**: Berganti slide otomatis setiap 5 detik (dapat dikustomisasi 3-30 detik)
- ✅ **Navigation Dots**: Dots clickable di bawah carousel dengan kontras adaptif theme
- ✅ **Pause on Hover**: Auto-play berhenti saat mouse hover
- ✅ **Full Width Design**: Lebar penuh dengan rounded corners dan object-cover
- ✅ **Title & Subtitle Overlay**: Overlay di kiri bawah dengan background opacity 50%
- ✅ **Dark Theme Support**: Semua elemen adaptif light/dark theme
- ✅ **Responsive**: Tinggi adaptif berdasarkan ukuran screen
- ✅ **Smooth Transitions**: Animasi halus untuk semua interaksi

## Penggunaan di CMS

1. **Buat/Edit Halaman**: Masuk ke admin panel dan buat/edit halaman
2. **Tambah Block**: Pilih "Carousel" dari daftar layout blocks
3. **Upload Images**: Tambahkan 1-10 gambar untuk carousel
4. **Isi Konten** (opsional untuk setiap gambar):
   - **Title**: Judul yang ditampilkan di overlay
   - **Subtitle**: Deskripsi yang ditampilkan di bawah title
   - **Alt Text**: Text alternatif untuk accessibility (wajib)
5. **Konfigurasi**:
   - **Auto Play Interval**: 3-30 detik (default: 5 detik)
   - **Show Navigation Dots**: Aktifkan/nonaktifkan dots navigation
   - **Pause on Hover**: Aktifkan/nonaktifkan pause saat hover

## Styling

### Light Theme
- **Overlay Background**: `bg-black/50` (hitam transparan 50%)
- **Title Text**: `text-white` (putih)
- **Subtitle Text**: `text-neutral-200` (abu-abu terang)
- **Active Dot**: `bg-white` (putih solid)
- **Inactive Dot**: `bg-white/50` (putih transparan 50%)

### Dark Theme
- **Overlay Background**: `bg-white/50` (putih transparan 50%)
- **Title Text**: `text-black` (hitam)
- **Subtitle Text**: `text-neutral-800` (abu-abu gelap)
- **Active Dot**: `bg-black` (hitam solid)
- **Inactive Dot**: `bg-black/50` (hitam transparan 50%)

## Struktur File

```
src/blocks/CarouselBlock/
├── config.ts          # Konfigurasi CMS fields
├── Component.tsx      # Main carousel component
└── README.md         # Dokumentasi ini
```

## Technical Features

- **Auto-play Timer**: `setInterval` dengan cleanup proper
- **State Management**: React hooks untuk current index dan play state
- **Event Handling**: Mouse enter/leave untuk pause on hover
- **Image Optimization**: Next.js Image component dengan lazy loading
- **Accessibility**: Proper ARIA labels dan alt text
- **Performance**: Priority loading untuk gambar pertama

## Demo

Lihat demo di: `/carousel-demo`
