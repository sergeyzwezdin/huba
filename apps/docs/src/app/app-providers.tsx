'use client'

import type { FC, PropsWithChildren } from 'react'

import { ThemeProvider } from 'next-themes'

export const AppProviders: FC<PropsWithChildren> = ({ children }) => (
    <ThemeProvider attribute="class" forcedTheme="dark">
        {children}
    </ThemeProvider>
)
