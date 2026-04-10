import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, CreditCard, Check, ArrowLeft } from "lucide-react";
import { destinations } from "@/data/destinations";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const destId = searchParams.get("destination");
  const dest = destId ? destinations.find((d) => d.id === destId) : null;

  const [selectedDest, setSelectedDest] = useState(destId || "");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const activeDest = destinations.find((d) => d.id === selectedDest);
  const totalPrice = activeDest ? activeDest.price * people : 0;

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed && activeDest) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center p-8 rounded-2xl bg-card border border-border"
        >
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-accent-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your trip to <strong>{activeDest.title}</strong> for {people} people on {date} is confirmed.
          </p>
          <p className="font-display text-2xl font-bold text-primary mb-6">
            ₹{totalPrice.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground text-xs mb-6">
            Booking ID: EB-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-10 max-w-2xl">
        <Link to="/destinations" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Destinations
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Book Your Trip</h1>

        {/* Step indicators */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s ? "gold-gradient text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {s === 1 ? "Details" : s === 2 ? "Review" : "Payment"}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Destination</label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} — ₹{d.price.toLocaleString("en-IN")}/person
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Travel Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Number of Travelers</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  className="w-10 h-10 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="font-display text-xl font-bold text-foreground w-8 text-center">{people}</span>
                <button
                  onClick={() => setPeople(Math.min(12, people + 1))}
                  className="w-10 h-10 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {activeDest && (
              <div className="p-4 rounded-xl bg-muted">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">₹{activeDest.price.toLocaleString("en-IN")} × {people} travelers</span>
                  <span className="font-bold text-foreground">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDest || !date}
              className="w-full px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && activeDest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Destination</span><span className="text-foreground font-medium">{activeDest.title}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">{date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Travelers</span><span className="text-foreground font-medium">{people}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="text-foreground font-medium">{activeDest.itinerary.length} Days</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary text-lg">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 px-6 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Back
              </button>
              <button onClick={() => setStep(3)} className="flex-1 px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && activeDest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <CreditCard size={20} className="text-primary" /> Payment Details
              </h3>
              <p className="text-muted-foreground text-xs">This is a demo payment form — no real charges.</p>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <p className="text-primary font-bold text-lg text-right">Total: ₹{totalPrice.toLocaleString("en-IN")}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 px-6 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Back
              </button>
              <button onClick={handleConfirm} className="flex-1 px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Confirm & Pay
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Booking;
