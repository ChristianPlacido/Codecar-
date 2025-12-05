# Frontend (Next.js) — Setup rapido

Prerequisiti:
- Node 18+ / npm 9+

Setup e avvio:
```bash
cd frontend
npm install
# copiare i dati estratti dallo scraper in `data/vehicles.json` nella root del repository
npm run seed   # copierà ../data/vehicles.json -> public/data/vehicles.json
npm run dev
```

Visita: `http://localhost:3000`

Note:
- La pagina `veicoli` legge `public/data/vehicles.json` in fase di build.
- Esegui `npm run seed` ogni volta che aggiorni `data/vehicles.json` dopo lo scraping.

HTTPS & Deploy consigliati
- Per HTTPS in produzione: deploy su Vercel (raccomandato) o Netlify — entrambi forniscono HTTPS automatico con certificati Let\'s Encrypt.
- Per deploy su Vercel: crea un account, collega questo repository e fai deploy (Vercel configura HTTPS automaticamente).
- Per HTTPS locale: usa `mkcert` per creare certificati locali o usa `ngrok` per esporre in HTTPS il dev server.

Esempio rapido Vercel:
```bash
# dopo commit/push su GitHub, collega repo su vercel.com e fai deploy automatico
```

Generare sitemap (dopo `npm run seed` che copia i dati):
```bash
npm run sitemap
```

