'use client'
import React from 'react'

const CarouselDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      {/* Header */}
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Carousel Block Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Demonstrasi carousel image dengan auto-play setiap 5 detik, navigation dots yang dapat
            diklik, dan overlay title/subtitle dengan background opacity yang menyesuaikan theme.
          </p>
        </div>

        {/* Carousel Demo */}
        <div className="text-center mb-8">
          <p className="text-neutral-600 dark:text-neutral-400">
            <strong>Note:</strong> Demo menggunakan mock data. Dalam implementasi CMS, gambar akan
            diupload melalui admin panel.
          </p>
        </div>

        {/* Manual Carousel Implementation for Demo */}
        <div className="relative w-full h-96 md:h-[32rem] lg:h-[40rem] rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Carousel Block Preview
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Carousel akan muncul di sini setelah diimplementasikan di CMS
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
            Fitur Carousel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🔄 Auto-Play
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Berganti slide otomatis setiap 5 detik (dapat dikustomisasi)
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                ⏸️ Pause on Hover
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Auto-play berhenti saat cursor berada di atas carousel
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🔘 Navigation Dots
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Dots dapat diklik untuk navigasi manual, warna kontras berdasarkan theme
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🖼️ Full Width Design
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Lebar penuh dengan rounded corners dan object-cover
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                📝 Title & Subtitle Overlay
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Overlay di kiri bawah dengan background opacity 50% yang adaptif theme
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🌓 Dark Theme Support
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Semua elemen otomatis menyesuaikan light/dark theme
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Example */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Cara Penggunaan di CMS
          </h2>
          <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
            <p>1. Buat atau edit halaman di admin panel</p>
            <p>2. Tambahkan block &quot;Carousel&quot; ke layout</p>
            <p>3. Upload gambar-gambar untuk carousel</p>
            <p>4. Isi title dan subtitle untuk setiap gambar (opsional)</p>
            <p>5. Atur interval auto-play (default: 5 detik)</p>
            <p>6. Aktifkan/nonaktifkan navigation dots dan pause on hover</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselDemoPage
