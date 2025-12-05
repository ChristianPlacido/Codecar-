import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const siteMeta = {
  title: 'Codecar Seregno - Concessionaria & Rally',
  description: 'Codecar Seregno — Concessionaria e centro rally di Lorenzo Codecà. Scopri le vetture in pronta consegna e segui le imprese rally.',
  url: 'https://your-domain.example',
  logo: '/placeholder-car.jpg'
}

const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-codecar-ocra flex items-center justify-center font-bold text-white">CC</div>
        <div className="text-lg font-semibold">Codecar Seregno</div>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/veicoli" className="text-sm text-gray-700 hover:text-black">Vetture</Link>
        <Link href="/rally" className="text-sm text-gray-700 hover:text-black">Rally</Link>
        <Link href="/contatti" className="text-sm bg-codecar-ocra px-3 py-2 rounded text-white">Contatti</Link>
      </nav>
    </div>
  </header>
)

const Footer: React.FC = () => (
  <footer className="mt-12 border-t bg-white">
    <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">© Codecar Seregno — Tutti i diritti riservati</div>
  </footer>
)

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{siteMeta.title}</title>
        <meta name="description" content={siteMeta.description} />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:image" content={siteMeta.logo} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />

        {/* Organization JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AutoDealer',
          'name': 'Codecar Seregno',
          'url': siteMeta.url,
          'logo': siteMeta.logo,
          'sameAs': []
        }) }} />
      </Head>

      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
