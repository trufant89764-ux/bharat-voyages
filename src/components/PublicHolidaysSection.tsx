import { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

// Major Indian public & festival holidays for 2026 (national + popular regional)
const HOLIDAYS_2026 = [
  { date: "2026-01-01", name: "New Year's Day", type: "Public", region: "Pan India" },
  { date: "2026-01-14", name: "Makar Sankranti / Pongal", type: "Festival", region: "Pan India" },
  { date: "2026-01-26", name: "Republic Day", type: "National", region: "Pan India" },
  { date: "2026-02-15", name: "Vasant Panchami", type: "Festival", region: "North India" },
  { date: "2026-02-17", name: "Maha Shivratri", type: "Festival", region: "Pan India" },
  { date: "2026-03-04", name: "Holi", type: "Festival", region: "Pan India" },
  { date: "2026-03-21", name: "Eid-ul-Fitr", type: "Public", region: "Pan India" },
  { date: "2026-03-27", name: "Good Friday", type: "Public", region: "Pan India" },
  { date: "2026-04-14", name: "Dr. Ambedkar Jayanti", type: "National", region: "Pan India" },
  { date: "2026-04-26", name: "Ram Navami", type: "Festival", region: "Pan India" },
  { date: "2026-05-01", name: "Labour Day", type: "Public", region: "Pan India" },
  { date: "2026-05-31", name: "Buddha Purnima", type: "Festival", region: "Pan India" },
  { date: "2026-06-27", name: "Rath Yatra (Puri)", type: "Festival", region: "Odisha" },
  { date: "2026-08-15", name: "Independence Day", type: "National", region: "Pan India" },
  { date: "2026-08-26", name: "Onam", type: "Festival", region: "Kerala" },
  { date: "2026-09-04", name: "Janmashtami", type: "Festival", region: "Pan India" },
  { date: "2026-09-15", name: "Ganesh Chaturthi", type: "Festival", region: "Maharashtra" },
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "National", region: "Pan India" },
  { date: "2026-10-12", name: "Dussehra", type: "Festival", region: "Pan India" },
  { date: "2026-10-19", name: "Karva Chauth", type: "Festival", region: "North India" },
  { date: "2026-11-08", name: "Diwali", type: "Festival", region: "Pan India" },
  { date: "2026-11-12", name: "Bhai Dooj", type: "Festival", region: "Pan India" },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", type: "Festival", region: "Pan India" },
  { date: "2026-12-25", name: "Christmas", type: "Public", region: "Pan India" },
];

const TYPE_COLORS: Record<string, string> = {
  National: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  Public: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  Festival: "bg-pink-500/15 text-pink-600 border-pink-500/30",
};

const PublicHolidaysSection = () => {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? HOLIDAYS_2026 : HOLIDAYS_2026.filter((h) => h.type === filter)),
    [filter]
  );

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">
            <Calendar size={14} className="inline mr-1" /> Plan Your Trip
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Public Holidays & Festivals 2026
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">
            Time your visit around India's most colourful celebrations and long weekends.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", "National", "Public", "Festival"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                filter === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((h) => (
            <div
              key={h.date + h.name}
              className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{h.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{fmt(h.date)}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${TYPE_COLORS[h.type]}`}>
                  {h.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} /> {h.region}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicHolidaysSection;
