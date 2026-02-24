import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { CTAButton } from "./CTAButton";
import { Monitor, Github } from "lucide-react";
import { useShouldReduceMotion, blurReveal } from "../lib/motion-variants";

export function FinalCTA() {
  const reduce = useShouldReduceMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasPulsed, setHasPulsed] = useState(false);

  useEffect(() => {
    if (isInView && !hasPulsed) {
      const timer = setTimeout(() => setHasPulsed(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasPulsed]);

  return (
    <section className="px-6 py-[72px] md:py-[120px]">
      <div
        ref={ref}
        className="relative max-w-[980px] mx-auto rounded-[24px] py-20 md:py-24 px-8 text-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(10,132,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(48,209,88,0.05) 0%, transparent 70%),
            var(--ov-bg-surface)
          `,
          border: "1px solid var(--ov-border-subtle)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 40% 30% at 50% 20%, rgba(10,132,255,0.06) 0%, transparent 100%)",
            animation: reduce ? "none" : "cta-breathe 6s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes cta-breathe { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>

        <div className="relative">
          <motion.h2 initial={reduce ? {} : blurReveal.hidden} whileInView={blurReveal.visible} transition={reduce ? { duration: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} className="text-ov-text-primary mb-5" style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
            Take Back Control of Your Voice<span style={{ color: "var(--ov-accent)" }}>.</span>
          </motion.h2>
          <motion.p initial={reduce ? {} : { opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.2 }} className="text-ov-text-secondary mb-12 mx-auto" style={{ fontSize: "17px", lineHeight: 1.55, maxWidth: "600px" }}>
            Free, open-source, and built for people who value their privacy.
          </motion.p>
          <motion.div initial={reduce ? {} : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.2 }} className="flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <motion.div animate={isInView && !hasPulsed && !reduce ? { scale: [1, 1.02, 1] } : {}} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <CTAButton variant="primary" size="large" href="/download" ariaLabel="Download OwnVoice for Windows"><Monitor size={19} />Download for Windows</CTAButton>
              </motion.div>
              <CTAButton variant="secondary" size="large" href="https://github.com" ariaLabel="Explore OwnVoice source code on GitHub"><Github size={19} />Explore on GitHub</CTAButton>
            </div>
            <span className="inline-flex items-center gap-1.5 text-ov-text-muted rounded-full px-3 py-1" style={{ fontSize: "13px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <svg width="12" height="12" viewBox="0 0 814 1000" fill="currentColor" style={{ opacity: 0.6 }}>
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.2-81-105.6-207.4-105.6-328.1 0-192.8 125.3-295.2 248.6-295.2 65.5 0 120.1 43 161.2 43s100.2-45.6 174.5-45.6c28.2 0 129.6 2.6 196.9 99.3zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.2 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.7 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.5-30.4 139.5-71.3z" />
              </svg>
              macOS & iOS coming soon
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}