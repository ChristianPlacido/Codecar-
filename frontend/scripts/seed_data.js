const fs = require('fs')
const path = require('path')

// Copies data/vehicles.json (from project root) into frontend public/data/vehicles.json
// Use this after running the scraper locally.

const src = path.resolve(process.cwd(), '..', 'data', 'vehicles.json')
const destDir = path.join(process.cwd(), 'public', 'data')
const dest = path.join(destDir, 'vehicles.json')

if (!fs.existsSync(src)) {
  console.error('Source data/vehicles.json not found. Esegui prima lo scraper e posiziona il file in ../data/vehicles.json')
  process.exit(1)
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

const raw = fs.readFileSync(src, 'utf-8')
const vehicles = JSON.parse(raw)

// ensure id exists
vehicles.forEach((v, idx) => {
  if (!v.id) v.id = `vehicle-${idx+1}`
})

fs.writeFileSync(dest, JSON.stringify(vehicles, null, 2), 'utf-8')
console.log(`Seed copiato in ${dest} (${vehicles.length} veicoli)`)
