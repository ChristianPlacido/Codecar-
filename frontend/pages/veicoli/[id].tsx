import fs from 'fs'
import path from 'path'
import Layout from '../../components/Layout'

export default function VehiclePage({ vehicle }: { vehicle: any }) {
  if (!vehicle) return <Layout><div>Veicolo non trovato</div></Layout>
  return (
    <Layout>
      {/* JSON-LD Product schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': vehicle.title,
        'image': vehicle.images || [],
        'description': vehicle.description || '',
        'url': vehicle.source_url,
        'brand': 'Codecar Seregno',
        'offers': {
          '@type': 'Offer',
          'price': vehicle.price ? String(vehicle.price).replace(/[^0-9\.\,]/g, '') : undefined,
          'priceCurrency': 'EUR',
          'availability': 'https://schema.org/InStock'
        }
      }) }} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <img src={vehicle.images && vehicle.images[0] ? vehicle.images[0] : '/placeholder-car.jpg'} alt={vehicle.title} className="w-full h-96 object-cover rounded" />
          <h1 className="text-2xl font-bold mt-4">{vehicle.title}</h1>
          <p className="mt-2 text-gray-700">{vehicle.description}</p>
        </div>
        <aside className="border rounded p-4">
          <div className="text-lg font-bold text-codecar-ocra">{vehicle.price}</div>
          <ul className="mt-4 text-sm text-gray-700 space-y-2">
            <li><strong>Anno:</strong> {vehicle.year || '-'}</li>
            <li><strong>Chilometraggio:</strong> {vehicle.mileage || '-'}</li>
            <li><strong>Alimentazione:</strong> {vehicle.fuel || '-'}</li>
          </ul>
          <a href={vehicle.source_url} target="_blank" rel="noreferrer" className="block mt-4 bg-gray-900 text-white text-center py-2 rounded">Vedi annuncio originale</a>
        </aside>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  let vehicles = []
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    vehicles = JSON.parse(raw)
  } catch (e) {
    vehicles = []
  }
  const paths = vehicles.map((v: any) => ({ params: { id: v.id } }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }: any) {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'vehicles.json')
  let vehicles = []
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    vehicles = JSON.parse(raw)
  } catch (e) {
    vehicles = []
  }
  const vehicle = vehicles.find((v: any) => v.id === params.id) || null
  return { props: { vehicle } }
}
