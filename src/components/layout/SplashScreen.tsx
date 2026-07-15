import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/brand/wellwork-logo-mark.jpg";

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if we've already shown the splash screen this session
    const hasSeenSplash = sessionStorage.getItem("wellwork-splash-shown");
    if (hasSeenSplash) {
      setShow(false);
      return;
    }
    
    // Hide after animation finishes (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("wellwork-splash-shown", "true");
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background md:hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.15) 0%, transparent 60%)" }} />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10"
          >
            <motion.img 
              src={logoMark} 
              alt="Wellwork Logo" 
              className="w-24 h-24 object-contain mb-5 drop-shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-display font-bold text-foreground mb-1 tracking-tight flex items-center gap-0.5"
            >
              Well<span className="text-brand">work</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-medium"
            >
              QVT · Prévention RPS
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-16 w-48 h-1.5 bg-muted rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full gradient-brand rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
