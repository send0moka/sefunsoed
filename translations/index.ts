export type NavigationKeys = 'home' | 'about' | 'programs' | 'registration' | 'services' | 'content' | 'media'
export type CommonKeys = 'openMenu' | 'closeMenu'
export type LanguageKeys = 'en' | 'id'

type Navigation = {
  [K in NavigationKeys]: string
}

type Common = {
  [K in CommonKeys]: string
}

type Translation = {
  navigation: Navigation
  common: Common
}

type Translations = {
  [K in LanguageKeys]: Translation
}

export const translations: Translations = {
  en: {
    navigation: {
      home: 'Home',
      about: 'About Us',
      programs: 'Programs & Activities',
      registration: 'Registration',
      services: 'Services',
      content: 'Content',
      media: 'Media',
    },
    common: {
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
    },
  },
  id: {
    navigation: {
      home: 'Beranda',
      about: 'Tentang Kami',
      programs: 'Program & Kegiatan',
      registration: 'Pendaftaran',
      services: 'Layanan',
      content: 'Konten',
      media: 'Media',
    },
    common: {
      openMenu: 'Buka menu utama',
      closeMenu: 'Tutup menu',
    },
  },
} 