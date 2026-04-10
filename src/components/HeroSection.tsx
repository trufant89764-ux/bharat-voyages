import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-taj-mahal.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/destinations${destination ? `?search=${encodeURIComponent(destination)}` : ""}`);
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Taj Mahal at golden sunrise, India"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-primary-foreground/70 text-sm sm:text-base tracking-[0.3em] uppercase mb-4"
        >
          Discover the Soul of India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          Explore{" "}
          <span className="text-gradient-gold">Bharat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto mb-10"
        >
          From ancient temples to pristine beaches, snow-capped peaks to vibrant festivals —
          embark on a journey through India's timeless wonders.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onSubmit={handleSearch}
          className="glass rounded-2xl p-3 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <div className="flex items-center gap-2 flex-1 px-4 py-2">
            <MapPin size={18} className="text-primary-foreground/60 shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/40 text-sm w-full focus:outline-none"
            />
          </div>
          <div className="hidden sm:block w-px h-8 bg-primary-foreground/20" />
          <div className="flex items-center gap-2 flex-1 px-4 py-2">
            <Calendar size={18} className="text-primary-foreground/60 shrink-0" />
            <input
              type="text"
              placeholder="Select dates"
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/40 text-sm w-full focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="gold-gradient px-8 py-3 rounded-xl text-accent-foreground font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0"
          >
            <Search size={16} />
            Explore
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-8 text-primary-foreground/60 text-xs sm:text-sm"
        >
          <span>🏖️ 50+ Destinations</span>
          <span>⭐ 4.8 Avg Rating</span>
          <span>👥 10K+ Happy Travelers</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
