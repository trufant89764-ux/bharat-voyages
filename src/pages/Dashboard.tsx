import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, LogOut, User, Camera, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logger from "@/lib/logger";

interface BookingRow {
  id: string;
  booking_date: string;
  persons: number;
  total_price: number;
  status: string;
  created_at: string;
  destinations: { title: string; state: string; image: string } | null;
}

interface Profile {
  name: string;
  avatar_url: string | null;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "profile">("bookings");

  // Profile state
  const [profile, setProfile] = useState<Profile>({ name: "", avatar_url: null });
  const [profileLoading, setProfileLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      logger.request("GET", "bookings", { user_id: user.id });
      const { data: bData } = await supabase
        .from("bookings")
        .select("*, destinations(title, state, image)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setBookings((bData as any) || []);
      logger.success("GET", "bookings", bData?.length);

      logger.request("GET", "profiles", { user_id: user.id });
      const { data: pData } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("user_id", user.id)
        .single();
      if (pData) setProfile(pData as Profile);
      logger.success("GET", "profiles");

      setLoading(false);
    };
    fetchAll();
  }, [user]);

  const handleProfileSave = async () => {
    if (!user) return;
    setSaving(true);
    logger.request("UPDATE", "profiles", { name: profile.name });

    const { error } = await supabase
      .from("profiles")
      .update({ name: profile.name, avatar_url: profile.avatar_url })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
      logger.error("UPDATE", "profiles", error.message);
    } else {
      toast.success("Profile updated!");
      logger.success("UPDATE", "profiles");
    }
    setSaving(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-10 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["bookings", "profile"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === t ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              {t === "bookings" ? "My Bookings" : "Edit Profile"}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={24} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">Avatar URL</label>
                <input type="url" value={profile.avatar_url || ""} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value || null })} placeholder="https://example.com/photo.jpg" className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1">Display Name</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1">Email</label>
              <input type="email" value={user?.email || ""} disabled className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-muted-foreground cursor-not-allowed" />
            </div>

            <button onClick={handleProfileSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </motion.div>
        )}

        {tab === "bookings" && (
          <>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Link to="/destinations" className="text-primary font-medium hover:underline">Explore destinations →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                    {b.destinations?.image && (
                      <img src={b.destinations.image} alt={b.destinations.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">{b.destinations?.title || "Destination"}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {b.booking_date}</span>
                        <span className="flex items-center gap-1"><User size={12} /> {b.persons} people</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {b.destinations?.state}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary font-bold text-sm">₹{b.total_price.toLocaleString("en-IN")}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
