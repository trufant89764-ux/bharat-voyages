import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
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
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80"
          alt="Indian heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/75" />
      </div>

      <div className="relative z-10 container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-display text-xl font-bold text-gradient-gold">Explore Bharat</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Discover the incredible diversity of India — from ancient temples to pristine beaches,
              majestic mountains to vibrant festivals.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }) => (
                <a
                  key={Icon.displayName}
                  href={href}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/destinations", label: "Destinations" },
                { to: "/booking", label: "Bookings" },
                { to: "/auth", label: "Sign In" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={14} className="text-primary" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={14} className="text-primary" /> hello@explorebharat.in
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={14} className="text-primary" /> New Delhi, India
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-display text-sm font-semibold text-white mb-3">Download Our App</h5>
              <div className="flex gap-2">
                <a href="#" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-colors flex items-center gap-1.5">
                  <span>▶</span> Google Play
                </a>
                <a href="#" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-colors flex items-center gap-1.5">
                  <span></span> App Store
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Newsletter</h4>
            {subscribed ? (
              <p className="text-sm text-primary font-medium">✓ Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
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

            <div className="mt-6">
              <h5 className="font-display text-sm font-semibold text-white mb-3">Scan to Explore</h5>
              <div className="w-24 h-24 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://explorebharat.in')] bg-contain bg-center bg-no-repeat" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Explore Bharat. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
