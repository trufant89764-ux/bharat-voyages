import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1920&q=80"
        alt="Indian palace"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
    </div>
    <div className="relative z-10 container-custom text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-5xl font-bold text-white mb-4"
      >
        Ready for Your Next Adventure?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8"
      >
        Let us craft the perfect Indian journey for you. Thousands of travelers trust Explore Bharat.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Start Planning <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
