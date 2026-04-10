import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Users, ArrowLeft, Check } from "lucide-react";
import { destinations } from "@/data/destinations";
import { useState } from "react";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!dest) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Destination not found</h1>
          <Link to="/destinations" className="text-primary underline">Browse all destinations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden">
              <img
                src={dest.gallery[activeImg] || dest.image}
                alt={dest.title}
                width={800}
                height={600}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </motion.div>
            {dest.gallery.length > 1 && (
              <div className="flex gap-3">
                {dest.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" width={80} height={56} />
                  </button>
                ))}
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium gold-gradient text-accent-foreground">
                  {dest.category}
                </span>
                <div className="flex items-center gap-1 text-accent">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">{dest.rating}</span>
                  <span className="text-muted-foreground text-xs">({dest.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">{dest.title}</h1>
              <p className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
                <MapPin size={14} /> {dest.state}, India
              </p>
              <p className="text-muted-foreground leading-relaxed">{dest.description}</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-secondary shrink-0" /> {h}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Itinerary</h3>
              <div className="space-y-3">
                {dest.itinerary.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-accent-foreground text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground text-sm pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border space-y-5">
              <div>
                <span className="text-muted-foreground text-xs">Starting from</span>
                <div className="font-display text-3xl font-bold text-primary">
                  ₹{dest.price.toLocaleString("en-IN")}
                  <span className="text-muted-foreground text-sm font-normal"> /person</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock size={16} className="text-primary" />
                  {dest.itinerary.length} Days / {dest.itinerary.length - 1} Nights
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users size={16} className="text-primary" />
                  Small group (max 12 people)
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-primary" />
                  {dest.state}, India
                </div>
              </div>

              <Link
                to={`/booking?destination=${dest.id}`}
                className="block w-full text-center px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Book Now
              </Link>

              <p className="text-center text-muted-foreground text-xs">Free cancellation up to 48 hours before</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
