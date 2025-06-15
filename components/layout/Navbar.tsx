"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Dialog } from "@headlessui/react"
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  ChartPieIcon,
} from "@heroicons/react/24/outline"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type NavigationKeys } from "@/translations"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import { authService } from "@/lib/supabase-admin"
import { supabase } from "@/lib/supabase"
import { HeaderConfig } from "@/types/database"

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
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null)
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdminRole() {
      if (user?.primaryEmailAddress?.emailAddress) {
        const role = await authService.getUserRole(
          user.primaryEmailAddress.emailAddress
        )
        setIsAdmin(role === "admin")
      }
    }

    checkAdminRole()
  }, [user])

  useEffect(() => {
    async function loadHeaderConfig() {
      const { data, error } = await supabase
        .from("header_configs")
        .select("*")
        .eq("is_active", true)
        .single()

      if (!error && data) {
        setHeaderConfig(data)
      }
    }

    loadHeaderConfig()
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en")
  }

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  return (
    <header 
      className={`fixed top-4 lg:top-10 left-1/2 -translate-x-1/2 z-50 w-[95%] ${
        headerConfig?.config.layout.maxWidth ?? "max-w-[76rem]"
      }`}
    >
      <nav
        className={[
          headerConfig?.config.layout.display ?? "flex",
          headerConfig?.config.layout.alignment ?? "items-center justify-between",
          headerConfig?.config.layout.padding.left ?? "px-6",
          headerConfig?.config.layout.padding.right ?? "lg:px-8",
          headerConfig?.config?.background?.color ?? "bg-black/90",
          headerConfig?.config?.background?.blur ?? "backdrop-blur-sm",
          headerConfig?.config.background?.rounded ?? "",
          headerConfig?.config.background?.shadow ?? "shadow-lg",
        ].filter(Boolean).join(" ")}
        aria-label="Global"
      >
          <Link href={getLinkWithLang("/")}>
            <Image
              src="/logo.png"
              alt="SEF UNSOED"
              width={100}
              height={48}
              className={`${
                headerConfig?.config.logo.brightness || "brightness-0"
              } ${headerConfig?.config.logo.invert || "invert"} md:py-2 scale-75 md:scale-100 -translate-x-3 md:-translate-x-0`}
            />
          </Link>
        <div
          className={`hidden lg:flex ${
            headerConfig?.config.navigation.spacing || "lg:gap-x-12"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={getLinkWithLang(item.href)}
              className={`${headerConfig?.config.navigation.fontSize || "text-sm"} ${
                headerConfig?.config.navigation.fontWeight || "font-semibold"
              } leading-6 ${
                pathname === item.href
                  ? headerConfig?.config.navigation.activeColor || "text-indigo-600"
                  : `${headerConfig?.config.navigation.textColor || "text-gray-50"} ${
                      headerConfig?.config.navigation.hoverColor || "hover:text-indigo-600"
                    }`
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
              className={`flex items-center gap-2 p-3 ${
                headerConfig?.config.buttons.language.borderRadius || "rounded-full"
              } ${headerConfig?.config.buttons.language.backgroundColor || "bg-gray-100"} hover:bg-gray-200 transition-all duration-300`}
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
                className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ChartPieIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Dashboard
              </Link>
            )}
            <SignedOut>
              <SignInButton>
                <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
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
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
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
        className="lg:hidden relative"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        {/* Overlay for clicking outside */}
        <div
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <Dialog.Panel className="fixed left-1/2 -translate-x-1/2 top-24 z-20 w-[95%] overflow-y-auto bg-black/90 backdrop-blur-sm px-6 pb-6 rounded-3xl shadow-xl">
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-1 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={getLinkWithLang(item.href)}
                    className={`block rounded-full px-4 py-2 text-base font-semibold ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white"
                        : "text-gray-50 hover:bg-gray-800/50"
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
              className="w-full flex items-center justify-center gap-x-1.5 rounded-full bg-indigo-600 p-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChartPieIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Dashboard
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-4 mt-6">
              <UserButton />
            </div>
          </SignedIn>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
