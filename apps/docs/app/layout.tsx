import type { FC, ReactNode } from 'react'

import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from 'next-themes'

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

type RootLayoutProps = Readonly<{
    children: ReactNode
}>

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" forcedTheme="dark">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
