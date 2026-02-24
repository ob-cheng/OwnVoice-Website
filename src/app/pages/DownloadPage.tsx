import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Download, Monitor, Laptop, Smartphone, Cpu, Microchip, ArrowRight } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { useShouldReduceMotion } from "../lib/motion-variants";

const ACCENT = "#30D158";

export function DownloadPage() {
  const reduce = useShouldReduceMotion();

  const transition = (delay: number) => ({
    duration: reduce ? 0 : 0.7,
    delay: reduce ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <div className="min-h-screen pt-[52px]">
      {/* ---- Hero / Header ---- */}
      <section className="px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-[680px] mx-auto">
          {/* Back link */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition(0)}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200 mb-10"
              style={{ fontSize: "13px" }}
            >
              <ArrowLeft size={14} strokeWidth={1.6} />
              Back to home
            </Link>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition(0.05)}
            className="mb-4"
            style={{ color: ACCENT }}
          >
            <Download size={28} strokeWidth={1.5} />
          </motion.div>

          {/* Accent bar */}
          <motion.div
            initial={reduce ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={transition(0.1)}
            style={{
              width: "32px",
              height: "3px",
              borderRadius: "2px",
              backgroundColor: ACCENT,
              marginBottom: "20px",
              transformOrigin: "left",
            }}
          />

          {/* Title */}
          <motion.h1
            initial={reduce ? {} : { opacity: 0, filter: "blur(10px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={transition(0.15)}
            className="text-ov-text-primary mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Download<span style={{ color: ACCENT }}>.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.22)}
            className="text-ov-text-secondary"
            style={{
              fontSize: "17px",
              lineHeight: 1.65,
              maxWidth: "480px",
            }}
          >
            Get <BrandLogo /> running on your machine in under a minute.
            Everything stays local — your voice, your data, your control.
          </motion.p>
        </div>
      </section>

      {/* ---- Download Card ---- */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.3)}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--ov-bg-surface)",
              border: "1px solid var(--ov-border-subtle)",
            }}
          >
            {/* ── Windows row ── */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:px-8 md:py-7"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: `${ACCENT}14`,
                  }}
                >
                  <Monitor size={18} strokeWidth={1.5} style={{ color: ACCENT }} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-ov-text-primary"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    Windows
                  </p>
                  <p
                    className="text-ov-text-muted"
                    style={{ fontSize: "13px", lineHeight: 1.4 }}
                  >
                    64-bit &middot; No account required
                  </p>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-2 shrink-0 transition-opacity duration-200"
                style={{
                  background: ACCENT,
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "980px",
                  padding: "8px 20px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <Download size={14} strokeWidth={2} />
                Download
              </a>
            </div>

            {/* divider */}
            <div
              className="mx-6 md:mx-8"
              style={{ height: "1px", background: "var(--ov-border-subtle)" }}
            />

            {/* ── macOS row ── */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:px-8 md:py-7"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Laptop
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: "var(--ov-text-muted)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-ov-text-primary"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    macOS
                  </p>
                  <p
                    className="text-ov-text-muted"
                    style={{ fontSize: "13px", lineHeight: 1.4 }}
                  >
                    Apple Silicon &amp; Intel
                  </p>
                </div>
              </div>
              <span
                className="shrink-0 text-ov-text-muted"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                Coming soon
              </span>
            </div>

            {/* divider */}
            <div
              className="mx-6 md:mx-8"
              style={{ height: "1px", background: "var(--ov-border-subtle)" }}
            />

            {/* ── iOS row ── */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:px-8 md:py-7"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Smartphone
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: "var(--ov-text-muted)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-ov-text-primary"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    iOS
                  </p>
                  <p
                    className="text-ov-text-muted"
                    style={{ fontSize: "13px", lineHeight: 1.4 }}
                  >
                    Available on the App Store
                  </p>
                </div>
              </div>
              <span
                className="shrink-0 text-ov-text-muted"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                Coming soon
              </span>
            </div>
          </motion.div>

          {/* footnote */}
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(0.45)}
            className="text-ov-text-muted mt-5"
            style={{ fontSize: "12px", lineHeight: 1.55 }}
          >
            Installer coming soon — build from source on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ov-text-secondary transition-colors duration-200"
            >
              GitHub
            </a>
            .{" "}
            <Link
              to="/guide"
              className="underline hover:text-ov-text-secondary transition-colors duration-200"
            >
              Read the setup guide
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ---- What You'll Need ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-muted mb-3"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            What you'll need
          </motion.p>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.05)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-secondary mb-8"
            style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "520px" }}
          >
            Requirements depend on how you use the app. Running local models
            needs more hardware. Connecting your own API key works on almost
            anything.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ── Local Models card ── */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.08)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <Cpu
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: ACCENT, flexShrink: 0 }}
                />
                <p
                  className="text-ov-text-primary"
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  Local Models
                </p>
              </div>
              <p
                className="text-ov-text-muted mb-5"
                style={{ fontSize: "13px", lineHeight: 1.55 }}
              >
                Run Whisper on-device. Nothing leaves your machine.
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {[
                  "Windows 10 / 11 (64-bit)",
                  "8 GB RAM (16 GB recommended)",
                  "4-core CPU (8-core recommended)",
                  "~4 GB disk space",
                  "NVIDIA GPU with CUDA (optional)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-ov-text-secondary"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    <span
                      className="shrink-0 mt-[7px]"
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: ACCENT,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── API Mode card ── */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.16)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <Microchip
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: ACCENT, flexShrink: 0 }}
                />
                <p
                  className="text-ov-text-primary"
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  Your Own API
                </p>
              </div>
              <p
                className="text-ov-text-muted mb-5"
                style={{ fontSize: "13px", lineHeight: 1.55 }}
              >
                Bring your own key. The app is just the interface.{" "}
                <Link
                  to="/guide#your-own-api"
                  className="inline-flex items-center gap-1 underline hover:text-ov-text-secondary transition-colors duration-200"
                  style={{ color: ACCENT }}
                >
                  Learn how
                  <ArrowRight size={11} strokeWidth={1.5} />
                </Link>
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {[
                  "Windows 10 / 11 (64-bit)",
                  "4 GB RAM",
                  "Any modern dual-core CPU",
                  "~200 MB disk space",
                  "Internet connection",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-ov-text-secondary"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    <span
                      className="shrink-0 mt-[7px]"
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: ACCENT,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      <section className="px-6 py-14 md:py-20">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition(0)}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[680px] mx-auto flex items-center justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
            Back to home
          </Link>
        </motion.div>
      </section>
    </div>
  );
}