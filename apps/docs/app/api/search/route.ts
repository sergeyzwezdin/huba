import { createFromSource } from 'fumadocs-core/search/server'
import type { LoaderConfig, LoaderOutput } from 'fumadocs-core/source'

import { source } from '@/shared/docs/source'

export const revalidate = false

export const { staticGET: GET } = createFromSource(source as unknown as LoaderOutput<LoaderConfig>, {
    language: 'english',
})
