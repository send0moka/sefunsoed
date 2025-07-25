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
  Printer,
} from 'lucide-react'
import { ContactInfo } from './ContactInformationPanel'

export type ContactType =
  | 'email'
  | 'phone'
  | 'address'
  | 'whatsapp'
  | 'website'
  | 'hours'
  | 'fax'
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

interface ContactConfig {
  icon: React.ReactNode
  defaultTitle: string
  defaultColorScheme: ColorScheme
  hrefPrefix?: string
}

const contactConfigs: Record<ContactType, ContactConfig> = {
  email: {
    icon: <Mail size={24} />,
    defaultTitle: 'Email',
    defaultColorScheme: 'blue',
    hrefPrefix: 'mailto:',
  },
  phone: {
    icon: <Phone size={24} />,
    defaultTitle: 'Telepon',
    defaultColorScheme: 'green',
    hrefPrefix: 'tel:',
  },
  address: {
    icon: <MapPin size={24} />,
    defaultTitle: 'Alamat',
    defaultColorScheme: 'purple',
    hrefPrefix: 'https://maps.google.com/?q=',
  },
  whatsapp: {
    icon: <MessageCircle size={24} />,
    defaultTitle: 'WhatsApp',
    defaultColorScheme: 'emerald',
    hrefPrefix: 'https://wa.me/',
  },
  website: {
    icon: <Globe size={24} />,
    defaultTitle: 'Website',
    defaultColorScheme: 'indigo',
    hrefPrefix: 'https://',
  },
  hours: {
    icon: <Clock size={24} />,
    defaultTitle: 'Jam Operasional',
    defaultColorScheme: 'orange',
  },
  fax: {
    icon: <Printer size={24} />,
    defaultTitle: 'Fax',
    defaultColorScheme: 'neutral',
    hrefPrefix: 'tel:',
  },
  instagram: {
    icon: <Instagram size={24} />,
    defaultTitle: 'Instagram',
    defaultColorScheme: 'pink',
    hrefPrefix: 'https://instagram.com/',
  },
  facebook: {
    icon: <Facebook size={24} />,
    defaultTitle: 'Facebook',
    defaultColorScheme: 'blue',
    hrefPrefix: 'https://facebook.com/',
  },
  twitter: {
    icon: <Twitter size={24} />,
    defaultTitle: 'Twitter',
    defaultColorScheme: 'cyan',
    hrefPrefix: 'https://twitter.com/',
  },
  linkedin: {
    icon: <Linkedin size={24} />,
    defaultTitle: 'LinkedIn',
    defaultColorScheme: 'blue',
    hrefPrefix: 'https://linkedin.com/in/',
  },
  youtube: {
    icon: <Youtube size={24} />,
    defaultTitle: 'YouTube',
    defaultColorScheme: 'red',
    hrefPrefix: 'https://youtube.com/@',
  },
  support: {
    icon: <Users size={24} />,
    defaultTitle: 'Support',
    defaultColorScheme: 'blue',
  },
  appointment: {
    icon: <Calendar size={24} />,
    defaultTitle: 'Jadwalkan Pertemuan',
    defaultColorScheme: 'green',
  },
  document: {
    icon: <FileText size={24} />,
    defaultTitle: 'Dokumen',
    defaultColorScheme: 'neutral',
  },
  info: {
    icon: <Info size={24} />,
    defaultTitle: 'Informasi',
    defaultColorScheme: 'blue',
  },
}

const colorSchemeMap: Record<
  ColorScheme,
  { iconColor: string; textColor: string; bgColor: string }
> = {
  blue: {
    iconColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
  },
  green: {
    iconColor: 'text-green-600 dark:text-green-400',
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
  },
  purple: {
    iconColor: 'text-purple-600 dark:text-purple-400',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
  },
  emerald: {
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  indigo: {
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
  },
  orange: {
    iconColor: 'text-orange-600 dark:text-orange-400',
    textColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
  },
  red: {
    iconColor: 'text-red-600 dark:text-red-400',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
  },
  pink: {
    iconColor: 'text-pink-600 dark:text-pink-400',
    textColor: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
  },
  neutral: {
    iconColor: 'text-neutral-600 dark:text-neutral-400',
    textColor: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-50 dark:bg-neutral-950/40',
  },
  yellow: {
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/40',
  },
  teal: {
    iconColor: 'text-teal-600 dark:text-teal-400',
    textColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
  },
  cyan: {
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
  },
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
  const config = contactConfigs[type]
  const finalColorScheme = colorScheme || config.defaultColorScheme
  const colors = colorSchemeMap[finalColorScheme]

  let finalHref = href
  if (!finalHref && config.hrefPrefix && !onClick) {
    finalHref = config.hrefPrefix + content
  }

  return {
    icon: config.icon,
    title: title || config.defaultTitle,
    content,
    iconColor: colors.iconColor,
    textColor: colors.textColor,
    bgColor: colors.bgColor,
    href: finalHref,
    onClick,
    ariaLabel: ariaLabel || `${title || config.defaultTitle}: ${content}`,
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
    social: [
      createSocialContact('instagram', 'sefunsoed', 'Instagram'),
      createSocialContact('facebook', 'sefunsoed', 'Facebook'),
      createSocialContact('twitter', 'sefunsoed', 'Twitter'),
      createSocialContact('linkedin', 'company/sefunsoed', 'LinkedIn'),
      createSocialContact('youtube', 'sefunsoed', 'YouTube'),
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
  contactConfigs,
  colorSchemeMap,
}

export default ContactUtils
