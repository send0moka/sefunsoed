"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function ContentPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  const content =
    translations[language].content[
      params.slug as keyof (typeof translations)[typeof language]["content"]
    ]

  if (!content) {
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

  return (
    <div className="bg-white px-6 py-32 sm:py-40 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {content.title}
        </h1>
        <div className="mt-6 space-y-6 text-gray-600">
          {"content" in content && Array.isArray(content.content) ? (
            content.content.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : "description" in content ? (
            <p>{content.description}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
