import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";

const featured = destinations.slice(0, 4);

const FeaturedDestinations = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Top Picks</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Featured Destinations
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/destination/${dest.id}`}
              className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium glass text-primary-foreground">
                  {dest.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">{dest.title}</h3>
                  <div className="flex items-center gap-1 text-accent">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-medium">{dest.rating}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mb-3">{dest.state}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-primary font-bold text-sm">
                    ₹{dest.price.toLocaleString("en-IN")}
                    <span className="text-muted-foreground font-normal text-xs"> /person</span>
                  </span>
                  <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          View All Destinations <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedDestinations;
