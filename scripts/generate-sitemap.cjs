const fs = require('fs')
const path = require('path')

const baseUrl = 'https://vedant-sonawane-portfolio.in'
const routes = ['/', '/about-vedant-sonawane', '/projects', '/blog']
const lastmod = new Date().toISOString()

const urls = routes
  .map((route) => {
    return `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

const publicDir = path.join(__dirname, '..', 'public')
const distDir = path.join(__dirname, '..', 'dist')

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
}

console.log('Sitemap generated at public/sitemap.xml')
