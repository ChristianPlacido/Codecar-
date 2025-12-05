import fs from 'fs'
import path from 'path'
import Layout from '../components/Layout'
import Link from 'next/link'
import VehicleCard from '../components/VehicleCard'
import MediaCarousel from '../components/MediaCarousel'

export default function Home({ vehicles, rally }: { vehicles: any[]; rally: any }) {
  const featured = vehicles.slice(0, 3)
  const mediaItems = (rally.media || []).map((m: any) => ({
    type: m.type === 'video' ? 'video' : 'clip',
    title: m.title,
    src: m.src,
    start: m.start,
    end: m.end
  }))

  return (
    <Layout>
      <section className="brand-hero rounded-2xl p-6 sm:p-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="badge-ocra inline-flex">Concessionaria Codecar · Seregno</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Esperienza ufficiale rally al servizio della tua prossima vettura.</h1>
            <p className="text-white/80 text-base sm:text-lg">Lorenzo Codecà porta in showroom metodo, precisione e visione da 12 volte campione italiano Cross Country Rally. Assistenza premium, auto selezionate e preparazioni dedicate.</p>
            <div className="flex gap-3 flex-col sm:flex-row sm:flex-wrap">
              <Link href="/veicoli" className="px-5 py-3 bg-codecar-ocra text-black font-semibold rounded shadow text-center">Sfoglia le vetture</Link>
              <Link href="/rally" className="px-5 py-3 border border-white/15 rounded text-white hover:bg-white/5 text-center">Scopri la storia rally</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white/70 pt-2">
              <div className="section-card rounded-lg p-3">
                <div className="text-2xl font-bold text-codecar-ocra">+250</div>
                <div>consegne curate ogni anno</div>
              </div>
              <div className="section-card rounded-lg p-3">
                <div className="text-2xl font-bold text-codecar-ocra">100%</div>
                <div>vetture fotografate in HD</div>
              </div>
            </div>
          </div>
          <div className="section-card rounded-2xl p-3 sm:p-4">
            <MediaCarousel items={mediaItems} interval={9000} />
            <p className="mt-3 text-sm text-white/70 leading-relaxed">Clip in autoplay senza loghi: passaggi on-board, interviste e spezzoni di gara selezionati.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Consulenza sartoriale', desc: 'Team tecnico rally e consulenti vendita lavorano insieme: assetto, pneumatici, valutazione permute.' },
          { title: 'Digital first', desc: 'Tour video, firme digitali, report fotografici a 360° e contratti pronti anche da remoto.' },
          { title: 'Preparazione Codecar', desc: 'Ogni vettura viene controllata, igienizzata e consegnata con setup personalizzato quando richiesto.' },
        ].map((card) => (
          <div key={card.title} className="section-card rounded-xl p-5 text-white card-tilt">
            <div className="text-codecar-ocra font-semibold mb-2">{card.title}</div>
            <p className="text-white/75 text-sm">{card.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <p className="badge-ocra inline-flex">Selezione in vetrina</p>
            <h2 className="text-2xl font-bold text-white mt-2">Le ultime arrivate</h2>
          </div>
          <Link href="/veicoli" className="text-codecar-ocra hover:underline">Vedi tutte</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="section-card rounded-2xl p-6 text-white">
          <p className="badge-ocra inline-flex mb-3">Storia e traguardi</p>
          <h3 className="text-2xl font-bold">Lorenzo Codecà</h3>
          <p className="mt-3 text-white/80">Dodici titoli italiani Cross Country Rally, coaching per piloti emergenti e sviluppo vetture ufficiali. La stessa cura viene applicata alle vetture esposte in Codecar.</p>
          <div className="mt-4 space-y-3">
            {rally.highlights?.map((h: any) => (
              <div key={h.id} className="section-card rounded-lg p-3 border border-white/5">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="font-semibold text-white">{h.title}</span>
                  <span className="text-codecar-ocra font-semibold">{h.percent}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-codecar-ocra h-2" style={{ width: `${h.percent}%` }} />
                </div>
                <p className="text-white/60 text-sm mt-2">{h.description}</p>
              </div>
            ))}
          </div>
          <Link href="/rally" className="inline-flex mt-4 text-codecar-ocra hover:underline">Timeline completa</Link>
        </div>
        <div className="section-card rounded-2xl p-6 text-white">
          <p className="badge-ocra inline-flex mb-3">Metodo Codecar</p>
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <div className="font-semibold text-white">1. Accoglienza su appuntamento</div>
              <p>Showroom con lounge, briefing tecnico sulle esigenze e valutazione immediata della permuta.</p>
            </div>
            <div>
              <div className="font-semibold text-white">2. Test drive e setup</div>
              <p>Route dedicate, log delle sensazioni di guida e proposta di assetto o pneumatici ad hoc.</p>
            </div>
            <div>
              <div className="font-semibold text-white">3. Consegna premium</div>
              <p>Check finale, detailer interno e tutorial personalizzato su infotainment e ADAS.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const vehiclesPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  const rallyPath = path.join(process.cwd(), 'public', 'data', 'rally.json')

  let vehicles: any[] = []
  let rally: any = { media: [], highlights: [] }

  try {
    vehicles = JSON.parse(fs.readFileSync(vehiclesPath, 'utf-8'))
  } catch (e) {
    vehicles = []
  }

  try {
    rally = JSON.parse(fs.readFileSync(rallyPath, 'utf-8'))
  } catch (e) {
    rally = { media: [], highlights: [], timeline: [], driver: 'Lorenzo Codecà', intro: '' }
  }

  return { props: { vehicles, rally } }
}
