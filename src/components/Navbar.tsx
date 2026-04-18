import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/destinations?category=Festivals", label: "Festivals" },
  { to: "/destinations?category=Craft", label: "Crafts" },
  { to: "/booking", label: "Bookings" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHome ? "glass" : "bg-background/95 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🇮🇳</span>
          <span className="font-display text-xl sm:text-2xl font-bold text-gradient-gold">
            Explore Bharat
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const [linkPath, linkQuery] = link.to.split("?");
            const linkCategory = new URLSearchParams(linkQuery || "").get("category");
            const currentCategory = new URLSearchParams(location.search).get("category");
            const isActive =
              location.pathname === linkPath &&
              (linkCategory ? currentCategory === linkCategory : !currentCategory);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary"
                    : isHome
                    ? "text-white/90"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-body text-sm font-medium px-4 py-2.5 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
              >
                <User size={16} /> Dashboard
              </Link>
              <button
                onClick={signOut}
                className="font-body text-sm font-medium px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="font-body text-sm font-medium px-4 py-2.5 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/destinations"
                className="font-body text-sm font-medium px-5 py-2.5 rounded-full gold-gradient text-accent-foreground hover:opacity-90 transition-opacity"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className={isHome ? "text-white" : "text-foreground"} />
            ) : (
              <Menu className={isHome ? "text-white" : "text-foreground"} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/20"
          >
            <div className="container-custom py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="font-body text-sm font-medium py-2 text-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setOpen(false); }} className="font-body text-sm font-medium py-2 text-left text-muted-foreground hover:text-foreground transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="font-body text-sm font-medium px-5 py-2.5 rounded-full gold-gradient text-accent-foreground text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
