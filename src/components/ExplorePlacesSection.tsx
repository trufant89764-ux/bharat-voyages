import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { useDestinations } from "@/hooks/useDestinations";

// Auto-slide every 3 seconds
const INTERVAL = 3000;
const VISIBLE = 4; // cards visible at once

const ExplorePlacesSection = () => {
  const { destinations, loading } = useDestinations({ pageSize: 16, sortBy: "rating" });
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = destinations.length;

  // Auto slide
  useEffect(() => {
    if (paused || total === 0) return;
    const id = setInterval(() => setStart((s) => (s + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [paused, total]);

  const next = () => setStart((s) => (s + 1) % Math.max(total, 1));
  const prev = () => setStart((s) => (s - 1 + total) % Math.max(total, 1));

  // Pick the visible cards (loops around the array)
  const visibleCards = total === 0 ? [] : Array.from({ length: VISIBLE }, (_, i) => destinations[(start + i) % total]);

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Incredible India</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-2">
              Explore Places
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Iconic experiences from snow-clad peaks to sun-kissed beaches
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={prev} aria-label="Previous" className="w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Next" className="w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleCards.map((dest, i) => (
                <Link
                  key={`${dest.id}-${i}`}
                  to={`/destination/${dest.id}`}
                  className="group relative rounded-2xl overflow-hidden shadow-lg h-[360px]"
                >
                  <SafeImage
                    src={dest.image}
                    alt={dest.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
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

          <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
            <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplorePlacesSection;
