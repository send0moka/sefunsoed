'use client'
import React from 'react'
import { Mail, Phone, MapPin, MessageCircle, Globe, Clock, AlertCircle } from 'lucide-react'

interface ContactItem {
  iconType: 'email' | 'phone' | 'address' | 'whatsapp' | 'website' | 'time'
  title: string
  content: string
  colorScheme: 'blue' | 'green' | 'purple' | 'emerald' | 'indigo' | 'orange' | 'red' | 'pink'
}

interface ContactInformationProps {
  className?: string
  title?: string
  subtitle?: string
  layout?: 'horizontal' | 'vertical'
  showHoverEffect?: boolean
  contacts?: ContactItem[]
}

const iconMap = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  whatsapp: MessageCircle,
  website: Globe,
  time: Clock,
}

const colorSchemeMap = {
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
}

const ContactCard: React.FC<{
  iconType: keyof typeof iconMap
  title: string
  content: string
  colorScheme: keyof typeof colorSchemeMap
  showHoverEffect: boolean
}> = ({ iconType, title, content, colorScheme, showHoverEffect }) => {
  const IconComponent = iconMap[iconType] || AlertCircle
  const colors = colorSchemeMap[colorScheme] || colorSchemeMap.blue

  const hoverClasses = showHoverEffect ? 'hover:shadow-lg hover:transform hover:scale-105' : ''

  return (
    <div
      className={`bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm transition-all duration-300 ${hoverClasses}`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg flex-shrink-0 ${colors.bgColor}`}>
          <div className={`${colors.iconColor}`}>
            <IconComponent size={24} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${colors.textColor}`}>{content}</p>
        </div>
      </div>
    </div>
  )
}

const ContactInformationBlock: React.FC<ContactInformationProps> = ({
  title = 'Contact Information',
  subtitle = 'Hubungi kami melalui berbagai saluran komunikasi berikut ini',
  layout = 'horizontal',
  showHoverEffect = true,
  contacts = [],
}) => {
  const gridClasses =
    layout === 'vertical' ? 'grid gap-6 md:grid-cols-1' : 'grid gap-6 md:grid-cols-1 lg:grid-cols-3'

  return (
    <div className="py-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            {title}
          </h2>
          {subtitle && <p className="text-neutral-600 dark:text-neutral-400 text-lg">{subtitle}</p>}
        </div>

        <div className={gridClasses}>
          {contacts.map((contact: ContactItem, index: number) => (
            <ContactCard
              key={index}
              iconType={contact.iconType}
              title={contact.title}
              content={contact.content}
              colorScheme={contact.colorScheme}
              showHoverEffect={showHoverEffect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInformationBlock
