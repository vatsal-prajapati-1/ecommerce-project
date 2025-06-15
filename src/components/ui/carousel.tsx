"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

export interface CarouselBreakpoint {
  [key: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
  };
}

export interface CarouselProps {
  children?: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
  navigation?: boolean;
  pagination?: boolean;
  centeredSlides?: boolean;
  grabCursor?: boolean;
  breakpoints?: CarouselBreakpoint;
  speed?: number;
  className?: string;
  onSlideChange?: (activeIndex: number) => void;
  onReachEnd?: () => void;
  onReachBeginning?: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  loop = false,
  autoplay = false,
  navigation = true,
  pagination = true,
  centeredSlides = false,
  grabCursor = true,
  breakpoints,
  speed = 300,
  className = "",
  onSlideChange,
  onReachEnd,
  onReachBeginning,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] =
    useState(slidesPerView);
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState(spaceBetween);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoplayPaused = useRef(false);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - currentSlidesPerView);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (!breakpoints) return;

      const width = window.innerWidth;
      const sortedBreakpoints = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      for (const breakpoint of sortedBreakpoints) {
        if (width >= breakpoint) {
          const config = breakpoints[breakpoint];
          setCurrentSlidesPerView(config.slidesPerView || slidesPerView);
          setCurrentSpaceBetween(config.spaceBetween || spaceBetween);
          return;
        }
      }

      setCurrentSlidesPerView(slidesPerView);
      setCurrentSpaceBetween(spaceBetween);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints, slidesPerView, spaceBetween]);

  // Update maxIndex when currentSlidesPerView changes
  const currentMaxIndex = Math.max(0, totalSlides - currentSlidesPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay) return;

    const delay = typeof autoplay === "object" ? autoplay.delay : 3000;
    const disableOnInteraction =
      typeof autoplay === "object" ? autoplay.disableOnInteraction : true;

    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);

      autoplayRef.current = setInterval(() => {
        if (!isAutoplayPaused.current && !isDragging) {
          setCurrentIndex((prev) => {
            const nextIndex = prev + 1;
            if (nextIndex > currentMaxIndex) {
              return loop ? 0 : prev;
            }
            return nextIndex;
          });
        }
      }, delay);
    };

    if (!isAutoplayPaused.current || !disableOnInteraction) {
      startAutoplay();
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, currentMaxIndex, loop, isDragging]);

  // Calculate transform
  const getTransform = useCallback(() => {
    if (!wrapperRef.current) return 0;

    const slideWidth = wrapperRef.current.offsetWidth / currentSlidesPerView;
    const offset = currentIndex * (slideWidth + currentSpaceBetween);

    if (centeredSlides && currentSlidesPerView < totalSlides) {
      const centerOffset = (wrapperRef.current.offsetWidth - slideWidth) / 2;
      return centerOffset - offset;
    }

    return -offset;
  }, [
    currentIndex,
    currentSlidesPerView,
    currentSpaceBetween,
    centeredSlides,
    totalSlides,
  ]);

  // Navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;
      if (loop) {
        if (index < 0) newIndex = totalSlides - currentSlidesPerView;
        else if (index > currentMaxIndex) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(index, currentMaxIndex));
      }

      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);

      if (newIndex === 0) onReachBeginning?.();
      if (newIndex === currentMaxIndex) onReachEnd?.();
    },
    [
      isTransitioning,
      loop,
      totalSlides,
      currentSlidesPerView,
      currentMaxIndex,
      onSlideChange,
      onReachBeginning,
      onReachEnd,
    ]
  );

  const goNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Touch/Mouse events
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
    isAutoplayPaused.current = true;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }

    setTranslateX(0);

    // Resume autoplay after interaction
    if (
      autoplay &&
      typeof autoplay === "object" &&
      !autoplay.disableOnInteraction
    ) {
      isAutoplayPaused.current = false;
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    isAutoplayPaused.current = true;
  };

  const handleMouseLeave = () => {
    if (autoplay) {
      isAutoplayPaused.current = false;
    }
  };

  // Handle transition end
  const handleTransitionStart = () => {
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // Ensure currentIndex doesn't exceed bounds when slides change
  useEffect(() => {
    if (currentIndex > currentMaxIndex) {
      setCurrentIndex(Math.max(0, currentMaxIndex));
    }
  }, [currentIndex, currentMaxIndex]);

  const slideWidth = `${100 / currentSlidesPerView}%`;
  const transform = getTransform() + translateX;

  // Calculate pagination dots
  const totalPages = Math.ceil(totalSlides / currentSlidesPerView);
  const currentPage = Math.floor(currentIndex / currentSlidesPerView);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className={`relative w-full h-full ${
          grabCursor && !isDragging ? "cursor-grab" : ""
        } ${isDragging ? "cursor-grabbing" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={wrapperRef}
          className="flex transition-transform ease-out"
          style={{
            transform: `translateX(${transform}px)`,
            transitionDuration: isDragging ? "0ms" : `${speed}ms`,
            gap: `${currentSpaceBetween}px`,
          }}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: slideWidth }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {navigation && totalSlides > currentSlidesPerView && (
        <>
          <button
            onClick={goPrev}
            disabled={!loop && currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={!loop && currentIndex >= currentMaxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * currentSlidesPerView)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentPage === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CarouselSlide: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
};
