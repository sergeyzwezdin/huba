import type { FC } from 'react'

import { Button } from '@/shared/ui/button'
import { CodeBlock, CodeLine } from '@/shared/ui/code'

const Hero: FC = () => (
    <section className="relative pt-10 pb-8 sm:pt-20 sm:pb-24">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="mx-auto max-w-4xl px-6 text-left sm:text-center">
            <h1 className="text-gradient animate-fade-in-up [animation-delay:100ms] text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
                Take control of your Claude Code task list
            </h1>
            <p className="animate-fade-in-up [animation-delay:300ms] mt-8 max-w-2xl text-lg leading-relaxed text-secondary sm:mx-auto">
                Huba is a terminal UI for managing Claude Code tasks — search, filter, track dependencies, and shape
                your task list into something that actually drives results. All without leaving the terminal.
            </p>
            <div className="animate-fade-in-up [animation-delay:500ms] mt-12">
                <CodeBlock className="hero-code-block mx-auto max-w-md text-left" copyText="npx @sergeyzwezdin/huba">
                    <CodeLine>npx @sergeyzwezdin/huba</CodeLine>
                </CodeBlock>
                <p className="animate-fade-in-up [animation-delay:600ms] mt-4 text-sm text-subtle italic">
                    Your tasks deserve a better UI than{' '}
                    <span className="pl-1 font-mono text-accent tracking-tighter">cat todo.json</span>
                </p>
            </div>
            <div className="animate-fade-in-up [animation-delay:750ms] mt-16 flex items-center justify-start gap-6 sm:justify-center">
                <Button variant="glow" asChild>
                    <a href="#installation">
                        Getting Started
                        <span className="ml-1.5">&#8595;</span>
                    </a>
                </Button>
                <Button variant="link" asChild>
                    <a href="/docs">See Documentation</a>
                </Button>
            </div>
        </div>
    </section>
)

export { Hero }
