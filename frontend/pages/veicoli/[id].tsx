import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Link from 'next/link'

interface Vehicle {
  id: string
  title: string
  price: string
  year: string
  mileage: string
  fuel?: string
  gearbox?: string
  traction?: string
  power?: string
  body?: string
  seats?: number
  highlight?: string
  images?: string[]
  ctaLink?: string
  tags?: string[]
}

type Props = { vehicle?: Vehicle }

export default function VehicleDetail({ vehicle }: Props) {
  if (!vehicle) {
    return (
      <Layout>
        <div className="text-white">Veicolo non trovato.</div>
      </Layout>
    )
  }

  const gallery = vehicle.images || []

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10 section-card">
            {gallery.length > 0 ? (
              <img src={gallery[0]} alt={vehicle.title} className="w-full h-96 object-cover" />
            ) : (
              <div className="w-full h-96 bg-white/5" />
            )}
            <div className="absolute top-4 left-4 badge-ocra">Selezione Codecar</div>
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {gallery.slice(1).map((img, idx) => (
                <img key={idx} src={img} alt={`${vehicle.title}-${idx}`} className="w-full h-28 object-cover rounded border border-white/10" />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="badge-ocra inline-flex">Pronta consegna</div>
          <h1 className="text-3xl font-semibold text-white">{vehicle.title}</h1>
          {vehicle.highlight && <p className="text-white/70">{vehicle.highlight}</p>}
          <div className="text-4xl font-bold text-codecar-ocra">{vehicle.price}</div>

          <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
            <div className="section-card rounded-lg p-4">
              <div className="text-white/60">Anno</div>
              <div className="font-semibold">{vehicle.year}</div>
            </div>
            <div className="section-card rounded-lg p-4">
              <div className="text-white/60">Chilometraggio</div>
              <div className="font-semibold">{vehicle.mileage}</div>
            </div>
            <div className="section-card rounded-lg p-4">
              <div className="text-white/60">Alimentazione</div>
              <div className="font-semibold">{vehicle.fuel}</div>
            </div>
            <div className="section-card rounded-lg p-4">
              <div className="text-white/60">Cambio</div>
              <div className="font-semibold">{vehicle.gearbox}</div>
            </div>
            {vehicle.power && (
              <div className="section-card rounded-lg p-4">
                <div className="text-white/60">Potenza</div>
                <div className="font-semibold">{vehicle.power}</div>
              </div>
            )}
            {vehicle.traction && (
              <div className="section-card rounded-lg p-4">
                <div className="text-white/60">Trazione</div>
                <div className="font-semibold">{vehicle.traction}</div>
              </div>
            )}
          </div>

          {vehicle.tags && (
            <div className="flex flex-wrap gap-2">
              {vehicle.tags.map((tag) => (
                <span key={tag} className="badge-ocra">{tag}</span>
              ))}
            </div>
          )}

          <div className="pill-divider" />

          <div className="flex flex-wrap gap-3">
            {vehicle.ctaLink && (
              <a href={vehicle.ctaLink} target="_blank" rel="noreferrer" className="px-4 py-3 bg-codecar-ocra text-black font-semibold rounded shadow hover:translate-y-[-1px] transition-all">Scheda completa su AutoScout24</a>
            )}
            <Link href="/veicoli" className="px-4 py-3 border border-white/10 rounded text-white hover:bg-white/5">Torna all'elenco</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const vehicles: Vehicle[] = JSON.parse(raw)
  return {
    paths: vehicles.map((v) => ({ params: { id: v.id } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const vehicles: Vehicle[] = JSON.parse(raw)
  const slug = Array.isArray(params?.id) ? params?.id[0] : params?.id
  const vehicle = vehicles.find((v) => v.id === slug)
  return { props: { vehicle: vehicle || null } }
}
