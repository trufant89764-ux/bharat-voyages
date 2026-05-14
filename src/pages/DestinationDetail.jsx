import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Users, ArrowLeft, Check, Send } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import LocationDetails from "@/components/LocationDetails";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      let query = supabase.from("destinations").select("*");
      const { data, error } = uuidRe.test(id) ? await query.eq("id", id).maybeSingle() : await query.ilike("title", id.replace(/-/g, " ")).maybeSingle();
      if (error || !data) {
        setDest(null);
      } else {
        setDest(data);
        const { data: rev } = await supabase.from("reviews").select("*, profiles(name)").eq("destination_id", data.id).order("created_at", { ascending: false });
        setReviews(rev || []);
      }
      setLoading(false);
    };
    load();
  }, [id]);
  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please sign in to leave a review");
      navigate("/auth");
      return;
    }
    if (!dest) return;
    if (!newComment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      destination_id: dest.id,
      rating: newRating,
      comment: newComment.trim()
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Review added!");
      setNewComment("");
      setNewRating(5);
      const { data } = await supabase.from("reviews").select("*, profiles(name)").eq("destination_id", dest.id).order("created_at", { ascending: false });
      setReviews(data || []);
    }
    setSubmitting(false);
  };
  if (loading) {
    return <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading destination…</p>
      </div>;
  }
  if (!dest) {
    return <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Destination not found</h1>
          <Link to="/destinations" className="text-primary underline">Browse all destinations</Link>
        </div>
      </div>;
  }
  const gallery = [dest.image];
  const itinerary = dest.itinerary?.length ? dest.itinerary : ["Day 1: Arrival and exploration"];
  const highlights = dest.highlights?.length ? dest.highlights : ["Scenic beauty", "Local culture"];
  return <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden">
              <SafeImage src={gallery[activeImg] || dest.image} alt={dest.title} width={800} height={600} className="w-full h-72 sm:h-96 object-cover" />
            </motion.div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium gold-gradient text-accent-foreground">{dest.category}</span>
                <div className="flex items-center gap-1 text-accent">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">{dest.rating}</span>
                  <span className="text-muted-foreground text-xs">({dest.reviews_count} reviews)</span>
                </div>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">{dest.title}</h1>
              <p className="flex items-center gap-1 text-muted-foreground text-sm mb-6"><MapPin size={14} /> {dest.state}, India</p>
              <p className="text-muted-foreground leading-relaxed">{dest.description || dest.short_desc}</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h) => <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-secondary shrink-0" /> {h}
                  </div>)}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Itinerary</h3>
              <div className="space-y-3">
                {itinerary.map((step, i) => <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-accent-foreground text-xs font-bold shrink-0">{i + 1}</div>
                    <p className="text-muted-foreground text-sm pt-1">{step}</p>
                  </div>)}
              </div>
            </div>

            {
    /* Reviews Section */
  }
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Reviews</h3>

              <div className="p-4 rounded-xl bg-card border border-border mb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => <button key={star} onClick={() => setNewRating(star)} className="transition-colors">
                        <Star size={18} className={star <= newRating ? "text-accent fill-accent" : "text-muted-foreground"} />
                      </button>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
    type="text"
    placeholder={user ? "Write your review..." : "Sign in to leave a review"}
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
  />
                  <button
    onClick={handleSubmitReview}
    disabled={submitting}
    className="px-4 py-2.5 rounded-xl gold-gradient text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
  >
                    <Send size={16} />
                  </button>
                </div>
              </div>

              {reviews.length > 0 ? <div className="space-y-4">
                  {reviews.map((r) => <div key={r.id} className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{r.profiles?.name || "Traveler"}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} className={star <= r.rating ? "text-accent fill-accent" : "text-muted-foreground"} />)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                    </div>)}
                </div> : <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review!</p>}
            </div>
          </div>

          {
    /* Right: Booking Card */
  }
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
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Clock size={16} className="text-primary" />{itinerary.length} Days / {Math.max(1, itinerary.length - 1)} Nights</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Users size={16} className="text-primary" />Small group (max 12 people)</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin size={16} className="text-primary" />{dest.state}, India</div>
              </div>
              <Link to={`/booking?destination=${dest.id}`} className="block w-full text-center px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Book Now
              </Link>
              <p className="text-center text-muted-foreground text-xs">Free cancellation up to 48 hours before</p>
            </div>
          </div>
        </div>
      </div>
      {dest.lat != null && dest.lng != null && <LocationDetails
    dest={{
      id: dest.id,
      title: dest.title,
      state: dest.state,
      category: dest.category,
      lat: Number(dest.lat),
      lng: Number(dest.lng),
      itineraryDays: itinerary.length
    }}
  />}
    </div>;
};
var stdin_default = DestinationDetail;
export {
  stdin_default as default
};
