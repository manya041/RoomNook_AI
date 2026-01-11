import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Slider = ({ 
  children, 
  title, 
  subtitle, 
  viewAllLink, 
  viewAllText = "View All",
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  className = "",
  showNavigation = true,
  autoSlide = false,
  autoSlideInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsPerView.desktop)
  const sliderRef = useRef(null)
  const intervalRef = useRef(null)

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setItemsPerSlide(itemsPerView.mobile)
      } else if (width < 1024) {
        setItemsPerSlide(itemsPerView.tablet)
      } else {
        setItemsPerSlide(itemsPerView.desktop)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [itemsPerView])

  // Auto slide functionality
  useEffect(() => {
    if (autoSlide && React.Children.count(children) > itemsPerSlide) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => 
          prev >= React.Children.count(children) - itemsPerSlide 
            ? 0 
            : prev + 1
        )
      }, autoSlideInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoSlide, autoSlideInterval, children, itemsPerSlide])

  const totalItems = React.Children.count(children)
  const maxIndex = Math.max(0, totalItems - itemsPerSlide)

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1)
  }

  const goToNext = () => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  if (totalItems === 0) {
    return (
      <div className={`glass-panel p-6 ${className}`}>
        {title && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-ivory">{title}</h2>
              {subtitle && <p className="text-ink-100/70 text-sm mt-1">{subtitle}</p>}
            </div>
          </div>
        )}
        <div className="text-center py-8 text-ink-100/60">
          No items to display
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-panel p-6 ${className}`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-ivory">{title}</h2>
            {subtitle && <p className="text-ink-100/70 text-sm mt-1">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <a 
              href={viewAllLink} 
              className="text-emerald-200 hover:text-emerald-100 text-sm font-medium transition-colors"
            >
              {viewAllText}
            </a>
          )}
        </div>
      )}

      {/* Slider Container */}
      <div className="relative">
        <div 
          ref={sliderRef}
          className="overflow-hidden rounded-xl"
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
              width: `${(totalItems / itemsPerSlide) * 100}%`
            }}
          >
            {React.Children.map(children, (child, index) => (
              <div 
                key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / totalItems}%` }}
              >
                <div className="px-2">
                  {child}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && totalItems > itemsPerSlide && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-ivory rounded-full p-2 shadow-glow transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-ivory rounded-full p-2 shadow-glow transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {totalItems > itemsPerSlide && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-emerald-300 w-6' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Slider
