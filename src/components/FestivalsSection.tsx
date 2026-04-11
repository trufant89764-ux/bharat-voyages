import { motion } from "framer-motion";
import { Star, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import AutoCarousel from "./AutoCarousel";

const festivals = destinations.filter((d) => d.category === "Festivals");

const FestivalsSection = () => (
  <section className="section-padding bg-card">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">
          <Calendar size={14} className="inline mr-1" /> Celebrate India
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Festivals & Events
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">
          Immerse yourself in India's vibrant festivals — from Holi's kaleidoscope of colors to Diwali's million lamps.
        </p>
      </motion.div>

      <AutoCarousel autoplayInterval={3500}>
        {festivals.map((dest) => (
          <Link
            key={dest.id}
            to={`/destination/${dest.id}`}
            className="group block rounded-2xl overflow-hidden bg-background border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display text-lg font-semibold text-white">{dest.title}</h3>
                <p className="text-white/70 text-xs">{dest.state}</p>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-xs text-white">
                <Star size={10} fill="currentColor" className="text-accent" />
                {dest.rating}
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{dest.shortDesc}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold text-sm">
                  ₹{dest.price.toLocaleString("en-IN")}
                  <span className="text-muted-foreground font-normal text-xs"> /person</span>
                </span>
                <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </AutoCarousel>

      <div className="text-center mt-10">
        <Link
          to="/destinations?category=Festivals"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          View All Festivals <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default FestivalsSection;
