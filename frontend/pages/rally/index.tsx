import fs from 'fs'
import path from 'path'
import Layout from '../../components/Layout'
import MediaCarousel from '../../components/MediaCarousel'
import RallyTimeline from '../../components/RallyTimeline'

export default function Rally({ data }: { data: any }) {
  const mediaItems = (data.media || []).map((m: any) => ({ type: m.type === 'video' ? 'video' : 'clip', title: m.title, src: m.src }))
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Sezione Rally — {data.driver}</h1>
      <p className="mt-2 text-gray-700">{data.intro}</p>

      <div className="mt-8">
        <MediaCarousel items={mediaItems} interval={7000} />
      </div>

      <div className="mt-8">
        <RallyTimeline highlights={data.highlights} timeline={data.timeline} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Galleria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data.highlights.map((h: any) => (
            h.images && h.images.map((img: string, i: number) => (
              <img key={`${h.id}-${i}`} src={img} alt={`${h.title} ${i+1}`} className="w-full h-40 object-cover rounded" />
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
