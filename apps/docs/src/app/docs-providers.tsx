'use client'

import type { FC, PropsWithChildren } from 'react'

import { RootProvider } from 'fumadocs-ui/provider/next'

import { DocsSearchDialog } from '@/shared/ui/docs-search'

export const DocsProviders: FC<PropsWithChildren> = ({ children }) => (
    <RootProvider search={{ SearchDialog: DocsSearchDialog }}>{children}</RootProvider>
)
