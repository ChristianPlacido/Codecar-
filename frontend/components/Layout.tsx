import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const siteMeta = {
  title: 'Codecar Seregno - Concessionaria & Rally',
  description: 'Codecar Seregno — Concessionaria e centro rally di Lorenzo Codecà. Scopri le vetture in pronta consegna e segui le imprese rally.',
  url: 'https://your-domain.example',
  logo: '/logo-codecar.svg'
}

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="border-b border-white/10 bg-[#0c0c0d]/80 backdrop-blur sticky top-0 z-30">
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 py-2 text-xs text-white/70">
        <div className="flex gap-4 items-center">
          <span className="badge-ocra">Seregno</span>
          <span>Via Massimo D'Azeglio 25</span>
          <span>Tel. <a href="tel:+390362238591" className="text-codecar-ocra hover:underline">0362 238591</a></span>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-white/70">Team Codecà</span>
          <span className="w-1.5 h-1.5 bg-codecar-ocra rounded-full" aria-hidden />
          <span className="text-white/70">Rally & Dealer Partner</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center">
            <img src={siteMeta.logo} alt="Logo Codecar" className="w-10 h-10" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold text-white">Codecar Seregno</div>
            <div className="text-xs text-white/70">Concessionaria & Rally Team</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-3 text-sm">
          <Link href="/veicoli" className="px-3 py-2 rounded hover:bg-white/5 text-white">Vetture</Link>
          <Link href="/rally" className="px-3 py-2 rounded hover:bg-white/5 text-white">Rally</Link>
          <Link href="/contatti" className="px-3 py-2 rounded bg-codecar-ocra text-black font-semibold shadow">Contatti</Link>
        </nav>
        <button
          className="md:hidden text-white border border-white/20 rounded px-3 py-2 flex items-center gap-2"
          aria-expanded={open}
          aria-label="Apri o chiudi il menu"
          onClick={() => setOpen(!open)}
        >
          <span className="w-5 h-px bg-white block" />
          <span className="w-5 h-px bg-white block" />
          <span className="text-sm">Menu</span>
        </button>
      </div>
      <div className={`${open ? 'block' : 'hidden'} md:hidden px-4 pb-4 space-y-2 text-sm`}>
        <Link href="/veicoli" className="block px-3 py-3 rounded bg-white/5 text-white" onClick={() => setOpen(false)}>
          Vetture
        </Link>
        <Link href="/rally" className="block px-3 py-3 rounded bg-white/5 text-white" onClick={() => setOpen(false)}>
          Rally
        </Link>
        <Link
          href="/contatti"
          className="block px-3 py-3 rounded bg-codecar-ocra text-black font-semibold shadow"
          onClick={() => setOpen(false)}
        >
          Contatti
        </Link>
        <div className="flex flex-wrap gap-2 text-xs text-white/70">
          <span className="badge-ocra">Seregno</span>
          <span>Via Massimo D'Azeglio 25</span>
          <a href="tel:+390362238591" className="text-codecar-ocra font-semibold">0362 238591</a>
        </div>
      </div>
    </header>
  )
}

const Footer: React.FC = () => (
  <footer className="mt-12 border-t border-white/10 bg-[#0c0c0d] text-white/80">
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-codecar-ocra" />
          <span className="font-semibold text-white">Codecar Seregno</span>
        </div>
        <p>Dealer ufficiale e centro tecnico per preparazioni rally. Esperienza diretta di Lorenzo Codecà.</p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Contatti</h4>
        <p>Via Massimo D'Azeglio 25 — 20831 Seregno (MB)</p>
        <p className="mt-2">Tel. <a href="tel:+390362238591" className="text-codecar-ocra hover:underline">0362 238591</a></p>
        <p>Email <a href="mailto:info@codecar.it" className="text-codecar-ocra hover:underline">info@codecar.it</a></p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-2">Orari</h4>
        <p>Lun–Ven: 9:00 - 12:30 / 14:00 - 19:00</p>
        <p>Sab: 9:00 - 18:00</p>
        <p className="mt-2 text-white/60">© Codecar Seregno — Tutti i diritti riservati</p>
      </div>
    </div>
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
