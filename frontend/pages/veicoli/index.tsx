import fs from 'fs'
import path from 'path'
import Layout from '../../components/Layout'
import VehicleCard from '../../components/VehicleCard'

export default function Veicoli({ vehicles }: { vehicles: any[] }) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Vetture in pronta consegna</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
