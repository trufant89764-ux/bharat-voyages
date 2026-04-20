import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { useDestinations } from "@/hooks/useDestinations";

const AUTO_INTERVAL = 3000;

const ExplorePlacesSection = () => {
  const { destinations, loading } = useDestinations({ pageSize: 16, sortBy: "rating" });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  // Build a looped list (clone for seamless infinite feel)
  const items = destinations.length > 0 ? [...destinations, ...destinations] : [];

  useEffect(() => {
    if (paused || items.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, items.length]);

  // Scroll on index change
  useEffect(() => {
    const track = trackRef.current;
    if (!track || destinations.length === 0) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // gap
    const maxIndex = destinations.length;
    if (index >= maxIndex) {
      // Reset without animation
      track.style.scrollBehavior = "auto";
      track.scrollLeft = 0;
      setIndex(0);
      requestAnimationFrame(() => {
        if (track) track.style.scrollBehavior = "smooth";
      });
      return;
    }
    track.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, [index, destinations.length]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Incredible India</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-2">
              Explore Places
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Iconic experiences from snow-clad peaks to sun-kissed beaches
            </p>
          </motion.div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-hidden snap-x scroll-smooth"
            >
              {items.map((dest, i) => (
                <Link
                  key={`${dest.id}-${i}`}
                  to={`/destination/${dest.id}`}
                  data-card
                  className="group relative shrink-0 snap-start rounded-2xl overflow-hidden shadow-lg"
                  style={{ width: "calc((100% - 3rem) / 4)", minWidth: "240px", height: "360px" }}
                >
                  <SafeImage
                    src={dest.image}
                    alt={dest.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay (always) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold mb-2 text-white/90">
                      <MapPin size={12} className="text-primary" />
                      <span>{dest.state}</span>
                      <span className="text-white/40">|</span>
                      <span className="text-accent">{dest.category}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold leading-tight">{dest.title}</h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{dest.short_desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Mobile arrows */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-border bg-card text-foreground flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-border bg-card text-foreground flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplorePlacesSection;
