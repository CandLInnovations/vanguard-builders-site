import { MetadataRoute } from 'next'
import { getAvailableHomes } from '@/lib/sanity-queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanguardbuilders.com'

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

  return allPages.map(page => {
    const isHomepage = page === ''
    const isBlog = page.startsWith('/blog')
    const isInventory = page.startsWith('/inventory/')

    return {
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: isHomepage ? 'weekly' : isInventory ? 'daily' : isBlog ? 'monthly' : 'monthly',
      priority: isHomepage ? 1.0 : isInventory ? 0.9 : isBlog ? 0.7 : 0.8,
    }
  }) as MetadataRoute.Sitemap
}
