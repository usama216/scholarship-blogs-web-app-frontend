'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function CountriesCarousel({ countries }: { countries: any[] }) {
  const duplicatedCountries = [...countries, ...countries, ...countries]
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const cardWidth = 176
  const gap = 12
  const cardWidthWithGap = cardWidth + gap
  const scrollAmount = cardWidthWithGap * 3
  const scrollSpeed = 0.5

  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      setIsPaused(true)
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setTimeout(() => setIsPaused(false), 3000)
    }
  }

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      setIsPaused(true)
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(() => setIsPaused(false), 3000)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsPaused(false)
  }

  const handleMouseEnter = () => setIsPaused(true)

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 2000)
  }

  useEffect(() => {
    if (!carouselRef.current || countries.length === 0 || isPaused || isDragging) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return
    }

    const carousel = carouselRef.current
    const oneSetWidth = countries.length * cardWidthWithGap

    const animate = () => {
      if (!carousel || isPaused || isDragging) return
      carousel.scrollLeft += scrollSpeed
      if (carousel.scrollLeft >= oneSetWidth) {
        carousel.scrollLeft = carousel.scrollLeft - oneSetWidth
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [countries.length, isPaused, isDragging])

  if (countries.length === 0) return null

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-neutral-900">🌍 Browse by Country</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeftHandler}
            className="p-2 rounded-full bg-white border-2 border-neutral-300 hover:border-cta-500 hover:bg-cta-50 transition-all shadow-sm"
            aria-label="Previous countries"
          >
            <FaChevronLeft className="text-neutral-700" />
          </button>
          <button
            onClick={scrollRightHandler}
            className="p-2 rounded-full bg-white border-2 border-neutral-300 hover:border-cta-500 hover:bg-cta-50 transition-all shadow-sm"
            aria-label="Next countries"
          >
            <FaChevronRight className="text-neutral-700" />
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {duplicatedCountries.map((country: any, index: number) => (
            <Link
              key={`${country.id || index}-${Math.floor(index / countries.length)}`}
              href={`/blog/country/${country.slug}`}
              className="flex-shrink-0 w-32 sm:w-36 md:w-40 lg:w-44 block"
              onClick={(e) => isDragging && e.preventDefault()}
            >
              <div className="border-2 border-neutral-200 hover:border-cta-500 rounded-lg overflow-hidden text-center hover:bg-cta-50 transition-all select-none h-32 sm:h-36 md:h-40 flex flex-col">
                <div className="flex-1 flex justify-center items-center w-full overflow-hidden min-h-0">
                  {country.flag_image ? (
                    <img src={country.flag_image} alt={`${country.name} flag`} className="w-full h-full object-cover" draggable={false} />
                  ) : (
                    <span className="text-3xl sm:text-4xl">{country.flag_emoji || '🌍'}</span>
                  )}
                </div>
                <div className="px-2 py-1.5 bg-white border-t border-neutral-200 flex-shrink-0 h-12 sm:h-14 md:h-16 flex items-center justify-center">
                  <h3 className="font-bold text-neutral-900 text-xs sm:text-sm md:text-base w-full leading-tight line-clamp-2" title={country.name}>
                    {country.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
