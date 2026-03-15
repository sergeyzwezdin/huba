import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

import { source } from '@/shared/docs/source'

const baseUrl = process.env.SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = source.getPages().map((page) => ({
        url: `${baseUrl}${page.url}`,
        lastModified: new Date(),
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1,
        },
        ...pages,
    ]
}
