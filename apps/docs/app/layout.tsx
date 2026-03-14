import type { FC, PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'

import './globals.css'

import { Analytics } from '@/widgets/analytics'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Huba — Terminal UI for Claude Code Tasks',
    description:
        'Huba is a terminal UI for managing Claude Code tasks. Search, filter, track dependencies, and shape your task list into something that actually drives results.',
}

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
            <Analytics />
            {children}
        </body>
    </html>
)

export default Layout
