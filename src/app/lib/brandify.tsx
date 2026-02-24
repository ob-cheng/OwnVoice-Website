import type { ReactNode } from "react";

const BRAND_GREEN = "#30D158";

/**
 * Replaces every visible occurrence of "OwnVoice" (with or without a
 * trailing period) in a plain-text string with the branded JSX version:
 *   OwnVoice<span style={{ color: "#30D158" }}>.</span>
 *
 * If the original text already has "OwnVoice.", the existing period is
 * consumed so you never get a double period.
 */
export function brandify(text: string): ReactNode {
  const parts = text.split(/(OwnVoice\.?)/);
  if (parts.length === 1) return text; // nothing to brand
  return parts.map((part, i) =>
    part.startsWith("OwnVoice") ? (
      <span key={i}>
        OwnVoice
        <span style={{ color: BRAND_GREEN }}>.</span>
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
