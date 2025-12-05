# Scraper AutoScout24 — Istruzioni

Questo repository contiene uno script Python che puoi eseguire localmente per raccogliere gli annunci pubblici del dealer `Codecar Seregno` su AutoScout24 e generare un file `data/vehicles.json`.

File principali:
- `scripts/scrape_autoscout.py` — script che visita la pagina concessionario e scarica le singole schede.
- `scripts/requirements.txt` — dipendenze Python.

Prerequisiti (locale):
- Python 3.10+ raccomandato
- Chrome/Chromium installato (o Edge compatibile)

Installazione dipendenze:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

Esecuzione (esempio):
```bash
python3 scripts/scrape_autoscout.py --dealer-url "https://www.autoscout24.it/concessionari/codecar-di-minghini-liliana?srsltid=AfmBOop_BdekijAz-eZsMzE7yX89tQzTa_RuLoqBFdcIOi1_0rFYIX9-" --download-images
```

Output:
- `data/vehicles.json` — JSON con la lista dei veicoli trovati e i campi estratti.
- `data/images/vehicle-*/` — (se richiesto) immagini scaricate per ogni veicolo.

Note legali e di buon uso:
- Assicurati di avere il diritto di raccogliere e riutilizzare i contenuti di AutoScout per scopi commerciali. Questo script è fornito come strumento tecnico: usa responsabilmente.
- Evita scraping massivo: questo script include ritardi minimi; se raccogli molti dati, aumenta i tempi di sleep per ridurre carico sul sito.

Se vuoi, posso:
- adattare lo script per una integrazione API se AutoScout fornisce accesso autorizzato;
- importare il `data/vehicles.json` risultante nel CMS di esempio (Strapi) e scaffoldare il sito Next.js.
