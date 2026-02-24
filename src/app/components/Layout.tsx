import { useLocation, useOutlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useShouldReduceMotion } from "../lib/motion-variants";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    // Skip scroll-to-top when the URL has a hash fragment (e.g. /#features).
    // The page's own useScrollToHash() hook handles those.
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}

/**
 * FrozenOutlet — captures the current outlet content on mount
 * and never updates, so AnimatePresence can play the exit animation
 * on the *old* page tree while the new one fades in.
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

export function Layout() {
  const location = useLocation();
  const reduce = useShouldReduceMotion();

  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="relative min-h-screen bg-ov-bg-primary">
        <Navbar />
        <AnimatePresence mode="wait">
            <motion.div
            key={location.pathname}
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              willChange: "auto",
              transform: "none" 
            }}
          >
            <FrozenOutlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </SmoothScroll>
  );
}