"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function NotFoundContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  return (
    <div className="bg-white px-6 py-32 sm:py-40 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {translations[language].content.notFound.title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {translations[language].content.notFound.description}
        </p>
        <div className="mt-10">
          <Link
            href={getLinkWithLang("/")}
            className="text-sm font-semibold leading-6 text-indigo-600"
          >
            {translations[language].content.notFound.backToHome}{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}