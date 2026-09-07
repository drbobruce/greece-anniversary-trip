"use client";

import { useState } from "react";

/** A confirmation number with a one-tap copy button — no clipboard permission prompt needed. */
export function CopyableCode({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — the number is still visible to copy manually
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-lg px-1 -mx-1 text-left transition-colors hover:bg-black/5 ${className}`}
      aria-label={`Copy confirmation number ${value}`}
    >
      <span className="font-mono">{value}</span>
      <span className="text-xs font-sans font-medium opacity-60">
        {copied ? "Copied!" : "Tap to copy"}
      </span>
    </button>
  );
}
