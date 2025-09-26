import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanguardbuilders.vercel.app'

  const staticPages = [
    '',
    '/about',
    '/custom-homes',
    '/renovations',
    '/additions',
    '/kitchens',
    '/bathrooms',
    '/portfolio',
    '/inventory',
    '/blog',
    '/blog/luxury-home-trends-2024',
    '/blog/custom-home-building-process',
    '/consultation',
    '/custom-build-wizard',
    '/remodeling-wizard',
    '/contact',
    '/faq',
    '/warranty',
    '/legacy-of-giving',
    '/terms',
    '/privacy'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : page.startsWith('/blog') ? 'monthly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/blog') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}