'use client'
import React from 'react'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  iconColor: string
  textColor: string
  bgColor: string
  href?: string
  onClick?: () => void
  ariaLabel?: string
}

interface ContactInformationPanelProps {
  title?: string
  subtitle?: string
  contacts?: ContactInfo[]
  className?: string
  cardClassName?: string
  showHoverEffect?: boolean
  layout?: 'vertical' | 'horizontal'
  showExternalLinkIcon?: boolean
  onContactClick?: (contact: ContactInfo, index: number) => void
}

const defaultContacts: ContactInfo[] = [
  {
    icon: <Mail size={24} />,
    title: 'Email',
    content: 'info@sefunsoed.com',
    iconColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    href: 'mailto:info@sefunsoed.com',
    ariaLabel: 'Kirim email ke info@sefunsoed.com',
  },
  {
    icon: <Phone size={24} />,
    title: 'Telepon',
    content: '+62 281 123 4567',
    iconColor: 'text-green-600 dark:text-green-400',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    href: 'tel:+62281123456',
    ariaLabel: 'Hubungi telepon +62 281 123 4567',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Alamat',
    content:
      'Jl. Prof. Dr. Boenyamin No.708, Grendeng, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53122',
    iconColor: 'text-purple-600 dark:text-purple-400',
    textColor: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    href: 'https://maps.google.com/?q=Jl.+Prof.+Dr.+Boenyamin+No.708,+Grendeng,+Kec.+Purwokerto+Utara,+Kabupaten+Banyumas,+Jawa+Tengah+53122',
    ariaLabel: 'Lihat lokasi di Google Maps',
  },
]

interface ContactCardProps extends ContactInfo {
  showHoverEffect?: boolean
  cardClassName?: string
  showExternalLinkIcon?: boolean
  onContactClick?: (contact: ContactInfo, index: number) => void
  index: number
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  content,
  iconColor,
  textColor,
  bgColor,
  href,
  onClick,
  ariaLabel,
  showHoverEffect = true,
  cardClassName = '',
  showExternalLinkIcon = false,
  onContactClick,
  index,
}) => {
  const hoverClasses = showHoverEffect
    ? 'hover:shadow-lg hover:transform hover:scale-105 hover:cursor-pointer'
    : ''

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (onContactClick) {
      onContactClick(
        {
          icon,
          title,
          content,
          iconColor,
          textColor,
          bgColor,
          href,
          onClick,
          ariaLabel,
        },
        index,
      )
    } else if (href) {
      window.open(href, '_blank')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const CardContent = () => (
    <div className="flex items-start space-x-4">
      <div className={`p-3 rounded-lg flex-shrink-0 ${bgColor}`}>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {title}
          </h3>
          {showExternalLinkIcon && href && (
            <ExternalLink size={16} className="text-neutral-400 dark:text-neutral-500" />
          )}
        </div>
        <p className={`text-sm leading-relaxed ${textColor}`}>{content}</p>
      </div>
    </div>
  )

  const commonClasses = `bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm dark:shadow-neutral-900/20 transition-all duration-300 ${hoverClasses} ${cardClassName}`

  if (href || onClick || onContactClick) {
    return (
      <div
        className={`${commonClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-800`}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel || `${title}: ${content}`}
      >
        <CardContent />
      </div>
    )
  }

  return (
    <div className={commonClasses}>
      <CardContent />
    </div>
  )
}

const ContactInformationPanel: React.FC<ContactInformationPanelProps> = ({
  title = 'Contact Information',
  subtitle = 'Hubungi kami melalui berbagai saluran komunikasi berikut ini',
  contacts = defaultContacts,
  className = '',
  cardClassName = '',
  showHoverEffect = true,
  layout = 'vertical',
  showExternalLinkIcon = false,
  onContactClick,
}) => {
  const gridClasses =
    layout === 'vertical' ? 'grid gap-6 md:grid-cols-1' : 'grid gap-6 md:grid-cols-1 lg:grid-cols-3'

  return (
    <div className={`max-w-4xl mx-auto p-8 bg-transparent dark:bg-transparent ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">{subtitle}</p>
      </div>

      <div className={gridClasses}>
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            index={index}
            icon={contact.icon}
            title={contact.title}
            content={contact.content}
            iconColor={contact.iconColor}
            textColor={contact.textColor}
            bgColor={contact.bgColor}
            href={contact.href}
            onClick={contact.onClick}
            ariaLabel={contact.ariaLabel}
            showHoverEffect={showHoverEffect}
            cardClassName={cardClassName}
            showExternalLinkIcon={showExternalLinkIcon}
            onContactClick={onContactClick}
          />
        ))}
      </div>
    </div>
  )
}

export default ContactInformationPanel
