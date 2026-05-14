import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HERO_VIDEO = "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4";

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
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/70 text-sm sm:text-base tracking-[0.3em] uppercase mb-4"
        >
          Discover the Soul of India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Explore{" "}
          <span className="text-gradient-gold">Bharat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10"
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
            <MapPin size={18} className="text-white/60 shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="bg-transparent text-white placeholder:text-white/40 text-sm w-full focus:outline-none"
            />
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="flex items-center gap-2 flex-1 px-4 py-2">
            <Calendar size={18} className="text-white/60 shrink-0" />
            <input
              type="text"
              placeholder="Select dates"
              className="bg-transparent text-white placeholder:text-white/40 text-sm w-full focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="gold-gradient px-8 py-3 rounded-xl text-accent-foreground font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0"
          >
            <Search size={16} />
            Explore Now
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-8 text-white/60 text-xs sm:text-sm"
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
