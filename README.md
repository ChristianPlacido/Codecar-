Progetto Codecar - scaffolding

Frontend: `./frontend` (Next.js + Tailwind)

Scraper: `./scripts/scrape_autoscout.py` — esegui localmente per ottenere `data/vehicles.json`.

Dopo lo scraping:
1. entra in `frontend`
2. `npm install`
3. `npm run seed`
4. `npm run dev`

Anteprima veloce senza build
- C'è già una versione statica esportata in `frontend/out`. Per vederla subito: `cd frontend/out && python3 -m http.server 3000` e apri http://localhost:3000
- In alternativa, dalla root `frontend` esegui `npm run preview:out` (usa lo stesso comando Python) dopo aver clonato il repo.
- Se aggiorni il codice/dati, rigenera l'export con `npm run export` prima di servire `out/`.

Deploy automatico su GitHub Pages
- Ho aggiunto una GitHub Action che builda il frontend (`npm run export`) e pubblica la cartella statica su branch `gh-pages`.
- Dopo il primo push su `main` l'Action costruirà e pubblicherà automaticamente.
- Vai su `Settings -> Pages` del repository e imposta la source su `gh-pages` branch (root). L'URL sarà `https://<username>.github.io/Codecar-/`.

Nota sul percorso (basePath): la build per GitHub Pages è configurata con `BASE_PATH=/Codecar-` in Action, quindi le risorse saranno servite correttamente da `https://<username>.github.io/Codecar-/`.

# Codecar-
Sito concessionaria codecar
