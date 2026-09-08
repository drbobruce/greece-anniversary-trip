"use client";

import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });

    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get("next") || "/";
      window.location.href = next;
    } else {
      setLoading(false);
      setError("That's not the right passcode.");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-sand-dark/30 bg-white/90 p-6 shadow-sm shadow-ink/5"
      >
        <p className="text-3xl">🕊️</p>
        <h1 className="mt-2 font-serif text-xl font-semibold text-ink">Greece, Together</h1>
        <p className="mt-1 mb-4 text-sm text-ink-soft">Enter the family passcode to continue.</p>
        <input
          type="password"
          inputMode="text"
          autoFocus
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="mb-3 w-full rounded-xl border border-sand-dark/40 bg-cream px-4 py-3 text-base text-ink outline-none focus:border-aegean"
        />
        {error && <p className="mb-3 text-sm text-terracotta">{error}</p>}
        <button
          type="submit"
          disabled={loading || !passcode}
          className="w-full rounded-full bg-aegean px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
