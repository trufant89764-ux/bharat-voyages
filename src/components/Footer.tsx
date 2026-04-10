import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-display text-xl font-bold text-gradient-gold">Explore Bharat</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover the incredible diversity of India — from ancient temples to pristine beaches,
              majestic mountains to vibrant festivals.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[{ to: "/", label: "Home" }, { to: "/destinations", label: "Destinations" }, { to: "/booking", label: "Bookings" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone size={14} className="text-primary" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail size={14} className="text-primary" /> hello@explorebharat.in
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={14} className="text-primary" /> New Delhi, India
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Newsletter</h4>
            {subscribed ? (
              <p className="text-sm text-primary font-medium">✓ Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg gold-gradient text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Explore Bharat. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "Instagram", "YouTube", "Facebook"].map((s) => (
              <a key={s} href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
