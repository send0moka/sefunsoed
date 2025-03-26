'use client'

import Link from 'next/link'
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, type NavigationKeys } from '@/translations'
import { useSearchParams } from 'next/navigation'

const navigation = {
  main: [
    { name: 'about' as NavigationKeys, href: '/about' },
    { name: 'programs' as NavigationKeys, href: '/programs' },
    { name: 'registration' as NavigationKeys, href: '/registration' },
    { name: 'services' as NavigationKeys, href: '/services' },
    { name: 'content' as NavigationKeys, href: '/content' },
    { name: 'media' as NavigationKeys, href: '/media' },
  ],
  social: [
    {
      name: 'instagram',
      href: 'https://instagram.com/sef.unsoed',
      icon: FaInstagram,
    },
    {
      name: 'tiktok',
      href: 'https://tiktok.com/@sefunsoed',
      icon: FaTiktok,
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/sefunsoed',
      icon: FaTwitter,
    },
    {
      name: 'linkedin',
      href: 'https://linkedin.com/company/student-english-forum-unsoed',
      icon: FaLinkedin,
    },
    {
      name: 'youtube',
      href: 'https://youtube.com/@sefunsoed',
      icon: FaYoutube,
    },
  ],
}

export default function Footer() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', language)
    return `${href}?${params.toString()}`
  }

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={getLinkWithLang(item.href)} className="text-sm leading-6 text-gray-600 hover:text-indigo-600">
                {translations[language].navigation[item.name]}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href} className="text-gray-400 hover:text-indigo-600">
              <span className="sr-only">{translations[language].footer.social[item.name as keyof typeof translations[typeof language]['footer']['social']]}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center text-xs leading-5 text-gray-500">
          <p>{translations[language].footer.address.line1}</p>
          <p>{translations[language].footer.address.line2}</p>
          <p>{translations[language].footer.address.email}</p>
          <p>{translations[language].footer.address.phone}</p>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} SEF UNSOED. {translations[language].footer.copyright}
        </p>
      </div>
    </footer>
  )
} 