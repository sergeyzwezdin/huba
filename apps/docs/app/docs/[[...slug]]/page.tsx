import type { LoaderConfig, LoaderOutput } from 'fumadocs-core/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { source } from '@/shared/docs/source'
import { getMDXComponents } from '@/shared/ui/mdx'

type Params = Promise<{ slug?: string[] }>

const Page = async (props: { params: Params }) => {
    const params = await props.params
    const page = source.getPage(params.slug)

    if (!page) notFound()

    const MDX = page.data.body

    return (
        <DocsPage toc={page.data.toc} footer={{ className: 'mt-8' }}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        a: createRelativeLink(source as unknown as LoaderOutput<LoaderConfig>, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    )
}

export const dynamicParams = false

export const generateStaticParams = () => source.generateParams()

export const generateMetadata = async (props: { params: Params }): Promise<Metadata> => {
    const params = await props.params
    const page = source.getPage(params.slug)
    if (!page) notFound()

    return {
        title: `${page.data.title} — Huba`,
        description: page.data.description,
    }
}

export default Page
