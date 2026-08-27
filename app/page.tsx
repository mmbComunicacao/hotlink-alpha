import LeadBanner from "@/app/components/LeadBanner";
import ShareButton from "@/app/components/ShareButton";
import {
  getConsultant,
  getWhatsAppUrl,
  type CatalogItem,
  type Consultant,
} from "@/app/lib/consultant";

function getQueryId(searchParams: Record<string, string | string[] | undefined>) {
  const rawId = searchParams.id;
  return Array.isArray(rawId) ? rawId[0] ?? "demo" : rawId ?? "demo";
}

function Icon({ name, size = 18 }: { name: "arrow" | "chevron" | "mail" | "map" | "clock" | "instagram" | "globe" | "whatsapp"; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === "chevron") return <svg {...common}><path d="m7 9 5 5 5-5" /></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "map") return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>;
  if (name === "instagram") return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
  if (name === "globe") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  return <svg {...common}><path d="M20.5 11.2a8.6 8.6 0 0 1-12.4 7.7L4 20l1.1-3.9A8.6 8.6 0 1 1 20.5 11.2Z" /><path d="M8.2 8.7c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c.7 1.2 1.7 2.1 3 2.7l.6-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.6v.5c0 .3-.1.6-.4.8-.5.4-1.1.5-1.7.4-3.8-.7-6.5-3.4-7.2-7.1-.1-.6 0-1.2.4-1.8Z" /></svg>;
}

function ProfileAvatar({ consultant }: { consultant: Consultant }) {
  return (
    <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
      <div className="absolute -inset-2 rounded-full border border-teal-100 bg-teal-50/60" />
      <img
        src={consultant.avatarUrl}
        alt={`Foto de ${consultant.name}`}
        className="relative h-full w-full rounded-full object-cover shadow-xl shadow-slate-200/70 ring-4 ring-white"
      />
      {consultant.isVerified && (
        <span className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-teal-600 text-white shadow-md" title="Perfil verificado">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
        </span>
      )}
    </div>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[286px] flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_45px_rgba(15,118,110,0.13)]"
    >
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        {item.tag && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 backdrop-blur">{item.tag}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold tracking-tight text-slate-900">{item.title}</h3>
          <span className="mt-0.5 text-teal-600 transition-transform group-hover:translate-x-1"><Icon name="arrow" size={16} /></span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
      </div>
    </a>
  );
}

function ContactRow({ icon, children, href }: { icon: "mail" | "map" | "clock" | "instagram" | "globe"; children: React.ReactNode; href?: string }) {
  const content = <><span className="mt-0.5 text-teal-700"><Icon name={icon} size={17} /></span><span className="min-w-0 flex-1 break-words">{children}</span></>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm leading-6 text-slate-600 transition hover:text-teal-700">{content}</a>;
  return <div className="flex items-start gap-3 text-sm leading-6 text-slate-600">{content}</div>;
}

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const queryId = getQueryId(await searchParams);
  const { consultant, source } = await getConsultant(queryId);
  const whatsappUrl = getWhatsAppUrl(consultant.whatsappNumber, consultant.name);
  const profileUrl = `/?id=${encodeURIComponent(consultant.id)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFCF8]">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
        <div className="absolute -right-40 top-64 h-[34rem] w-[34rem] rounded-full bg-slate-100/80 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-slate-200/70 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href={profileUrl} className="flex items-center gap-3" aria-label="Alpha Proteções - início">
            <img
              src="/alphaprotecoes-h-padrao.svg"
              alt="Alpha Proteções"
              className="h-10 w-auto max-w-[190px] object-contain"
            />
          </a>
          <div className="flex items-center gap-2">
            {source === "demo" && <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 sm:inline-flex">Perfil demonstrativo</span>}
            <ShareButton />
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-20">
        <div className="grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/80 bg-white/65 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur sm:p-10 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatar consultant={consultant} />
              <div className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Consultor Alpha
              </div>
              <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{consultant.name}</h1>
              <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base">{consultant.role}</p>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{consultant.tagline}</p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-teal-700 px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(13,148,136,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 active:scale-[0.97]"
                >
                  <Icon name="whatsapp" size={21} /> Falar comigo no WhatsApp <Icon name="arrow" size={17} />
                </a>
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">{consultant.phone}</p>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-white/75 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8 lg:mt-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">Sobre este atendimento</h2>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">Online</span>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">{consultant.description}</p>
            <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
              <ContactRow icon="clock">{consultant.hours}</ContactRow>
              <ContactRow icon="map">{consultant.address} · {consultant.location}</ContactRow>
              <ContactRow icon="mail" href={`mailto:${consultant.email}`}>{consultant.email}</ContactRow>
              {consultant.instagramUrl && consultant.instagramHandle && <ContactRow icon="instagram" href={consultant.instagramUrl}>{consultant.instagramHandle}</ContactRow>}
              {consultant.websiteUrl && <ContactRow icon="globe" href={consultant.websiteUrl}>{consultant.websiteUrl.replace(/^https?:\/\//, "")}</ContactRow>}
            </div>
          </aside>
        </div>

        <section className="mt-16 sm:mt-20" aria-labelledby="catalog-title">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Conheça também</p>
              <h2 id="catalog-title" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">Soluções para cada momento</h2>
            </div>
            <a href={consultant.websiteUrl ?? "https://alphaprotecoes.com.br"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-700">Ver todas <Icon name="arrow" size={16} /></a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {consultant.catalog.map((item) => <CatalogCard item={item} key={`${consultant.id}-${item.title}`} />)}
          </div>
        </section>
      </section>

      <LeadBanner consultantId={consultant.id} consultantName={consultant.name} />

      <footer className="relative z-10 border-t border-slate-200/70 bg-white/50 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="flex items-center gap-2">
            <img src="/alphaprotecoes-icon-padrao.svg" alt="" className="h-5 w-5 object-contain" />
            <span>Uma conexão Alpha Proteções para relações mais seguras.</span>
          </p>
          <p>© {new Date().getFullYear()} Alpha Proteções</p>
        </div>
      </footer>
    </main>
  );
}
