import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AutoCarouselProps {
  children: ReactNode[];
  autoplayInterval?: number;
}

const AutoCarousel = ({ children, autoplayInterval = 3000 }: AutoCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isPaused = useRef(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth || el.clientWidth * 0.3;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  // Pause autoplay on hover
  const handleMouseEnter = () => { isPaused.current = true; };
  const handleMouseLeave = () => { isPaused.current = false; };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 5;
      if (atEnd) {
        // Smooth scroll back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth || el.clientWidth * 0.3;
        el.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplayInterval]);

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, i) => (
          <div key={i} className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%]">
            {child}
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>
      )}
    </div>
  );
};

export default AutoCarousel;
