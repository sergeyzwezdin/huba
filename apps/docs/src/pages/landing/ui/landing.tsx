'use client'

import type { FC } from 'react'

import { Explainer } from '@/widgets/explainer'
import { Features } from '@/widgets/features'
import { Footer } from '@/widgets/footer'
import { Hero } from '@/widgets/hero'
import { Installation } from '@/widgets/installation'
import { Nav } from '@/widgets/nav'
import { Requirements } from '@/widgets/requirements'
import { Screenshot } from '@/widgets/screenshot'

const Landing: FC = () => (
    <div className="relative min-h-screen overflow-x-clip bg-background font-sans">
        <div className="noise-overlay" />
        <Nav />
        <main>
            <Hero />
            <Screenshot />
            <Explainer />
            <Features />
            <Installation />
            <Requirements />
        </main>
        <Footer />
        <div className="footer-glow" />
        <div className="footer-grid" />
    </div>
)

export { Landing }
