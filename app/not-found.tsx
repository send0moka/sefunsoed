"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { Suspense } from "react"

function NotFoundContent() {
  const { language } = useLanguage()

  return (
    <div className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {translations[language].content.notFound.title}
        </h2>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {translations[language].content.notFound.description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={`/?lang=${language}`}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {translations[language].content.notFound.backToHome}
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