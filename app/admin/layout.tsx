"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import {
  HomeIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/supabase-admin"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Programs", href: "/admin/programs", icon: CalendarIcon },
  { name: "Content", href: "/admin/content", icon: DocumentDuplicateIcon },
  { name: "Media", href: "/admin/media", icon: PhotoIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
  { name: "Profile", href: "/admin/profile", icon: UserCircleIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isLoaded, user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function checkAdminAccess() {
      if (!isLoaded || !isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
        router.push("/")
        return
      }

      try {
        const userRole = await authService.getUserRole(user.primaryEmailAddress.emailAddress)
        if (userRole === "admin") {
          setIsAdmin(true)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [isLoaded, isSignedIn, user, router])

  if (isLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className="lg:hidden fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300"
        style={{ display: sidebarOpen ? "block" : "none" }}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="fixed inset-0 z-50 flex">
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
            <div className="flex justify-between px-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.jpeg"
                  alt="SEF UNSOED"
                  width={40}
                  height={40}
                />
                <span className="font-semibold text-gray-900">Admin Panel</span>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        pathname === item.href
                          ? "text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
                <div className="mt-10 px-3 py-2">
                  <SignOutButton>
                    <button className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50">
                      <ArrowLeftOnRectangleIcon
                        className="mr-3 h-5 w-5 flex-shrink-0 text-red-500"
                        aria-hidden="true"
                      />
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <Link className="flex h-16 shrink-0 items-center" href="/">
            <Image src="/favicon.png" alt="SEF UNSOED" width={40} height={40} />
            <span className="ml-3 font-semibold text-gray-900">
              Admin Panel
            </span>
          </Link>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                          pathname === item.href
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            pathname === item.href
                              ? "text-indigo-500"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <SignOutButton>
                  <button className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-700 hover:bg-red-50">
                    <ArrowLeftOnRectangleIcon
                      className="h-6 w-6 shrink-0 text-red-500"
                      aria-hidden="true"
                    />
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="lg:hidden sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
