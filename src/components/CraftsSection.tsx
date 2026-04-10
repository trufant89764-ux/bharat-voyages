import { motion } from "framer-motion";
import { Star, ArrowRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";

const crafts = destinations.filter((d) => d.category === "Craft");

const CraftsSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">
          <Palette size={14} className="inline mr-1" /> Living Heritage
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Craft Trails
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">
          Walk the ancient corridors of India's living art — from Madhubani walls to Pashmina looms.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crafts.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/destination/${dest.id}`}
              className="group flex flex-col sm:flex-row lg:flex-col rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="relative h-48 sm:h-auto sm:w-40 lg:w-full lg:h-48 overflow-hidden shrink-0">
                <img
                  src={dest.image}
                  alt={dest.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{dest.title}</h3>
                    <div className="flex items-center gap-1 text-accent">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs mb-2">{dest.state}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{dest.shortDesc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">
                    ₹{dest.price.toLocaleString("en-IN")}
                    <span className="text-muted-foreground font-normal text-xs"> /person</span>
                  </span>
                  <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

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
