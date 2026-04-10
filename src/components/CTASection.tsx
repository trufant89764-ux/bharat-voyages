import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 gold-gradient opacity-90" />
    <div className="relative z-10 container-custom text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-5xl font-bold text-accent-foreground mb-4"
      >
        Ready for Your Next Adventure?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-accent-foreground/80 text-base sm:text-lg max-w-xl mx-auto mb-8"
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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-foreground text-primary font-medium hover:opacity-90 transition-opacity"
        >
          Start Planning <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
