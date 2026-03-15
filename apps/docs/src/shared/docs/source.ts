import { createElement } from 'react'

import { docs } from 'fumadocs-mdx:collections/server'
import { type InferPageType, loader } from 'fumadocs-core/source'
import { icons } from 'lucide-react'

export const source = loader({
    baseUrl: '/docs',
    source: docs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) {
            return createElement(icons[icon as keyof typeof icons])
        }
    },
})

export async function getLLMText(page: InferPageType<typeof source>) {
    const processed = await page.data.getText('processed')

    return `# ${page.data.title}

${processed}`
}
