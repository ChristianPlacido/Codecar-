import Layout from '../../components/Layout'

export default function Contatti() {
  return (
    <Layout>
      <section className="brand-hero rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">Prenota un appuntamento</h1>
        <p className="mt-3 text-white/80 max-w-2xl text-base sm:text-lg">Team Codecar e Lorenzo Codecà sono disponibili per consulenze dedicate, prove su strada e setup personalizzati.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
          <div className="section-card rounded-xl p-4">
            <div className="font-semibold text-white">Showroom</div>
            <p>Via Massimo D'Azeglio 25</p>
            <p>20831 Seregno (MB)</p>
          </div>
          <div className="section-card rounded-xl p-4">
            <div className="font-semibold text-white">Contatti diretti</div>
            <p>Tel. <a href="tel:+390362238591" className="text-codecar-ocra hover:underline">0362 238591</a></p>
            <p>Email <a href="mailto:info@codecar.it" className="text-codecar-ocra hover:underline">info@codecar.it</a></p>
          </div>
          <div className="section-card rounded-xl p-4">
            <div className="font-semibold text-white">Orari</div>
            <p>Lun–Ven: 9:00 - 12:30 / 14:00 - 19:00</p>
            <p>Sab: 9:00 - 18:00</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 text-white">
        <div className="section-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-3">Richiedi disponibilità</h2>
          <form className="space-y-3 text-sm">
            <input type="text" name="name" placeholder="Nome e cognome" className="w-full px-3 py-3 rounded bg-black/40 border border-white/10 focus:border-codecar-ocra" />
            <input type="email" name="email" placeholder="Email" className="w-full px-3 py-3 rounded bg-black/40 border border-white/10 focus:border-codecar-ocra" />
            <input type="tel" name="phone" placeholder="Telefono" className="w-full px-3 py-3 rounded bg-black/40 border border-white/10 focus:border-codecar-ocra" />
            <textarea name="message" placeholder="Vettura di interesse o richiesta" className="w-full px-3 py-3 rounded bg-black/40 border border-white/10 focus:border-codecar-ocra" rows={4} />
            <button type="button" className="w-full py-3 bg-codecar-ocra text-black font-semibold rounded shadow">Invia richiesta</button>
            <p className="text-xs text-white/60">Compilando il form accetti di essere ricontattato da Codecar. Nessun dato verrà condiviso con terze parti.</p>
          </form>
        </div>
        <div className="section-card rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
          <iframe
            title="Mappa Codecar Seregno"
            src="https://maps.google.com/maps?q=Via%20Massimo%20D'Azeglio%2025,%20Seregno&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </Layout>
  )
}
