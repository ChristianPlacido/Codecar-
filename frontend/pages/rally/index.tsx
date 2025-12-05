import fs from 'fs'
import path from 'path'
import Layout from '../../components/Layout'
import MediaCarousel from '../../components/MediaCarousel'
import RallyTimeline from '../../components/RallyTimeline'

export default function Rally({ data }: { data: any }) {
  const mediaItems = (data.media || []).map((m: any) => ({ type: m.type === 'video' ? 'video' : 'clip', title: m.title, src: m.src, start: m.start, end: m.end }))
  return (
    <Layout>
      <section className="brand-hero rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="space-y-3">
            <p className="badge-ocra inline-flex">Cross Country Rally</p>
            <h1 className="text-3xl sm:text-4xl font-bold">{data.driver}</h1>
            <p className="text-white/80 max-w-2xl text-base sm:text-lg">{data.intro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white/70">
              {[{ label: 'titoli italiani', value: '12' }, { label: 'podî internazionali', value: '80+' }, { label: 'anni di esperienza', value: '25' }].map((item) => (
                <div key={item.label} className="section-card rounded-lg p-3">
                  <div className="text-3xl font-bold text-codecar-ocra">{item.value}</div>
                  <div>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <MediaCarousel items={mediaItems} interval={8500} />
          </div>
        </div>
      </section>

      <div className="mt-10">
        <RallyTimeline highlights={data.highlights} timeline={data.timeline} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-white">Galleria e appunti gara</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.highlights.map((h: any) => (
            h.images && h.images.map((img: string, i: number) => (
              <div key={`${h.id}-${i}`} className="section-card rounded-lg overflow-hidden">
                <img src={img} alt={`${h.title} ${i+1}`} className="w-full h-40 object-cover" />
                <div className="p-3 text-sm text-white/70">
                  <div className="font-semibold text-white">{h.title}</div>
                  <p>{h.description}</p>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'rally.json')
  let data = {}
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    data = JSON.parse(raw)
  } catch (e) {
    data = { driver: 'Lorenzo Codecà', intro: '', highlights: [], media: [], timeline: [] }
  }
  return { props: { data } }
}
