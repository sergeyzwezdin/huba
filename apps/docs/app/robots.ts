import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env.SITE_URL ?? 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
