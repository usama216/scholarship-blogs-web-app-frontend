'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useGetPostsQuery, useGetCategoriesQuery, useGetCountriesQuery } from '@/lib/api/blogApi'

const FeaturedArticles = () => {
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const { data: countriesData } = useGetCountriesQuery(undefined)
  
  const posts = (postsData?.data || postsData || [])
    .filter((p: any) => p.status === 'published')
    .slice(0, 15)
  
  const categories = (categoriesData?.data || categoriesData || [])
  const countries = (countriesData?.data || countriesData || [])
  
  // Duplicate countries for seamless infinite loop
  const duplicatedCountries = [...countries, ...countries, ...countries]
  
  // Carousel state
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  // Card width calculation (including gap)
  const cardWidth = 176 // w-44 (176px) for large screens
  const gap = 12 // gap-3 (12px)
  const cardWidthWithGap = cardWidth + gap
  
  // Calculate scroll amount
  const scrollAmount = cardWidthWithGap * 3 // Scroll 3 cards at a time
  
  // Animation speed (pixels per frame)
  const scrollSpeed = 0.5 // Adjust this to control scroll speed

  const getTextPreview = (html: string, maxLength = 200) => {
    if (!html) return ''
    const text = html.replace(/<[^>]*>/g, '')
    const decoded = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
    const trimmed = decoded.trim()
    return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
  }

  // Handle scroll functions
  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      setIsPaused(true) // Pause auto scroll when manually scrolling
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(() => setIsPaused(false), 3000) // Resume after 3 seconds
    }
  }

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      setIsPaused(true) // Pause auto scroll when manually scrolling
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(() => setIsPaused(false), 3000) // Resume after 3 seconds
    }
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setIsPaused(true) // Pause auto scroll when dragging
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsPaused(false) // Resume auto scroll when mouse leaves
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Resume auto scroll after a delay
    setTimeout(() => setIsPaused(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setIsPaused(true) // Pause auto scroll when touching
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
    // Resume auto scroll after a delay
    setTimeout(() => setIsPaused(false), 2000)
  }

  // Smooth continuous auto scroll
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
      
      // Reset to start when reaching end of first set for seamless loop
      if (carousel.scrollLeft >= oneSetWidth) {
        carousel.scrollLeft = carousel.scrollLeft - oneSetWidth
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [countries.length, isPaused, isDragging, cardWidthWithGap, scrollSpeed])

  // Handle hover to pause/resume
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeaveCarousel = () => {
    setIsPaused(false)
  }

  // Update scroll position
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      setScrollPosition(carousel.scrollLeft)
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [countries.length])

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Countries Carousel */}
        {countries.length > 0 && (
          <div className="mb-8">
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
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable carousel with drag support */}
              <div
                ref={carouselRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'auto' // Use auto for smooth continuous scroll
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={(e) => {
                  handleMouseLeave()
                  handleMouseLeaveCarousel()
                }}
                onMouseEnter={handleMouseEnter}
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
                    onClick={(e) => {
                      if (isDragging) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <div className="border-2 border-neutral-200 hover:border-cta-500 rounded-lg overflow-hidden text-center hover:bg-cta-50 transition-all select-none h-32 sm:h-36 md:h-40 flex flex-col">
                      {/* Flag Image - Full width, top to bottom above name */}
                      <div className="flex-1 flex justify-center items-center w-full flex-shrink-0 overflow-hidden min-h-0">
                        {country.flag_image ? (
                          <img 
                            src={country.flag_image} 
                            alt={`${country.name} flag`} 
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <span className="text-3xl sm:text-4xl">{country.flag_emoji || '🌍'}</span>
                        )}
                      </div>
                      {/* Country Name - Bottom section with fixed height */}
                      <div className="px-2 py-1.5 bg-white border-t border-neutral-200 flex-shrink-0 h-12 sm:h-14 md:h-16 flex items-center justify-center">
                        <h3 
                          className="font-bold text-neutral-900 text-xs sm:text-sm md:text-base w-full leading-tight"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            maxWidth: '100%',
                            lineHeight: '1.2',
                            maxHeight: '2.4em'
                          }}
                          title={country.name}
                        >
                          {country.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Hide scrollbar styles */}
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        )}

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">📂 Browse by Category</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {categories.slice(0, 12).map((category: any, index: number) => (
                <Link key={category.id ?? index} href={`/blog/category/${category.slug}`}>
                  <div className="border-2 border-neutral-200 hover:border-primary-600 hover:bg-primary-50 rounded-lg p-4 transition-all">
                    <h3 className="font-bold text-neutral-900 text-sm">{category.name}</h3>
                    {category.description && (
                      <p className="text-xs text-neutral-600 mt-1">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {categories.length > 12 && (
              <div className="flex justify-center mt-4">
                <Link
                  href="/blog#categories"
                  className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View More
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Scholarships List */}
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Latest Scholarship Opportunities</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="space-y-3 mb-8">
              {posts.map((post: any, index: number) => (
                <Link key={post.id || index} href={`/blog/${post.slug}`}>
                  <div className="border border-neutral-200 hover:border-primary-600 hover:shadow-md rounded-lg p-5 hover:bg-neutral-50 transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-neutral-900 mb-2 hover:text-primary-600">
                          {post.title}
                        </h3>
                        <p className="text-neutral-700 mb-2 text-sm leading-relaxed">
                          {post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content)}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                          <span>📅 {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          {post.category_name && <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">📂 {post.category_name}</span>}
                        </div>
                      </div>
                      {post.featured_image && (
                        <img src={post.featured_image} alt={post.title} className="w-24 h-24 object-cover rounded flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link href="/blog">
                <button className="bg-cta-500 hover:bg-cta-600 text-white px-10 py-3 rounded-lg font-bold text-lg transition-colors">
                  View All Scholarships →
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 border border-neutral-200 rounded-lg">
            <p className="text-neutral-600">No scholarships available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedArticles
