import { getAvailableHomes } from '@/lib/sanity-queries'

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
    '/blog/smart-money-moves-montgomery-remodel',
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

  // Fetch dynamic inventory pages from Sanity
  let inventoryPages: string[] = []
  try {
    const homes = await getAvailableHomes()
    inventoryPages = homes.map(home => `/inventory/${home.slug.current}`)
  } catch (error) {
    console.error('Error fetching inventory for sitemap:', error)
    // Continue without inventory pages if fetch fails
  }

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...inventoryPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
    const isHomepage = page === ''
    const isBlog = page.startsWith('/blog')
    const isInventory = page.startsWith('/inventory/')

    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${isHomepage ? 'weekly' : isInventory ? 'daily' : isBlog ? 'monthly' : 'monthly'}</changefreq>
    <priority>${isHomepage ? '1.0' : isInventory ? '0.9' : isBlog ? '0.7' : '0.8'}</priority>
  </url>`
  }).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}