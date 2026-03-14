import type { FC, PropsWithChildren } from 'react'

import { DocsLayout } from 'fumadocs-ui/layouts/docs'

import { baseOptions } from '@/shared/docs/layout.shared'
import { source } from '@/shared/docs/source'

import { DocsProviders } from '@/app'

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <DocsProviders>
        <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
            {children}
        </DocsLayout>
    </DocsProviders>
)

export default Layout
