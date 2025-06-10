"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Image from "next/image"

function HomeComponent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const [clipPath, setClipPath] = useState<string>(
    "polygon(100% 10%, 0 0, 0 100%, 100% 100%)"
  )

  useEffect(() => {
    // Set clip path based on window width only after component mounts
    const handleResize = () => {
      setClipPath(
        window.innerWidth < 640
          ? "polygon(100% 4%, 0 0, 0 100%, 100% 100%)"
          : "polygon(100% 10%, 0 0, 0 100%, 100% 100%)"
      )
    }

    // Initial setup
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  // First, create a reusable card component
  const VideoCard = ({
    minutes,
    image,
    title,
    description,
    buttonText,
    href,
  }: {
    minutes: string
    image: string
    title: string
    description: string
    buttonText: string
    href: string
  }) => {
    return (
      <div className="w-full px-4 pb-8 pt-4 transition-all duration-300 hover:bg-black/15 rounded-3xl border border-black/15">
        <div className="relative">
          {/* Play button overlay */}
          <button className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/30 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/50 group">
            <svg
              className="h-8 w-8 text-white transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Duration badge */}
          <div className="absolute bottom-6 left-6 z-10 rounded-lg bg-[#ff8800] px-3 py-1 text-sm font-medium text-white">
            {minutes}
          </div>

          {/* Image */}
          <Image
            src={image}
            alt={title}
            width={1848}
            height={1116}
            className="mb-4 h-48 w-full rounded-3xl object-cover sm:h-60 md:h-72"
          />
        </div>
        <h3 className="mb-2 text-lg font-semibold sm:text-xl">{title}</h3>
        <p className="mb-10 text-gray-600">{description}</p>
        <Link
          href={href}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition duration-300 hover:bg-indigo-500"
        >
          {buttonText}
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="mx-auto mt-10 sm:mt-24 lg:mt-32 max-w-7xl px-6 py-12 sm:py-16 lg:py-24 lg:px-8">
        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end sm:gap-x-6">
          <h1 className="text-[2.12rem] sm:text-5xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-tight text-gray-900">
            {translations[language].home.hero.title}
          </h1>
          <div className="flex flex-col lg:flex-row -space-x-6 mt-1 lg:mt-0 gap-1 lg:gap-0">
            <div className="flex gap-3 items-center">
              <Image
                src="/lamp.svg"
                alt="Lamp"
                width={125}
                height={125}
                className="size-12 sm:size-24 lg:size-32"
              />
              <h1 className="lg:hidden text-[2.12rem] sm:text-6xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-wide text-indigo-500">
                {translations[language].home.hero.subtitle}
              </h1>
            </div>
            <div className="flex gap-3 items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={125}
                height={125}
                className="size-12 sm:size-24 lg:size-32"
              />
              <h1 className="lg:hidden -translate-y-0.5 text-[2.12rem] sm:text-5xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-tight text-gray-900">
                {translations[language].home.hero.place}
              </h1>
              <Image
                src="/lup.svg"
                alt="lup"
                width={80}
                height={80}
                className="lg:hidden size-10 -translate-y-0.5"
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col-reverse lg:flex-row mt-2 lg:mt-8 gap-8 lg:gap-x-8">
          {/* Left Column */}
          <div className="flex flex-col gap-y-6 items-center lg:items-end">
            <div className="w-full lg:w-fit flex flex-row -space-y-4 sm:-space-x-6 sm:space-y-0 items-center sm:items-end">
              <Image
                src="/laptop.png"
                alt="laptop"
                width={600}
                height={300}
                className="absolute -left-2 lg:left-0 bottom-40 lg:bottom-0 lg:relative w-24 sm:w-28 lg:w-32 z-10"
              />
              <Image
                src="/forum.png"
                alt="Forum"
                width={600}
                height={300}
                className="w-full lg:w-auto h-48 lg:h-72 rounded-3xl object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:gap-x-6">
              <Link
                href={getLinkWithLang("/registration")}
                className="w-full sm:w-fit rounded-full bg-indigo-600 px-6 py-3 text-base lg:text-lg font-semibold text-white text-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {translations[language].home.hero.registerButton}
              </Link>
              <Link
                href={getLinkWithLang("/about")}
                className="text-base lg:text-lg font-semibold leading-6 text-gray-900"
              >
                {translations[language].home.hero.learnMore}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h1 className="hidden lg:flex text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-indigo-500">
              {translations[language].home.hero.institution}
            </h1>
            <div className="hidden lg:flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-x-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
                {translations[language].home.hero.place}
              </h1>
              <Image
                src="/lup.svg"
                alt="lup"
                width={80}
                height={80}
                className="w-16 sm:w-20 lg:w-24 h-auto"
              />
            </div>
            <p className="text-base lg:text-lg font-medium text-balance max-w-2xl mx-auto lg:mx-0 lg:leading-8 text-gray-500 lg:text-gray-900">
              {translations[language].home.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-gray-100">
        <div className="pt-10 mx-auto mt-32 max-w-7xl flex flex-col lg:flex-row items-center gap-10 lg:gap-32">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <div className="relative w-fit">
              <h1 className="font-bold text-3xl lg:text-4xl text-center">
                {translations[language].home.features.title}
              </h1>
              <Image
                src="/crown.svg"
                alt="crown"
                width={100}
                height={100}
                className="hidden lg:block absolute -top-9 -right-9 size-12"
              />
              <Image
                src="/z-line.svg"
                alt="zigzag"
                width={1000}
                height={100}
                className="lg:hidden absolute -bottom-7 left-0 w-full h-auto"
              />
            </div>
            <p className="hidden lg:flex font-medium text-lg mt-4">
              {translations[language].home.features.description}
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/feat-1.svg"
              alt="feat-1"
              width={100}
              height={100}
              className="hidden lg:flex w-full h-auto"
            />
            <Image
              src="/feat-1-mb.svg"
              alt="feat-1-mb"
              width={100}
              height={100}
              className="lg:hidden w-full h-auto"
            />
          </div>
        </div>
        <div className="relative mt-10">
          <Image
            src="/bauble.svg"
            alt="bauble"
            width={300}
            height={300}
            className="absolute -top-18 lg:-top-52 left-2 lg:left-10 w-40 lg:w-72 h-auto z-0 -rotate-14 lg:-rotate-2"
          />
          <div
            className="w-full h-auto bg-[#191919] py-25"
            style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)" }}
          >
            <div className="flex flex-col lg:flex-row relative">
              <div className="w-full px-6 lg:px-40 mt-10 z-0">
                <h1 className="font-bold text-2xl lg:text-3xl">
                  {translations[language].home.features.subtitle
                    .split(" ")
                    .map((word, index) => (
                      <span
                        key={index}
                        className={`${
                          index === 3 ? "text-[#f89401]" : "text-white"
                        } `}
                      >
                        {word}{" "}
                      </span>
                    ))}
                </h1>
                <p className="font-medium text-lg mt-4 text-white">
                  {translations[language].home.features.head}
                </p>
                <ul className="text-lg mt-5 mb-10 lg:mb-0 lg:mt-15 ml-5 text-white/50 flex flex-col lg:flex-row lg:gap-10 list-disc">
                  {translations[language].home.features.items.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
              <Image
                src="/feat-2.svg"
                alt="feat-2"
                width={100}
                height={100}
                className="hidden lg:flex absolute right-32 top-1/2 -translate-y-1/2 w-auto h-72 object-contain"
              />
              <Image
                src="/feat-2-mb.svg"
                alt="feat-2-mb"
                width={100}
                height={100}
                className="lg:hidden absolute -top-5 px-4 lg:px-0 lg:right-32 lg:top-1/2 lg:-translate-y-1/2 w-auto lg:h-72 object-contain"
              />
              <button className="cursor-pointer absolute -bottom-[2.2rem] right-[16.5rem] lg:bottom-[5.5rem] lg:right-[240px] bg-[#ff8800] w-[118px] lg:w-[142px] px-4 lg:px-7 py-2 lg:py-3 rounded-lg text-lg font-medium text-white hover:scale-105 hover:text-[#ff8800] hover:bg-white transition-all duration-300">
                {translations[language].home.features.button}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Section */}
      <div className="pt-20 sm:pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            {translations[language].home.learning.title
              .split(" ")
              .map((word, index, array) => (
                <span
                  key={index}
                  className={`${
                    index === array.length - 1 ? "text-blue-500" : ""
                  }`}
                >
                  {word}{" "}
                </span>
              ))}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-[#f6f6f8] rounded-xl shadow-lg p-6 relative">
              <Image
                src="/princess.svg"
                alt={translations[language].home.learning.sections[0]}
                width={100}
                height={100}
                className="w-full h-auto -mt-10"
              />
              <div className="mt-6 sm:mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {translations[language].home.learning.sections[0]}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {translations[language].home.learning.description[0]}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-6 h-full">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-[#f6f6f8] rounded-xl shadow-lg p-6 flex-1"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {translations[language].home.learning.sections[index]}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {translations[language].home.learning.description[index]}
                  </p>
                </div>
              ))}
            </div>

            {/* Card 3 */}
            <div className="bg-[#f6f6f8] rounded-xl shadow-lg p-6 relative">
              <Image
                src="/joey.svg"
                alt="Learning Icon"
                width={100}
                height={100}
                className="w-full h-auto -mt-10"
              />
              <div className="mt-6 sm:mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {translations[language].home.learning.sections[3]}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {translations[language].home.learning.description[3]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Section with Pattern */}
      <div className="relative mt-20 sm:mt-32">
        <Image
          src="/ezpzls.svg"
          alt="Decoration"
          width={100}
          height={100}
          className="absolute -top-10 sm:-top-12 lg:-top-14 left-4 sm:left-8 lg:left-10 w-28 sm:w-32 lg:w-52 h-auto z-10 -rotate-12"
        />
        <div
          className="w-full bg-[#4d74f3] pb-6 pt-12 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10 relative text-white"
          style={{
            clipPath: clipPath,
            backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        >
          <div className="mx-auto pt-10 lg:pt-20 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between lg:mx-40">
              <div className="hidden lg:flex w-[150px]">
                <Image src="/star1.svg" alt="star1" width={35} height={35} />
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {translations[language].home.course.title}
                  </h1>
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    width={230}
                    height={230}
                    className="w-36 lg:w-[230px] h-auto translate-y-1 ml-1"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {translations[language].home.course.subtitle
                    .split(" ")
                    .map((word, index, array) => (
                      <span
                        key={index}
                        className={`${
                          index === array.length - 1
                            ? "text-white"
                            : "text-[#51ff5f]"
                        }`}
                      >
                        {word}{" "}
                      </span>
                    ))}
                </h1>
              </div>
              <Image
                src="/money.svg"
                alt="money"
                width={150}
                height={150}
                className="hidden lg:flex"
              />
            </div>
            <div className="relative rounded-4xl overflow-hidden max-w-7xl mx-auto mt-5 sm:mt-16 lg:mt-20">
              <div
                className="absolute inset-0 rounded-4xl"
                style={{
                  background: "linear-gradient(to bottom, #fff, transparent)",
                  padding: "2px",
                  maskImage: "linear-gradient(black, black)",
                  WebkitMaskImage: "linear-gradient(black, black)",
                }}
              >
                <div className="w-full h-full bg-[#5f83f3] rounded-4xl" />
              </div>
              <div className="relative px-6 lg:px-7 pt-2 lg:pt-0 pb-6 lg:pb-4 grid lg:grid-cols-2 gap-8">
                <Image
                  src="/women.png"
                  alt="women"
                  width={500}
                  height={500}
                  className="w-full lg:h-96"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold ml-3 mb-4">
                    {translations[language].home.course.header}
                  </h3>
                  <ul className="list-disc ml-4 space-y-2">
                    {translations[language].home.course.items.map(
                      (item, index) => (
                        <li key={index} className="text-lg">
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                  <div className="flex mt-4 ml-3 gap-4">
                    <Link
                      href={getLinkWithLang("/registration")}
                      className="bg-white text-black text-lg font-semibold w-40 text-center py-2 rounded-lg"
                    >
                      {translations[language].home.course.button}
                    </Link>
                    <Link
                      href={getLinkWithLang("/about")}
                      className="border border-white text-lg font-semibold w-40 text-center py-2 rounded-lg"
                    >
                      {translations[language].home.course.additional}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 lg:mt-10 mx-4 lg:mx-40">
              <Image src="/grass.svg" alt="grass" width={40} height={40} />
              <Image
                src="/rick.svg"
                alt="rick"
                width={140}
                height={140}
                className="rotate-12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20 px-4 sm:mt-32 sm:px-6 lg:mt-40 lg:px-8">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="relative w-fit px-2 sm:px-0">
            <h2 className="absolute right-0 sm:-right-15 top-4 sm:-top-6 w-fit rotate-7 rounded-lg bg-[#fc4a3e] px-3 py-1.5 font-bold tracking-wider text-white">
              {translations[language].home.night.subtitle}
            </h2>
            <h1 className="mb-8 max-w-96 text-balance sm:text-right text-2xl font-bold sm:mb-12 sm:text-3xl lg:mb-16 lg:text-4xl">
              {translations[language].home.night.title}
            </h1>
          </div>
          <p className="sm:max-w-72 font-medium opacity-55 pl-2 sm:pl-0 pb-10 sm:pb-0">
            {translations[language].home.night.desc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {[0, 1, 2].map((index) => (
            <VideoCard
              key={index}
              minutes={translations[language].home.night.minutes[index]}
              image={`/${["girls", "skeletons", "spongebob"][index]}.png`}
              title={translations[language].home.night.titleItems[index]}
              description={translations[language].home.night.descItems[index]}
              buttonText={translations[language].home.night.button}
              href={getLinkWithLang("/feature1")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  )
}
