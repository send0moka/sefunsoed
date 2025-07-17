import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Globe,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Users,
  Calendar,
  FileText,
  Info,
} from 'lucide-react'
import { ContactInfo } from './ContactInformationPanel'

export type ContactType =
  | 'email'
  | 'phone'
  | 'address'
  | 'whatsapp'
  | 'website'
  | 'hours'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'support'
  | 'appointment'
  | 'document'
  | 'info'

export type ColorScheme =
  | 'blue'
  | 'green'
  | 'purple'
  | 'emerald'
  | 'indigo'
  | 'orange'
  | 'red'
  | 'pink'
  | 'neutral'
  | 'yellow'
  | 'teal'
  | 'cyan'

const getIcon = (type: ContactType) => {
  switch (type) {
    case 'email':
      return <Mail size={24} />
    case 'phone':
      return <Phone size={24} />
    case 'address':
      return <MapPin size={24} />
    case 'whatsapp':
      return <MessageCircle size={24} />
    case 'website':
      return <Globe size={24} />
    case 'hours':
      return <Clock size={24} />
    case 'instagram':
      return <Instagram size={24} />
    case 'facebook':
      return <Facebook size={24} />
    case 'twitter':
      return <Twitter size={24} />
    case 'linkedin':
      return <Linkedin size={24} />
    case 'youtube':
      return <Youtube size={24} />
    case 'support':
      return <Users size={24} />
    case 'appointment':
      return <Calendar size={24} />
    case 'document':
      return <FileText size={24} />
    case 'info':
      return <Info size={24} />
    default:
      return <Mail size={24} />
  }
}

const getColorScheme = (colorScheme: ColorScheme) => {
  const colorMap = {
    blue: {
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    },
    green: {
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-50 dark:bg-green-950/40',
    },
    purple: {
      iconColor: 'text-purple-600 dark:text-purple-400',
      textColor: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    },
    emerald: {
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    indigo: {
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    orange: {
      iconColor: 'text-orange-600 dark:text-orange-400',
      textColor: 'text-orange-700 dark:text-orange-300',
      bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    },
    red: {
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-700 dark:text-red-300',
      bgColor: 'bg-red-50 dark:bg-red-950/40',
    },
    pink: {
      iconColor: 'text-pink-600 dark:text-pink-400',
      textColor: 'text-pink-700 dark:text-pink-300',
      bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    },
    neutral: {
      iconColor: 'text-neutral-600 dark:text-neutral-400',
      textColor: 'text-neutral-700 dark:text-neutral-300',
      bgColor: 'bg-neutral-50 dark:bg-neutral-900/60',
    },
    yellow: {
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/40',
    },
    teal: {
      iconColor: 'text-teal-600 dark:text-teal-400',
      textColor: 'text-teal-700 dark:text-teal-300',
      bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    },
    cyan: {
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      textColor: 'text-cyan-700 dark:text-cyan-300',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    },
  }
  return colorMap[colorScheme] || colorMap.blue
}

const getHrefPrefix = (type: ContactType) => {
  switch (type) {
    case 'email':
      return 'mailto:'
    case 'phone':
      return 'tel:'
    case 'address':
      return 'https://maps.google.com/?q='
    case 'whatsapp':
      return 'https://wa.me/'
    case 'website':
      return 'https://'
    case 'instagram':
      return 'https://instagram.com/'
    case 'facebook':
      return 'https://facebook.com/'
    case 'twitter':
      return 'https://twitter.com/'
    case 'linkedin':
      return 'https://linkedin.com/in/'
    case 'youtube':
      return 'https://youtube.com/@'
    default:
      return ''
  }
}

const getDefaultTitle = (type: ContactType) => {
  switch (type) {
    case 'email':
      return 'Email'
    case 'phone':
      return 'Telepon'
    case 'address':
      return 'Alamat'
    case 'whatsapp':
      return 'WhatsApp'
    case 'website':
      return 'Website'
    case 'hours':
      return 'Jam Operasional'
    case 'instagram':
      return 'Instagram'
    case 'facebook':
      return 'Facebook'
    case 'twitter':
      return 'Twitter'
    case 'linkedin':
      return 'LinkedIn'
    case 'youtube':
      return 'YouTube'
    case 'support':
      return 'Support'
    case 'appointment':
      return 'Jadwalkan Pertemuan'
    case 'document':
      return 'Dokumen'
    case 'info':
      return 'Informasi'
    default:
      return 'Contact'
  }
}

const getDefaultColorScheme = (type: ContactType): ColorScheme => {
  switch (type) {
    case 'email':
      return 'blue'
    case 'phone':
      return 'green'
    case 'address':
      return 'purple'
    case 'whatsapp':
      return 'emerald'
    case 'website':
      return 'indigo'
    case 'hours':
      return 'orange'
    case 'instagram':
      return 'pink'
    case 'facebook':
      return 'blue'
    case 'twitter':
      return 'cyan'
    case 'linkedin':
      return 'blue'
    case 'youtube':
      return 'red'
    case 'support':
      return 'blue'
    case 'appointment':
      return 'green'
    case 'document':
      return 'neutral'
    case 'info':
      return 'blue'
    default:
      return 'blue'
  }
}

interface CreateContactParams {
  type: ContactType
  content: string
  title?: string
  colorScheme?: ColorScheme
  href?: string
  onClick?: () => void
  ariaLabel?: string
}

export const createContact = ({
  type,
  content,
  title,
  colorScheme,
  href,
  onClick,
  ariaLabel,
}: CreateContactParams): ContactInfo => {
  const finalColorScheme = colorScheme || getDefaultColorScheme(type)
  const colors = getColorScheme(finalColorScheme)

  let finalHref = href
  if (!finalHref && !onClick) {
    const prefix = getHrefPrefix(type)
    if (prefix) {
      finalHref = prefix + content
    }
  }

  return {
    icon: getIcon(type),
    title: title || getDefaultTitle(type),
    content,
    iconColor: colors.iconColor,
    textColor: colors.textColor,
    bgColor: colors.bgColor,
    href: finalHref,
    onClick,
    ariaLabel: ariaLabel || `${title || getDefaultTitle(type)}: ${content}`,
  }
}

// Helper functions for common contact types
export const createEmailContact = (email: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'email', content: email, title, colorScheme })

export const createPhoneContact = (phone: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'phone', content: phone, title, colorScheme })

export const createAddressContact = (address: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'address', content: address, title, colorScheme })

export const createWhatsAppContact = (phone: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'whatsapp', content: phone, title, colorScheme })

export const createWebsiteContact = (website: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'website', content: website, title, colorScheme })

export const createHoursContact = (hours: string, title?: string, colorScheme?: ColorScheme) =>
  createContact({ type: 'hours', content: hours, title, colorScheme })

export const createSocialContact = (
  type: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube',
  username: string,
  title?: string,
  colorScheme?: ColorScheme,
) => createContact({ type, content: username, title, colorScheme })

export const createInteractiveContact = (
  type: ContactType,
  content: string,
  onClick: () => void,
  title?: string,
  colorScheme?: ColorScheme,
) => createContact({ type, content, onClick, title, colorScheme })

// Pre-defined contact templates
export const templates = {
  sefunsoed: {
    basic: [
      createEmailContact('info@sefunsoed.com'),
      createPhoneContact('+62 281 123 4567'),
      createAddressContact(
        'Jl. Prof. Dr. Boenyamin No.708, Grendeng, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53122',
      ),
    ],
    extended: [
      createEmailContact('admin@sefunsoed.ac.id', 'Email Utama'),
      createPhoneContact('+62 281 123 4567', 'Telepon Kantor'),
      createWhatsAppContact('6281234567890', 'WhatsApp'),
      createWebsiteContact('www.sefunsoed.ac.id', 'Website'),
      createHoursContact('Senin - Jumat: 08:00 - 16:00 WIB', 'Jam Operasional'),
      createAddressContact(
        'Fakultas Ekonomi dan Bisnis, Universitas Jenderal Soedirman, Purwokerto',
        'Lokasi',
      ),
    ],
  },
}

const ContactUtils = {
  createContact,
  createEmailContact,
  createPhoneContact,
  createAddressContact,
  createWhatsAppContact,
  createWebsiteContact,
  createHoursContact,
  createSocialContact,
  createInteractiveContact,
  templates,
}

export default ContactUtils
