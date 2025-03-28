"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Dialog } from "@headlessui/react"
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type NavigationKeys } from "@/translations"
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"

const navigation: { name: NavigationKeys; href: string }[] = [
  { name: "about", href: "/about" },
  { name: "programs", href: "/programs" },
  { name: "registration", href: "/registration" },
  { name: "services", href: "/services" },
  { name: "content", href: "/content" },
  { name: "media", href: "/media" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useUser()

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "jehianathayata@gmail.com"

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en")
  }

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={getLinkWithLang("/")} className="-m-1.5 p-1.5">
            <Image src="/logo.jpeg" alt="SEF UNSOED" width={100} height={100} />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={getLinkWithLang(item.href)}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href
                  ? "text-indigo-600"
                  : "text-gray-900 hover:text-indigo-600"
              } ${item.name === "media" ? "mr-6" : ""}`}
            >
              {translations[language].navigation[item.name]}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              <div className="flex items-center gap-2 w-[50px] justify-center">
                <Image
                  src={language === "en" ? "/flags/uk.png" : "/flags/id.png"}
                  alt={language === "en" ? "English" : "Indonesia"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 min-w-[20px]">
                  {language.toUpperCase()}
                </span>
              </div>
            </button>
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ChartPieIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Dashboard
              </Link>
            )}
            <SignedOut>
              <SignInButton>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                  <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              <div className="flex items-center gap-2 w-[50px] justify-center">
                <Image
                  src={language === "en" ? "/flags/uk.png" : "/flags/id.png"}
                  alt={language === "en" ? "English" : "Indonesia"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 min-w-[20px]">
                  {language.toUpperCase()}
                </span>
              </div>
            </button>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">
                {translations[language].common.openMenu}
              </span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={getLinkWithLang("/")} className="-m-1.5 p-1.5">
              <Image
                src="/logo.jpeg"
                alt="SEF UNSOED"
                width={100}
                height={100}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">
                {translations[language].common.closeMenu}
              </span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={getLinkWithLang(item.href)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === item.href
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {translations[language].navigation[item.name]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="w-full flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 p-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChartPieIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Dashboard
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <button className="w-full flex items-center gap-2 px-4 py-4 lg:py-2 mt-4 lg:mt-0 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4 mt-6">
              <UserButton />
            </div>
          </SignedIn>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
