"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  totalSlides: number;
  registerSlide: (id: string) => number;
  unregisterSlide: (id: string) => void;
  isDragging: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  showDragIndicator?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      loop = false,
      showDragIndicator = true,
      className,
      children,
      "aria-label": ariaLabel = "Featured items carousel",
      ...props
    },
    ref
  ) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [hasHover, setHasHover] = React.useState(false);
    const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number } | null>(null);

    // Slide registry for accurate index counting
    const slidesMapRef = React.useRef<string[]>([]);
    const [totalSlides, setTotalSlides] = React.useState(0);

    const registerSlide = React.useCallback((id: string) => {
      if (!slidesMapRef.current.includes(id)) {
        slidesMapRef.current.push(id);
        setTotalSlides(slidesMapRef.current.length);
      }
      return slidesMapRef.current.indexOf(id);
    }, []);

    const unregisterSlide = React.useCallback((id: string) => {
      slidesMapRef.current = slidesMapRef.current.filter((item) => item !== id);
      setTotalSlides(slidesMapRef.current.length);
    }, []);

    // Sync scroll buttons & active index
    const updateScrollState = React.useCallback(() => {
      const container = carouselRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = Math.max(0, scrollWidth - clientWidth);

      setCanScrollPrev(loop || scrollLeft > 8);
      setCanScrollNext(loop || scrollLeft < maxScroll - 8);

      // Determine active slide by item offsets
      const slideNodes = container.querySelectorAll<HTMLElement>('[role="group"][aria-roledescription="slide"]');
      const items = slideNodes.length > 0 ? Array.from(slideNodes) : (Array.from(container.children) as HTMLElement[]);
      if (items.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const containerCenter = scrollLeft + clientWidth / 2;

        items.forEach((item, idx) => {
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const diff = Math.abs(containerCenter - itemCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        setSelectedIndex(closestIndex);
      }
    }, [loop]);

    React.useEffect(() => {
      const container = carouselRef.current;
      if (!container) return;

      updateScrollState();

      let timeoutId: ReturnType<typeof setTimeout>;
      const onScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateScrollState, 50);
      };

      container.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateScrollState);

      return () => {
        clearTimeout(timeoutId);
        container.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateScrollState);
      };
    }, [updateScrollState, totalSlides]);

    const scrollTo = React.useCallback(
      (index: number) => {
        const container = carouselRef.current;
        if (!container) return;

        const slideNodes = container.querySelectorAll<HTMLElement>('[role="group"][aria-roledescription="slide"]');
        const items = slideNodes.length > 0 ? Array.from(slideNodes) : (Array.from(container.children) as HTMLElement[]);
        if (index >= 0 && index < items.length) {
          const target = items[index];
          target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });
        }
      },
      []
    );

    const scrollPrev = React.useCallback(() => {
      const container = carouselRef.current;
      const slideNodes = container ? container.querySelectorAll<HTMLElement>('[role="group"][aria-roledescription="slide"]') : [];
      const count = slideNodes.length > 0 ? slideNodes.length : (slidesMapRef.current.length || totalSlides);

      if (selectedIndex > 0) {
        scrollTo(selectedIndex - 1);
      } else if (loop && count > 0) {
        scrollTo(count - 1);
      }
    }, [selectedIndex, loop, totalSlides, scrollTo]);

    const scrollNext = React.useCallback(() => {
      const container = carouselRef.current;
      const slideNodes = container ? container.querySelectorAll<HTMLElement>('[role="group"][aria-roledescription="slide"]') : [];
      const count = slideNodes.length > 0 ? slideNodes.length : (slidesMapRef.current.length || totalSlides);

      if (selectedIndex < count - 1) {
        scrollTo(selectedIndex + 1);
      } else if (loop && count > 0) {
        scrollTo(0);
      }
    }, [selectedIndex, loop, totalSlides, scrollTo]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const container = carouselRef.current;
      const slideNodes = container ? container.querySelectorAll<HTMLElement>('[role="group"][aria-roledescription="slide"]') : [];
      const count = slideNodes.length > 0 ? slideNodes.length : (slidesMapRef.current.length || totalSlides);

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        if (count > 0) scrollTo(count - 1);
      }
    };

    // Pointer Drag with Momentum
    const dragDataRef = React.useRef({
      startX: 0,
      startScrollLeft: 0,
      startTime: 0,
      lastX: 0,
      lastTime: 0,
      hasDragged: false,
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      // Only drag with primary mouse button
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const container = carouselRef.current;
      if (!container) return;

      dragDataRef.current = {
        startX: e.clientX,
        startScrollLeft: container.scrollLeft,
        startTime: performance.now(),
        lastX: e.clientX,
        lastTime: performance.now(),
        hasDragged: false,
      };

      setIsDragging(true);
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const container = carouselRef.current;
      if (!container) return;

      // Update cursor position for floating "Drag" label
      const rect = container.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      if (!isDragging) return;

      const deltaX = e.clientX - dragDataRef.current.startX;
      if (Math.abs(deltaX) > 4) {
        dragDataRef.current.hasDragged = true;
      }

      container.scrollLeft = dragDataRef.current.startScrollLeft - deltaX;

      dragDataRef.current.lastX = e.clientX;
      dragDataRef.current.lastTime = performance.now();
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setIsDragging(false);

      const container = carouselRef.current;
      if (!container) return;

      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Element may have lost capture
      }

      const { hasDragged, startTime, startX, lastTime, lastX } = dragDataRef.current;
      if (!hasDragged) return;

      // Calculate drag velocity (px/ms) for momentum flick
      const dt = lastTime - startTime;
      const dx = lastX - startX;
      const velocity = dt > 0 ? dx / dt : 0;

      if (Math.abs(velocity) > 0.45) {
        if (velocity < 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
      } else {
        updateScrollState();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          totalSlides,
          registerSlide,
          unregisterSlide,
          isDragging,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setHasHover(true)}
          onMouseLeave={() => {
            setHasHover(false);
            setCursorPos(null);
          }}
          className={cn("relative w-full focus-visible:outline-none", className)}
          {...props}
        >
          {/* Live region announcement for screen readers */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {totalSlides > 0 ? `Slide ${selectedIndex + 1} of ${totalSlides}` : "Loading slides"}
          </div>

          {/* Floating Drag cursor indicator for desktop pointer */}
          {showDragIndicator && hasHover && cursorPos && (
            <div
              style={{
                transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -120%)`,
              }}
              className={cn(
                "pointer-events-none absolute z-30 hidden md:flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase transition-opacity duration-150 shadow-glass",
                isDragging
                  ? "bg-saffron text-night-1 scale-105"
                  : "bg-night-1/90 text-mint border border-white/20 backdrop-blur-md"
              )}
            >
              <MoveHorizontal className="h-3 w-3" />
              <span>{isDragging ? "Dragging" : "Drag"}</span>
            </div>
          )}

          {/* Scroll Content Viewport Container */}
          <div
            ref={carouselRef}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
              "flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none select-none",
              isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth",
              "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 rounded-2xl"
            )}
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex gap-4 md:gap-6 w-full", className)} {...props} />;
  }
);
CarouselContent.displayName = "CarouselContent";

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, id: propId, children, ...props }, ref) => {
    const autoId = React.useId();
    const id = propId || autoId;
    const { registerSlide, unregisterSlide, selectedIndex } = useCarousel();
    const [slideIndex, setSlideIndex] = React.useState(0);

    React.useEffect(() => {
      const idx = registerSlide(id);
      setSlideIndex(idx);
      return () => unregisterSlide(id);
    }, [id, registerSlide, unregisterSlide]);

    const isActive = selectedIndex === slideIndex;

    return (
      <div
        ref={ref}
        id={id}
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${slideIndex + 1}`}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full snap-start transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-85 hover:opacity-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CarouselItem.displayName = "CarouselItem";

export interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          "inline-flex h-11 w-11 touch-target items-center justify-center rounded-full border border-white/15 bg-night-2/80 text-night-text backdrop-blur-md transition-all duration-200",
          "hover:border-saffron/40 hover:bg-night-3 hover:text-saffron active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          "disabled:opacity-30 disabled:pointer-events-none disabled:hover:text-night-text",
          className
        )}
        {...props}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          "inline-flex h-11 w-11 touch-target items-center justify-center rounded-full border border-white/15 bg-night-2/80 text-night-text backdrop-blur-md transition-all duration-200",
          "hover:border-saffron/40 hover:bg-night-3 hover:text-saffron active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          "disabled:opacity-30 disabled:pointer-events-none disabled:hover:text-night-text",
          className
        )}
        {...props}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { totalSlides, selectedIndex, scrollTo } = useCarousel();

    if (totalSlides <= 1) return null;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Carousel pagination"
        className={cn("flex items-center justify-center gap-2 py-2", className)}
        {...props}
      >
        {Array.from({ length: totalSlides }).map((_, i) => {
          const isActive = i === selectedIndex;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                isActive
                  ? "w-8 bg-saffron shadow-sm"
                  : "w-2.5 bg-white/25 hover:bg-white/40"
              )}
            />
          );
        })}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";
