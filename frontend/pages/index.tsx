import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <section className="brand-hero rounded p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">Codecar Seregno</h1>
          <p className="mt-4 text-gray-700">La tua concessionaria di fiducia — scopri le nostre vetture e segui le imprese rally di Lorenzo Codecà.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/veicoli" className="bg-codecar-ocra text-white px-4 py-2 rounded">Scopri le auto</Link>
            <Link href="/rally" className="border px-4 py-2 rounded">Sezione Rally</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Vetrina</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1 p-6 border rounded text-center text-gray-500">Esempio: esegui `npm run seed` e avvia `npm run dev` per vedere l'inventario reale.</div>
        </div>
      </section>
    </Layout>
  )
}
