import { useEffect } from "react";
import { useLocation } from "react-router";
import { HeroSection } from "../components/HeroSection";
import { StaggerText } from "../components/StaggerText";
import { StatCards } from "../components/StatCards";
import { Declaration } from "../components/Declaration";
import { LocalModeSection } from "../components/LocalModeSection";
import { AgenticSection } from "../components/AgenticSection";
import { TransparencySection } from "../components/TransparencySection";
import { ComparisonTable } from "../components/ComparisonTable";
import { FounderSection } from "../components/FounderSection";
import { FinalCTA } from "../components/FinalCTA";

/* Scroll to hash on mount — same pattern as GuidePage */
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);
}

function SectionDivider() {
  return (
    <div className="max-w-[980px] mx-auto px-6">
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, var(--ov-border-subtle) 20%, var(--ov-border-subtle) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function HomePage() {
  useScrollToHash();

  return (
    <>
      <HeroSection />
      <StaggerText
        id="reality"
        title="Every Word You Speak Goes Somewhere."
        lines={[
          "Most AI dictation apps send your voice to the cloud.",
          "Your meetings. Your ideas. Your private conversations.",
          "Stored. Processed. Logged.",
          "You don't know where. You don't know for how long.",
        ]}
      />
      <SectionDivider />
      <StatCards />
      <Declaration />
      <SectionDivider />
      <LocalModeSection />
      <SectionDivider />
      <AgenticSection />
      <SectionDivider />
      <TransparencySection />
      <SectionDivider />
      <ComparisonTable />
      <SectionDivider />
      <FounderSection />
      <FinalCTA />
    </>
  );
}
