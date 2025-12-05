const fs = require('fs')
const path = require('path')

const OUT = path.join(process.cwd(), 'public', 'sitemap.xml')
const BASE = 'https://your-domain.example'

function urlEntry(url, lastmod = new Date().toISOString(), changefreq = 'weekly', priority = '0.7') {
  return `  <url>\n    <loc>${BASE}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`
}

function main() {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  // static pages
  lines.push(urlEntry('/'))
  lines.push(urlEntry('/veicoli'))
  lines.push(urlEntry('/rally'))

  // vehicles
  const vehiclesPath = path.join(process.cwd(), '..', 'data', 'vehicles.json')
  if (fs.existsSync(vehiclesPath)) {
    const v = JSON.parse(fs.readFileSync(vehiclesPath, 'utf-8'))
    v.forEach((item) => {
      lines.push(urlEntry(`/veicoli/${encodeURIComponent(item.id)}`, item.publication_date || new Date().toISOString(), 'weekly', '0.8'))
    })
  }

  lines.push('</urlset>')
  fs.writeFileSync(OUT, lines.join('\n'), 'utf-8')
  console.log('Sitemap generata in', OUT)
}

main()
