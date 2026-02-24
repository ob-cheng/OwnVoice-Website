import type { ReactNode } from "react";
import { Link } from "react-router";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  size?: "default" | "large";
}

export function CTAButton({
  children,
  variant = "primary",
  onClick,
  href,
  ariaLabel,
  size = "default",
}: CTAButtonProps) {
  const sizeClasses = size === "large" ? "px-7 py-3.5" : "px-5 py-2.5";

  const baseClasses = `inline-flex items-center justify-center gap-2 ${sizeClasses} rounded-full transition-all duration-200 cursor-pointer`;

  const variantClasses =
    variant === "primary"
      ? "bg-ov-accent text-white hover:bg-ov-accent-hover"
      : "border border-white/[0.1] text-ov-text-secondary hover:text-ov-text-primary hover:border-white/[0.18] backdrop-blur-md";

  const variantStyle =
    variant === "primary"
      ? { boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(10,132,255,0.2)" }
      : { backgroundColor: "rgba(255,255,255,0.04)" };

  const focusClasses =
    "focus:outline-[3px] focus:outline-ov-focus focus:outline-offset-2";

  const fontSize = size === "large" ? "16px" : "15px";
  const sharedStyle = { fontSize, fontWeight: 500, letterSpacing: "-0.01em", ...variantStyle };
  const sharedClassName = `${baseClasses} ${variantClasses} ${focusClasses}`;

  if (href) {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          to={href}
          className={sharedClassName}
          style={sharedStyle}
          aria-label={ariaLabel}
          role="button"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={sharedClassName}
        style={sharedStyle}
        aria-label={ariaLabel}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={sharedClassName}
      style={sharedStyle}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
