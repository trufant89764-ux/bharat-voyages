import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface BookingRow {
  id: string;
  booking_date: string;
  persons: number;
  total_price: number;
  status: string;
  created_at: string;
  destinations: { title: string; state: string; image: string } | null;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("bookings")
        .select("*, destinations(title, state, image)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setBookings((data as any) || []);
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-10 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <h2 className="font-display text-lg font-semibold text-foreground mb-4">My Bookings</h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No bookings yet</p>
            <Link to="/destinations" className="text-primary font-medium hover:underline">
              Explore destinations →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                {b.destinations?.image && (
                  <img
                    src={b.destinations.image}
                    alt={b.destinations.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground truncate">
                    {b.destinations?.title || "Destination"}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {b.booking_date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {b.persons} people</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {b.destinations?.state}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold text-sm">₹{b.total_price.toLocaleString("en-IN")}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" :
                      b.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
