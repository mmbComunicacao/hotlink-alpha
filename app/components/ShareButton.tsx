"use client";

import { useState } from "react";

export default function ShareButton() {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  async function handleShare() {
    const shareData = {
      title: "Perfil do consultor Alpha",
      text: "Conheça este consultor e suas soluções.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      // O cancelamento do menu nativo de compartilhamento não precisa gerar alerta.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-800 active:scale-[0.97]"
      aria-label="Compartilhar perfil"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {status === "copied" ? "Link copiado" : "Compartilhar"}
    </button>
  );
}
