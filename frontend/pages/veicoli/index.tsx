import fs from 'fs'
import path from 'path'
import Layout from '../../components/Layout'
import VehicleCard from '../../components/VehicleCard'

export default function Veicoli({ vehicles }: { vehicles: any[] }) {
  return (
    <Layout>
      <section className="brand-hero rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="badge-ocra inline-flex mb-3">Stock verificato quotidianamente</p>
            <h1 className="text-3xl font-bold">Vetture in pronta consegna</h1>
            <p className="mt-3 text-white/80 max-w-2xl">Annunci sincronizzati con AutoScout24 Codecar Seregno. Foto complete, dati tecnici e preparazione rally-friendly curata dal team di Lorenzo Codecà.</p>
          </div>
          <a href="https://www.autoscout24.it/concessionari/codecar-seregno" target="_blank" rel="noreferrer" className="px-5 py-3 bg-black text-codecar-ocra border border-codecar-ocra rounded shadow hover:shadow-lg hover:shadow-black/50 transition">Vai al profilo AutoScout24</a>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  let vehicles = []
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    vehicles = JSON.parse(raw)
  } catch (e) {
    vehicles = []
  }
  return { props: { vehicles } }
}
