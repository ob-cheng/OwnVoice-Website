import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";
import { useShouldReduceMotion } from "../lib/motion-variants";

const lines = [
  ["Speech", "is", "a", "fundamental", "human", "right."],
  ["Your", "words", "are", "yours", "first."],
  ["Privacy", "should", "not", "be", "optional."],
  ["You", "deserve", "a", "choice."],
];

function ScrollWord({
  word,
  progressIndex,
  totalWords,
  scrollProgress,
}: {
  word: string;
  progressIndex: number;
  totalWords: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduce = useShouldReduceMotion();

  const wordStart = progressIndex / totalWords;
  const wordEnd = Math.min((progressIndex + 2) / totalWords, 1);

  const opacity = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0.02, 1]
  );
  const y = useTransform(scrollProgress, [wordStart, wordEnd], [4, 0]);

  const baseStyle = {
    fontSize: "clamp(32px, 5.5vw, 60px)",
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.03em",
  } as const;

  if (reduce) {
    return (
      <span
        className="inline-block text-ov-text-primary mr-[0.3em]"
        style={baseStyle}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      className="inline-block text-ov-text-primary mr-[0.3em]"
      style={{ ...baseStyle, opacity, y }}
    >
      {word}
    </motion.span>
  );
}

export function Declaration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useShouldReduceMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalWords = useMemo(
    () => lines.reduce((sum, line) => sum + line.length, 0),
    []
  );

  let wordCounter = 0;

  const stickyY = useTransform(scrollYProgress, [0, 1], ["0vh", "200vh"]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: reduce ? undefined : "300vh",
      }}
    >
      <section
        id="philosophy"
        className="px-6"
        style={{ minHeight: "inherit", position: "relative" }}
        aria-labelledby="philosophy-title"
      >
        {/* Animated viewport — simulates sticky inside the tall section */}
        <motion.div
          className={
            reduce
              ? "py-20"
              : "absolute top-0 left-0 w-full min-h-screen flex items-center justify-center"
          }
          style={reduce ? {} : { y: stickyY }}
        >
          <div className="max-w-[780px] mx-auto text-center px-6">
            <h2 id="philosophy-title" className="sr-only">
              Our Philosophy
            </h2>
            <div className="space-y-4 md:space-y-7">
              {lines.map((line, lineIdx) => (
                <div key={lineIdx} className="flex flex-wrap justify-center">
                  {line.map((word, wordIdx) => {
                    const idx = wordCounter;
                    wordCounter++;
                    return (
                      <ScrollWord
                        key={`${lineIdx}-${wordIdx}`}
                        word={word}
                        progressIndex={idx}
                        totalWords={totalWords}
                        scrollProgress={scrollYProgress}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
