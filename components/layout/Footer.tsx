import Link from 'next/link'
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Registration', href: '/registration' },
    { name: 'Services', href: '/services' },
    { name: 'Content', href: '/content' },
    { name: 'Media', href: '/media' },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: FaInstagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: FaTwitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: FaLinkedin,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: FaYoutube,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-indigo-600">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href} className="text-gray-400 hover:text-indigo-600">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} SEF UNSOED. All rights reserved.
        </p>
        <div className="mt-10 text-center text-xs leading-5 text-gray-500">
          <p>Jl. Prof. Dr. HR Boenyamin No.708, Grendeng, Kec. Purwokerto Utara</p>
          <p>Kabupaten Banyumas, Jawa Tengah 53122</p>
          <p>Email: sef@unsoed.ac.id</p>
          <p>Telp: (0281) 638491</p>
        </div>
      </div>
    </footer>
  )
} 