'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CarouselBlock as CarouselBlockProps, Media } from '@/payload-types'

interface CarouselImage {
  image: number | Media
  title?: string | null
  subtitle?: string | null
  alt: string
  id?: string | null
}

export const CarouselBlock: React.FC<
  CarouselBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, images = [], autoPlayInterval = 5, showDots = true, pauseOnHover = true } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(
        () => {
          setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
        },
        (autoPlayInterval || 5) * 1000,
      )
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, images.length, autoPlayInterval])

  // Handle dot click
  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPlaying(false)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPlaying(true)
    }
  }

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex] as CarouselImage

  return (
    <div className="my-16" id={`block-${id}`}>
      <div
        className="relative container w-full h-[40rem] overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          {typeof currentImage.image === 'object' &&
            currentImage.image &&
            'url' in currentImage.image && (
              <Image
                src={currentImage.image.url || ''}
                alt={currentImage.alt || currentImage.image.alt || 'Carousel image'}
                fill
                className="object-cover rounded-2xl transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                priority={currentIndex === 0}
              />
            )}

          {/* Overlay with Title and Subtitle */}
          {(currentImage.title || currentImage.subtitle) && (
            <div className="absolute rounded-b-2xl bottom-0 left-0 right-0 bg-black/50 dark:bg-white/50 backdrop-blur-sm">
              <div className="p-6">
                {currentImage.title && (
                  <h3 className="text-2xl font-bold text-white dark:text-black mb-2">
                    {currentImage.title}
                  </h3>
                )}
                {currentImage.subtitle && (
                  <p className="text-lg text-neutral-200 dark:text-neutral-800">
                    {currentImage.subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading indicator for next images */}
        <div className="absolute top-4 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/30 dark:bg-white/30 rounded-full px-3 py-1 text-sm text-white dark:text-black">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {showDots && images.length > 1 && (
        <div className="absolute left-1/2 mt-4 transform -translate-x-1/2 flex space-x-2">
          {images.map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`size-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-black dark:bg-white scale-110 shadow-lg'
                  : 'bg-black/50 dark:bg-white/50 hover:bg-black/75 dark:hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
