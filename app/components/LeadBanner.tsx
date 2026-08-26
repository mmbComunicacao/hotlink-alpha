"use client";

import { useState, useEffect } from "react";

interface LeadBannerProps {
  consultantId: string;
  consultantName: string;
}

export default function LeadBanner({ consultantId, consultantName }: LeadBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, consultantId, consultantName }),
      });

      if (!response.ok) throw new Error("Não foi possível registrar o lead");

      setStatus("success");
      setTimeout(() => {
        setIsExpanded(false);
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 px-4 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 sm:px-0">
      <div className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? "max-h-[400px] opacity-100" : "max-h-16 opacity-100"}`}>
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
          >
            <span className="text-sm font-bold tracking-tight text-slate-900">Quer que eu te ligue?</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </button>
        ) : (
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-950">Solicitar contato</h3>
                <p className="mt-1 text-xs text-slate-500">O consultor {consultantName} retornará em breve.</p>
              </div>
              <button onClick={() => setIsExpanded(false)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4 4L19 6" /></svg>
                </div>
                <p className="text-sm font-bold text-slate-900">Solicitação enviada!</p>
                <p className="mt-1 text-xs text-slate-500">Em breve entraremos em contato.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Seu Nome</label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="Como podemos te chamar?"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Telefone / WhatsApp</label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <p className="text-[10px] leading-4 text-slate-400">Usaremos seu contato apenas para retornar esta solicitação.</p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  ) : "Solicitar contato"}
                </button>
                {status === "error" && <p className="text-center text-[10px] font-bold text-red-500">Ocorreu um erro. Tente novamente.</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
