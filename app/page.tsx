import Header from '@/app/components/Header'
import HeroSection from '@/app/components/HeroSection'
import LeadBanner from '@/app/components/LeadBanner'
import Footer from '@/app/components/Footer'

import { getQueryId } from './lib/query'
import { getConsultant, getWhatsAppUrl } from './lib/consultant'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const queryId = getQueryId(await searchParams)
  const { consultant, source } = await getConsultant(queryId)
  const whatsappUrl = getWhatsAppUrl(consultant.whatsappNumber, consultant.name)
  const profileUrl = `/?id=${encodeURIComponent(consultant.id)}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFCF8] text-slate-900">
      {/* Soft Light Orbs */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      ></div>

      {/* Header */}
      <Header profileUrl={profileUrl} source={source} />

      {/* Hero Section */}
      <HeroSection consultant={consultant} whatsappUrl={whatsappUrl} />

      {/* Lead Banner */}
      <LeadBanner
        consultantId={consultant.id}
        consultantName={consultant.name}
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
