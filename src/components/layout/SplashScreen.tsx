import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("wellwork-splash-shown")) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("wellwork-splash-shown", "true");
    }, prefersReducedMotion ? 700 : 1800);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background md:hidden"
        >
          <div className="absolute inset-x-6 top-8 h-px bg-border/70" />
          <div className="absolute inset-x-6 bottom-8 h-px bg-border/70" />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.92, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative mb-6 grid h-24 w-24 place-items-center rounded-lg border border-brand/30 bg-card shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              <motion.span
                initial={prefersReducedMotion ? undefined : { scale: 0.78, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-2 rounded-md border border-border/80"
              />
              <img src={logoMark} alt="Wellwork" className="relative h-16 w-16 object-contain" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.18, duration: 0.4 }}
              className="mb-2 flex items-center text-4xl font-display font-bold text-foreground"
            >
              Well<span className="text-brand">work</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.35, duration: 0.35 }}
              className="text-xs font-medium text-muted-foreground"
            >
              QVT · Prévention RPS
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: 0.3 }}
            className="absolute bottom-[max(3.5rem,env(safe-area-inset-bottom))] w-36"
          >
            <div className="mb-3 text-center text-[10px] font-medium text-muted-foreground">Votre espace bien-être</div>
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 1.25, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
