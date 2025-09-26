import { MetadataRoute } from 'next'

export function GET(): Response {
  const robots = `User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://vanguardbuilders.vercel.app'}/sitemap.xml`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}