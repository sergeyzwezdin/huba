'use client'

import type { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

const NotFound: FC = () => (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background font-sans">
        <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-mono leading-none font-black tracking-tighter text-muted/50"
            style={{ fontSize: 'clamp(16rem, 40vw, 28rem)' }}>
            404
        </div>

        <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
            <div className="animate-fade-in-up [animation-delay:100ms] mb-8 flex justify-center">
                <Image src="/logo.svg" alt="huba" width={64} height={50} className="opacity-60" />
            </div>

            <div className="animate-fade-in-up [animation-delay:200ms] mb-6">
                <div className="code-block hero-code-block mx-auto inline-block text-left">
                    <code className="whitespace-pre font-mono text-sm leading-relaxed">
                        <span className="text-accent">$</span>{' '}
                        <span className="text-foreground">cd /page-you-wanted</span>
                        {'\n'}
                        <span className="text-danger">error: path not found — no such route</span>
                    </code>
                </div>
            </div>

            <h1 className="text-gradient animate-fade-in-up [animation-delay:350ms] text-4xl font-bold tracking-tight sm:text-5xl">
                Page not found
            </h1>

            <p className="animate-fade-in-up [animation-delay:500ms] mt-4 text-secondary leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist, has been moved, or you may have mistyped the URL.
            </p>

            <div className="animate-fade-in-up [animation-delay:700ms] mt-10 flex items-center justify-center gap-5">
                <Link href="/" className="btn-primary rounded-full px-7 py-2.5 text-sm font-medium">
                    Back to Home
                </Link>
                <Link href="/docs" className="btn-glow">
                    Documentation
                </Link>
            </div>
        </div>
    </div>
)

export { NotFound }
