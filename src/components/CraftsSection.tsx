import { Star, ArrowRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import AutoCarousel from "./AutoCarousel";

const crafts = destinations.filter((d) => d.category === "Craft");

const CraftsSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">
          <Palette size={14} className="inline mr-1" /> Living Heritage
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Craft Trails
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">
          Walk the ancient corridors of India's living art — from Madhubani walls to Pashmina looms.
        </p>
      </div>

      <AutoCarousel autoplayInterval={4500}>
        {crafts.map((dest) => (
          <Link
            key={dest.id}
            to={`/destination/${dest.id}`}
            className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={dest.image} alt={dest.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-lg font-semibold text-foreground">{dest.title}</h3>
                <div className="flex items-center gap-1 text-accent">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs">{dest.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-2">{dest.state}</p>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{dest.shortDesc}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold text-sm">
                  ₹{dest.price.toLocaleString("en-IN")}
                  <span className="text-muted-foreground font-normal text-xs"> /person</span>
                </span>
                <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </AutoCarousel>

      <div className="text-center mt-10">
        <Link
          to="/destinations?category=Craft"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent text-accent font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Explore All Craft Trails <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default CraftsSection;
