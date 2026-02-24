import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Monitor,
  Building2,
  AlertTriangle,
  Brain,
  Zap,
  Cpu,
  Microchip,
  Trash2,
  CheckCircle2,
  FolderDown,
  ArrowRight,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { useShouldReduceMotion } from "../lib/motion-variants";
import { brandify } from "../lib/brandify";

/* ------------------------------------------------------------------ */
/*  Scroll to hash on mount (React Router doesn't do this by default) */
/* ------------------------------------------------------------------ */
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    // Small delay so the DOM (and any animations) can settle
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);
}

/* ------------------------------------------------------------------ */
/*  Accent colours                                                     */
/* ------------------------------------------------------------------ */
const ACCENT = "#5AC8FA"; // page-level — instructional blue
const ACCENT_MODELS = "#5E5CE6"; // indigo — intelligence
const ACCENT_DRIVER = "#FF9F0A"; // orange — speed
const ACCENT_UNINSTALL = "#98989D"; // gray — neutral
const ACCENT_API = "#FFD60A"; // yellow — value / accessibility

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
type InstallPath = "personal" | "corporate";

const PERSONAL_STEPS = [
  {
    num: "01",
    title: "Download the installer",
    body: "Head to the Download page and grab the latest OwnVoice setup file (.exe). It's a single file, no dependencies required.",
  },
  {
    num: "02",
    title: "Run the installer",
    body: "Double-click the .exe and follow the prompts. The wizard installs OwnVoice to your chosen location in under a minute.",
  },
  {
    num: "03",
    title: "Launch & start dictating",
    body: "Open OwnVoice from your Start menu or desktop shortcut. Everything runs locally — no sign-up, no internet connection needed.",
  },
];

const CORPORATE_STEPS = [
  {
    num: "01",
    title: "Clone the repository",
    body: "If your IT policy blocks .exe downloads, clone the OwnVoice GitHub repository to your local machine using Git.",
  },
  {
    num: "02",
    title: "Run from source",
    body: "Open a terminal in the project folder and run python run.py. This launches OwnVoice directly — no installation step, no admin privileges required.",
  },
  {
    num: "03",
    title: "Launch & start dictating",
    body: "OwnVoice opens in the same way as the installed version. All processing stays local on your device.",
  },
];

const MODELS = [
  {
    name: "Distil-Whisper Large V3",
    badge: "Recommended for English",
    size: "~1.5 GB",
    description:
      "A distilled variant of Whisper Large V3 created by Hugging Face and served via Systran's CTranslate2 format. 49% fewer parameters yet within 1% word-error-rate on English benchmarks — and up to 6x faster than the original. If you only transcribe English, start here.",
  },
  {
    name: "Whisper Large V3 Turbo",
    badge: "Multilingual",
    size: "~1.5 GB",
    description:
      "OpenAI's pruned variant of Whisper Large V3 with only 4 decoder layers instead of 32, served via CTranslate2. Supports 99+ languages while staying compact enough to match Distil-Whisper in size. Choose this when you need to transcribe languages other than English.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function GuidePage() {
  const reduce = useShouldReduceMotion();
  const [installPath, setInstallPath] = useState<InstallPath>("personal");

  const transition = (delay: number) => ({
    duration: reduce ? 0 : 0.7,
    delay: reduce ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  const steps = installPath === "personal" ? PERSONAL_STEPS : CORPORATE_STEPS;

  useScrollToHash();

  return (
    <div className="min-h-screen pt-[52px]">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
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
            <BookOpen size={28} strokeWidth={1.5} />
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
            Getting Started<span style={{ color: ACCENT }}>.</span>
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
            Everything you need to set up <BrandLogo />, download your first
            model, and start transcribing — in under five minutes.
          </motion.p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 1 — INSTALL                                             */}
      {/* ================================================================ */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-[680px] mx-auto">
          {/* Section label */}
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(0.3)}
            className="text-ov-text-muted mb-6"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Installation
          </motion.p>

          {/* Segmented Control */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.35)}
            className="mb-8"
          >
            <div
              className="inline-flex rounded-xl p-1"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              {(
                [
                  { key: "personal" as InstallPath, icon: Monitor, label: "Personal" },
                  { key: "corporate" as InstallPath, icon: Building2, label: "Corporate" },
                ] as const
              ).map((tab) => {
                const active = installPath === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setInstallPath(tab.key)}
                    className="relative flex items-center gap-2 rounded-lg px-5 py-2.5 transition-colors duration-200"
                    style={{
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                      color: active
                        ? "var(--ov-text-primary)"
                        : "var(--ov-text-muted)",
                      background: active
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                    }}
                  >
                    <tab.icon size={16} strokeWidth={1.5} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <p
              className="text-ov-text-muted mt-3"
              style={{ fontSize: "13px", lineHeight: 1.55 }}
            >
              {installPath === "personal"
                ? "For personal machines with no download restrictions."
                : "For managed devices where .exe installs may be blocked."}
            </p>
          </motion.div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={installPath}
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--ov-bg-surface)",
                    border: "1px solid var(--ov-border-subtle)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: ACCENT,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <p
                        className="text-ov-text-primary mb-1.5"
                        style={{ fontSize: "15px", fontWeight: 600 }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="text-ov-text-muted"
                        style={{ fontSize: "13px", lineHeight: 1.6 }}
                      >
                        {brandify(step.body)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Compliance warning — corporate only */}
              {installPath === "corporate" && (
                <motion.div
                  initial={reduce ? {} : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-5 mt-3"
                  style={{
                    background: "rgba(255, 159, 10, 0.06)",
                    border: "1px solid rgba(255, 159, 10, 0.15)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      size={18}
                      strokeWidth={1.5}
                      className="shrink-0 mt-0.5"
                      style={{ color: "#FF9F0A" }}
                    />
                    <div>
                      <p
                        className="mb-1.5"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#FF9F0A",
                        }}
                      >
                        Check with your compliance team first
                      </p>
                      <p
                        className="text-ov-text-muted"
                        style={{ fontSize: "13px", lineHeight: 1.6 }}
                      >
                        Running software from source on a corporate device may
                        violate your company's IT policy. Before proceeding,
                        confirm with your compliance or security team that this
                        approach is permitted. OwnVoice never collects, transmits,
                        or stores your data — everything stays on your machine —
                        but your organization may still require written approval.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ================================================================ */}
      {/*  SECTION 2 — MODELS                                              */}
      {/* ================================================================ */}
      <section className="px-6 py-16 md:py-24" id="models" style={{ scrollMarginTop: "80px" }}>
        <div className="max-w-[680px] mx-auto">
          {/* Section label */}
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <Brain size={20} strokeWidth={1.5} style={{ color: ACCENT_MODELS }} />
              <p
                className="text-ov-text-muted"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Language Models
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.05)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-primary mb-3"
            style={{
              fontSize: "clamp(22px, 3.5vw, 28px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Download once. Transcribe forever
            <span style={{ color: ACCENT_MODELS }}>.</span>
          </motion.h2>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-secondary mb-8"
            style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "520px" }}
          >
            {brandify(
              "OwnVoice ships without bundled models to keep the initial download light. For English-only use, we recommend Distil-Whisper — it's smaller, faster, and just as accurate. Need other languages? Grab Whisper Large V3 Turbo."
            )}
          </motion.p>

          <div className="space-y-3">
            {MODELS.map((model, i) => (
              <motion.div
                key={model.name}
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={transition(0.05 + i * 0.06)}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-xl p-5"
                style={{
                  background: "var(--ov-bg-surface)",
                  border: "1px solid var(--ov-border-subtle)",
                }}
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <p
                    className="text-ov-text-primary"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    {model.name}
                  </p>
                  <span
                    className="rounded-md px-2 py-0.5"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: ACCENT_MODELS,
                      background: `${ACCENT_MODELS}14`,
                      border: `1px solid ${ACCENT_MODELS}28`,
                    }}
                  >
                    {model.badge}
                  </span>
                  <span
                    className="text-ov-text-muted"
                    style={{ fontSize: "12px", marginLeft: "auto" }}
                  >
                    {model.size}
                  </span>
                </div>
                <p
                  className="text-ov-text-muted"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  {model.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Download/delete note */}
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center gap-4 mt-6"
            style={{ fontSize: "13px" }}
          >
            <span className="flex items-center gap-1.5 text-ov-text-muted">
              <FolderDown size={14} strokeWidth={1.5} style={{ color: ACCENT_MODELS }} />
              One-click download
            </span>
            <span
              className="h-3 w-px"
              style={{ background: "var(--ov-border-subtle)" }}
            />
            <span className="flex items-center gap-1.5 text-ov-text-muted">
              <Trash2 size={14} strokeWidth={1.5} style={{ color: ACCENT_UNINSTALL }} />
              One-click delete
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ================================================================ */}
      {/*  SECTION 3 — INFERENCE DRIVER                                    */}
      {/* ================================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <Zap size={20} strokeWidth={1.5} style={{ color: ACCENT_DRIVER }} />
              <p
                className="text-ov-text-muted"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Inference Driver
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.05)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-primary mb-3"
            style={{
              fontSize: "clamp(22px, 3.5vw, 28px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Unlock full speed
            <span style={{ color: ACCENT_DRIVER }}>.</span>
          </motion.h2>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-secondary mb-8"
            style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "520px" }}
          >
            By default, transcription runs on your CPU. If you have an NVIDIA
            GPU, switch to GPU inference for dramatically faster results.
          </motion.p>

          <div className="space-y-3">
            {/* CPU */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.05)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-xl p-5"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Cpu size={18} strokeWidth={1.5} style={{ color: ACCENT_DRIVER }} />
                <p
                  className="text-ov-text-primary"
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  CPU
                </p>
                <span
                  className="flex items-center gap-1 rounded-md px-2 py-0.5 ml-auto"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#30D158",
                    background: "rgba(48, 209, 88, 0.08)",
                    border: "1px solid rgba(48, 209, 88, 0.16)",
                  }}
                >
                  <CheckCircle2 size={12} />
                  Default
                </span>
              </div>
              <p
                className="text-ov-text-muted"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                Works on every machine out of the box. No additional downloads
                required. Great for casual use and light workloads.
              </p>
            </motion.div>

            {/* GPU */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.11)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-xl p-5"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Microchip size={18} strokeWidth={1.5} style={{ color: ACCENT_DRIVER }} />
                <p
                  className="text-ov-text-primary"
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  NVIDIA GPU
                </p>
                <span
                  className="flex items-center gap-1 rounded-md px-2 py-0.5 ml-auto"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: ACCENT_DRIVER,
                    background: `${ACCENT_DRIVER}14`,
                    border: `1px solid ${ACCENT_DRIVER}28`,
                  }}
                >
                  <Zap size={12} />
                  Recommended
                </span>
              </div>
              <p
                className="text-ov-text-muted"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                10–50x faster inference with CUDA acceleration. Click the
                download button inside the app and the driver sets itself up
                automatically. One click to install, one click to remove.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ================================================================ */}
      {/*  SECTION 4 — BRING YOUR OWN API                                  */}
      {/* ================================================================ */}
      <section id="your-own-api" className="px-6 py-16 md:py-24" style={{ scrollMarginTop: "80px" }}>
        <div className="max-w-[680px] mx-auto">
          {/* Section label */}
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <KeyRound size={20} strokeWidth={1.5} style={{ color: ACCENT_API }} />
              <p
                className="text-ov-text-muted"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Bring Your Own API
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.05)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-primary mb-3"
            style={{
              fontSize: "clamp(22px, 3.5vw, 28px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Skip the download
            <span style={{ color: ACCENT_API }}>.</span>
          </motion.h2>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-secondary mb-6"
            style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "520px" }}
          >
            Don't want to run models locally? Connect your own OpenAI API key
            and start transcribing in seconds. Your audio is sent for
            processing and discarded — nothing is stored.
          </motion.p>

          {/* Cost callout */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.14)}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-8"
          >
            <p
              className="text-ov-text-primary"
              style={{
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: ACCENT_API }}>$5</span> of credit.{" "}
              <span className="text-ov-text-secondary" style={{ fontWeight: 400 }}>
                Over 13 hours of transcription.
              </span>
            </p>
            <p
              className="text-ov-text-muted mt-1.5"
              style={{ fontSize: "13px" }}
            >
              That's less than a penny per minute.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              {
                num: "01",
                title: "Create an OpenAI account",
                body: (
                  <>
                    Go to{" "}
                    <a
                      href="https://platform.openai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline hover:text-ov-text-secondary transition-colors duration-200"
                    >
                      platform.openai.com
                      <ExternalLink size={11} strokeWidth={1.5} />
                    </a>{" "}
                    and sign up. No waitlist, no approval needed.
                  </>
                ),
              },
              {
                num: "02",
                title: "Add credit",
                body: (
                  <>
                    Open the <strong className="text-ov-text-secondary" style={{ fontWeight: 500 }}>Billing</strong> page
                    in your OpenAI dashboard and add $5. At $0.006 per minute, that's
                    enough for over 13 hours of continuous transcription.
                  </>
                ),
              },
              {
                num: "03",
                title: "Create an API key",
                body: (
                  <>
                    Navigate to <strong className="text-ov-text-secondary" style={{ fontWeight: 500 }}>API Keys</strong>,
                    click <strong className="text-ov-text-secondary" style={{ fontWeight: 500 }}>Create new secret key</strong>,
                    and copy the key.
                  </>
                ),
              },
              {
                num: "04",
                title: "Paste it into the app",
                body: (
                  <>
                    Open {brandify("OwnVoice")}, go to Settings, paste your API key, and you're
                    done. Transcription starts immediately.
                  </>
                ),
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={transition(0.05 + i * 0.05)}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-xl p-5"
                style={{
                  background: "var(--ov-bg-surface)",
                  border: "1px solid var(--ov-border-subtle)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="shrink-0 mt-0.5"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: ACCENT_API,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      className="text-ov-text-primary mb-1.5"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="text-ov-text-muted"
                      style={{ fontSize: "13px", lineHeight: 1.6 }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Azure alternative note */}
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0.15)}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-xl p-5 mt-4"
            style={{
              background: `${ACCENT_API}08`,
              border: `1px solid ${ACCENT_API}18`,
            }}
          >
            <div className="flex items-start gap-3">
              <Building2
                size={16}
                strokeWidth={1.5}
                className="shrink-0 mt-0.5"
                style={{ color: ACCENT_API }}
              />
              <div>
                <p
                  className="text-ov-text-primary mb-1"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  On a corporate network?
                </p>
                <p
                  className="text-ov-text-muted"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  If your organization blocks OpenAI, you can use{" "}
                  <strong className="text-ov-text-secondary" style={{ fontWeight: 500 }}>
                    Azure OpenAI Service
                  </strong>{" "}
                  instead. It provides the same Whisper model through Microsoft's
                  cloud — same quality, same API format, and typically
                  pre-approved for enterprise environments. {brandify("OwnVoice")} supports
                  both providers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ================================================================ */}
      {/*  SECTION 5 — UNINSTALL                                           */}
      {/* ================================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <Trash2
                size={20}
                strokeWidth={1.5}
                style={{ color: ACCENT_UNINSTALL }}
              />
              <p
                className="text-ov-text-muted"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Uninstall
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.05)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-primary mb-3"
            style={{
              fontSize: "clamp(22px, 3.5vw, 28px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Clean exit
            <span style={{ color: ACCENT_UNINSTALL }}>.</span>
          </motion.h2>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-secondary mb-8"
            style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "520px" }}
          >
            {brandify(
              "OwnVoice leaves nothing behind. Choose whichever method you prefer — the result is the same."
            )}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Traditional */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.05)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-xl p-5"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <p
                className="text-ov-text-primary mb-2"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Add / Remove Programs
              </p>
              <p
                className="text-ov-text-muted"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                {brandify(
                  "Open Windows Settings, find OwnVoice in the app list, and click Uninstall. The standard approach."
                )}
              </p>
            </motion.div>

            {/* Delete folder */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition(0.11)}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-xl p-5"
              style={{
                background: "var(--ov-bg-surface)",
                border: "1px solid var(--ov-border-subtle)",
              }}
            >
              <p
                className="text-ov-text-primary mb-2"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Delete the folder
              </p>
              <p
                className="text-ov-text-muted"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                {brandify(
                  "OwnVoice is fully self-contained. Delete the installation folder and everything is gone — zero leftover files, zero registry entries."
                )}
              </p>
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
          className="max-w-[680px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
            Back to home
          </Link>
          <Link
            to="/download"
            className="inline-flex items-center gap-1.5 transition-colors duration-200"
            style={{ fontSize: "13px", color: ACCENT }}
          >
            Download
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}