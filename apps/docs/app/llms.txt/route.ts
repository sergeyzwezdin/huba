import { llms } from 'fumadocs-core/source'

import { source } from '@/shared/docs/source'

export const revalidate = false

export function GET() {
    return new Response(llms(source).index())
}
