import { useState } from "react";
import { Calendar, MapPin, X } from "lucide-react";

// list of holidays for 2026
const HOLIDAYS = [
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

const typeColor = (t: string) => {
  if (t === "National") return "bg-orange-500/15 text-orange-600 border-orange-500/30";
  if (t === "Public") return "bg-blue-500/15 text-blue-600 border-blue-500/30";
  return "bg-pink-500/15 text-pink-600 border-pink-500/30";
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" });

const PublicHolidaysSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* small teaser card */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
            <Calendar size={22} />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Public Holidays & Festivals 2026
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Plan your trip around India's biggest celebrations and long weekends.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Holidays
          </button>
        </div>
      </div>

      {/* modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-display text-xl font-bold text-foreground">
                Holidays & Festivals 2026
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOLIDAYS.map((h) => (
                  <div
                    key={h.date + h.name}
                    className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{h.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(h.date)}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${typeColor(h.type)}`}>
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
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicHolidaysSection;
