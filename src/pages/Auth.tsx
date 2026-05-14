import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset link sent! Check your email.");
      }
      setLoading(false);
      return;
    }

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } else {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check your email to verify.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-card border border-border"
      >
        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
          {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          {mode === "login" ? "Sign in to manage your bookings" : mode === "signup" ? "Join Explore Bharat today" : "Enter your email to receive a reset link"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          {mode !== "forgot" && (
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-11 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          {mode === "login" && (
            <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          )}

          <button type="submit" disabled={loading} className="w-full px-6 py-3.5 rounded-xl gold-gradient text-accent-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "forgot" ? (
            <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline flex items-center gap-1 mx-auto">
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          ) : (
            <>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-medium hover:underline">
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
