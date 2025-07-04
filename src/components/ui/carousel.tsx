"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
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
  const [realIndex, setRealIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAutoplayPaused = useRef(false);

  const slides = Children.toArray(children);
  const totalSlides = slides.length;
  const actualSlidesPerView =
    typeof currentSlidesPerView === "number" ? currentSlidesPerView : 1;

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

  // Create slides with clones for seamless looping
  const getExtendedSlides = useCallback(() => {
    if (!loop || totalSlides === 0) return slides;

    // Clone first and last slides for seamless looping
    const firstSlide = slides[0];
    const lastSlide = slides[totalSlides - 1];

    return [lastSlide, ...slides, firstSlide];
  }, [slides, loop, totalSlides]);

  const extendedSlides = getExtendedSlides();
  const extendedTotalSlides = extendedSlides.length;

  // Initialize with proper starting position for loop
  useEffect(() => {
    if (loop && totalSlides > 0) {
      // Start at index 1 (first real slide) when loop is enabled
      setCurrentIndex(1);
      setRealIndex(0);
    }
  }, [loop, totalSlides]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay) return;

    const delay =
      typeof autoplay === "object"
        ? (autoplay as { delay: number }).delay
        : 3000;
    const disableOnInteraction =
      typeof autoplay === "object"
        ? (autoplay as { disableOnInteraction?: boolean })
            .disableOnInteraction ?? true
        : true;

    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);

      autoplayRef.current = setInterval(() => {
        if (!isAutoplayPaused.current && !isDragging) {
          goToNext();
        }
      }, delay);
    };

    if (!isAutoplayPaused.current || !disableOnInteraction) {
      startAutoplay();
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, isDragging]);

  // Calculate transform
  const getTransform = useCallback(() => {
    if (!wrapperRef.current) return 0;

    const slideWidth = wrapperRef.current.offsetWidth / actualSlidesPerView;
    const offset = currentIndex * (slideWidth + currentSpaceBetween);

    if (centeredSlides && actualSlidesPerView < totalSlides) {
      const centerOffset = (wrapperRef.current.offsetWidth - slideWidth) / 2;
      return centerOffset - offset;
    }

    return -offset;
  }, [
    currentIndex,
    actualSlidesPerView,
    currentSpaceBetween,
    centeredSlides,
    totalSlides,
  ]);

  // Navigation functions with seamless loop support
  const goToSlide = useCallback(
    (index: number, immediate = false) => {
      if (isTransitioning && !immediate) return;

      let targetIndex = index;

      if (loop) {
        // For loop mode, we work with extended slides (including clones)
        setCurrentIndex(targetIndex);
        setRealIndex(
          (((targetIndex - 1) % totalSlides) + totalSlides) % totalSlides
        );

        if (!immediate) {
          setIsTransitioning(true);
          setTransitionEnabled(true);

          setTimeout(() => {
            // Handle seamless loop transitions
            if (targetIndex === 0) {
              // We're at the cloned last slide, jump to real last slide
              setTransitionEnabled(false);
              setCurrentIndex(totalSlides);
              setRealIndex(totalSlides - 1);
            } else if (targetIndex === extendedTotalSlides - 1) {
              // We're at the cloned first slide, jump to real first slide
              setTransitionEnabled(false);
              setCurrentIndex(1);
              setRealIndex(0);
            }

            setIsTransitioning(false);

            // Re-enable transitions after a brief delay
            setTimeout(() => {
              setTransitionEnabled(true);
            }, 50);
          }, speed);
        }
      } else {
        // Non-loop mode
        const currentMaxIndex = Math.max(0, totalSlides - actualSlidesPerView);
        targetIndex = Math.max(0, Math.min(index, currentMaxIndex));
        setCurrentIndex(targetIndex);
        setRealIndex(targetIndex);

        if (!immediate) {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), speed);
        }
      }

      // Callbacks use real index
      const callbackIndex = loop ? realIndex : targetIndex;
      onSlideChange?.(callbackIndex);
      if (callbackIndex === 0) onReachBeginning?.();
      if (callbackIndex === totalSlides - 1) onReachEnd?.();
    },
    [
      isTransitioning,
      loop,
      totalSlides,
      actualSlidesPerView,
      speed,
      realIndex,
      extendedTotalSlides,
      onSlideChange,
      onReachBeginning,
      onReachEnd,
    ]
  );

  const goToNext = useCallback(() => {
    if (loop) {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= extendedTotalSlides) {
        goToSlide(1); // Jump to first real slide
      } else {
        goToSlide(nextIndex);
      }
    } else {
      const currentMaxIndex = Math.max(0, totalSlides - actualSlidesPerView);
      if (currentIndex < currentMaxIndex) {
        goToSlide(currentIndex + 1);
      }
    }
  }, [
    currentIndex,
    extendedTotalSlides,
    totalSlides,
    actualSlidesPerView,
    loop,
    goToSlide,
  ]);

  const goToPrev = useCallback(() => {
    if (loop) {
      const prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        goToSlide(totalSlides); // Jump to last real slide
      } else {
        goToSlide(prevIndex);
      }
    } else if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, totalSlides, loop, goToSlide]);

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
        goToPrev();
      } else {
        goToNext();
      }
    }

    setTranslateX(0);

    // Resume autoplay after interaction
    if (
      autoplay &&
      typeof autoplay === "object" &&
      !(autoplay as { disableOnInteraction?: boolean }).disableOnInteraction
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
    if (!loop) {
      const currentMaxIndex = Math.max(0, totalSlides - actualSlidesPerView);
      if (currentIndex > currentMaxIndex) {
        setCurrentIndex(Math.max(0, currentMaxIndex));
      }
    }
  }, [currentIndex, totalSlides, actualSlidesPerView, loop]);

  const slideWidth = `${100 / actualSlidesPerView}%`;
  const transform = getTransform() + translateX;

  // Calculate pagination dots
  const totalPages = Math.ceil(totalSlides / actualSlidesPerView);
  const currentPage = loop
    ? Math.floor(realIndex / actualSlidesPerView)
    : Math.floor(currentIndex / actualSlidesPerView);

  // Use extended slides for loop, regular slides for non-loop
  const slidesToRender = loop ? extendedSlides : slides;

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
            transitionDuration:
              isDragging || !transitionEnabled ? "0ms" : `${speed}ms`,
            gap: `${currentSpaceBetween}px`,
          }}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesToRender.map((slide, index) => (
            <div
              key={loop ? `extended-${index}` : index}
              className="flex-shrink-0"
              style={{ width: slideWidth }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {navigation && totalSlides > actualSlidesPerView && (
        <>
          <button
            onClick={goToPrev}
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
            onClick={goToNext}
            disabled={
              !loop &&
              currentIndex >= Math.max(0, totalSlides - actualSlidesPerView)
            }
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
              onClick={() => {
                const targetIndex = loop
                  ? index + 1
                  : index * actualSlidesPerView;
                goToSlide(targetIndex);
              }}
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
