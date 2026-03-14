import type { FC, PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import './globals.css'

import { AppProviders } from '@/app'

export const metadata: Metadata = {
    title: 'Huba — Terminal UI for Claude Code Tasks',
    description:
        'Huba is a terminal UI for managing Claude Code tasks. Search, filter, track dependencies, and shape your task list into something that actually drives results.',
}

const Layout: FC<PropsWithChildren> = ({ children }) => <AppProviders>{children}</AppProviders>

export default Layout
