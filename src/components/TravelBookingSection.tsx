import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Train, Bus, Car, BedDouble, MapPin, Calendar, Users, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TABS = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "trains", label: "Trains", icon: Train },
  { id: "buses", label: "Buses", icon: Bus },
  { id: "cabs", label: "Cabs", icon: Car },
  { id: "stays", label: "Stays", icon: BedDouble },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FARE_TYPES = ["Regular", "Student", "Senior Citizen", "Armed Forces"];

const TravelBookingSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>("flights");
  const [tripType, setTripType] = useState<"oneway" | "round">("oneway");
  const [fareType, setFareType] = useState("Regular");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Goa");
  const [departDate, setDepartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const swap = () => { const t = from; setFrom(to); setTo(t); };

  const showFareTypes = activeTab === "flights" || activeTab === "trains";
  const showClass = activeTab === "flights" || activeTab === "trains";
  const showTripType = activeTab === "flights" || activeTab === "trains" || activeTab === "buses";

  const labels = {
    flights: { from: "From", to: "To", date: "Departure", swap: "Swap cities" },
    trains: { from: "From Station", to: "To Station", date: "Journey Date", swap: "Swap" },
    buses: { from: "From City", to: "To City", date: "Travel Date", swap: "Swap" },
    cabs: { from: "Pickup", to: "Drop", date: "Pickup Date", swap: "Swap" },
    stays: { from: "City", to: "Property Type", date: "Check-in", swap: "Swap" },
  }[activeTab];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background blue + pink */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220_85%_25%)] via-[hsl(280_60%_35%)] to-[hsl(330_75%_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Plan Your Bharat Journey
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Book flights, trains, buses, cabs and stays — all in one place
          </p>
        </motion.div>

        <div className="bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-border/40 bg-gradient-to-r from-blue-50/50 to-pink-50/50 dark:from-blue-950/20 dark:to-pink-950/20">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-pink-500 text-white shadow-lg scale-[1.02]"
                      : "text-foreground/70 hover:bg-white/60 dark:hover:bg-card"
                  }`}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* Trip type + fare type */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                {showTripType ? (
                  <div className="inline-flex rounded-full bg-muted p-1">
                    <button
                      onClick={() => setTripType("oneway")}
                      className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                        tripType === "oneway" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      One Way
                    </button>
                    <button
                      onClick={() => setTripType("round")}
                      className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                        tripType === "round" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      Round Trip
                    </button>
                  </div>
                ) : <span />}

                {showFareTypes && (
                  <div className="flex flex-wrap gap-2">
                    {FARE_TYPES.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFareType(f)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                          fareType === f
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-3 relative">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{labels.from}</label>
                  <div className="flex items-center gap-2 mt-1 px-3 py-3 rounded-xl bg-muted/60 border border-border focus-within:border-primary transition-colors">
                    <MapPin size={16} className="text-primary" />
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="bg-transparent outline-none text-sm text-foreground w-full font-medium"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-1 items-end justify-center pb-1">
                  <button
                    onClick={swap}
                    aria-label={labels.swap}
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary hover:rotate-180 transition-transform duration-300"
                  >
                    <ArrowRightLeft size={14} />
                  </button>
                </div>

                <div className="md:col-span-3">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{labels.to}</label>
                  <div className="flex items-center gap-2 mt-1 px-3 py-3 rounded-xl bg-muted/60 border border-border focus-within:border-primary transition-colors">
                    <MapPin size={16} className="text-pink-500" />
                    <input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="bg-transparent outline-none text-sm text-foreground w-full font-medium"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className={tripType === "round" ? "md:col-span-2" : "md:col-span-3"}>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{labels.date}</label>
                  <div className="flex items-center gap-2 mt-1 px-3 py-3 rounded-xl bg-muted/60 border border-border focus-within:border-primary transition-colors">
                    <Calendar size={16} className="text-primary" />
                    <input
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="bg-transparent outline-none text-sm text-foreground w-full font-medium"
                    />
                  </div>
                </div>

                {tripType === "round" && (
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Return</label>
                    <div className="flex items-center gap-2 mt-1 px-3 py-3 rounded-xl bg-muted/60 border border-border focus-within:border-primary transition-colors">
                      <Calendar size={16} className="text-pink-500" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="bg-transparent outline-none text-sm text-foreground w-full font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-3">
                <div className="md:col-span-3">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Travellers</label>
                  <div className="flex items-center gap-2 mt-1 px-3 py-3 rounded-xl bg-muted/60 border border-border focus-within:border-primary transition-colors">
                    <Users size={16} className="text-primary" />
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={travellers}
                      onChange={(e) => setTravellers(Math.max(1, Number(e.target.value) || 1))}
                      className="bg-transparent outline-none text-sm text-foreground w-full font-medium"
                    />
                  </div>
                </div>

                {showClass && (
                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Class</label>
                    <select
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      className="mt-1 w-full px-3 py-3 rounded-xl bg-muted/60 border border-border text-sm text-foreground font-medium focus:outline-none focus:border-primary"
                    >
                      {activeTab === "trains" ? (
                        <>
                          <option>Sleeper</option>
                          <option>3A</option>
                          <option>2A</option>
                          <option>1A</option>
                        </>
                      ) : (
                        <>
                          <option>Economy</option>
                          <option>Premium Economy</option>
                          <option>Business</option>
                          <option>First Class</option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                <div className={`md:col-span-${showClass ? "6" : "9"} flex items-end`}>
                  <Link
                    to="/destinations"
                    className="w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
                  >
                    Search {TABS.find((t) => t.id === activeTab)?.label}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TravelBookingSection;
