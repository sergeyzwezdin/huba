'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { CodeBlock, CodeLine } from '@/shared/ui/code'
import { Section } from '@/shared/ui/section'
import { TabBar } from '@/shared/ui/tab-bar'

import type { Method, Platform } from '../model/install-commands'
import { INSTALL_COMMANDS } from '../model/install-commands'

const Installation: FC = () => {
    const [platform, setPlatform] = useState<Platform>('macOS')
    const [method, setMethod] = useState<Method>('Brew')

    const handlePlatformChange = (p: Platform) => {
        setPlatform(p)
        const methods = Object.keys(INSTALL_COMMANDS[p]) as Method[]
        if (!methods.includes(method)) {
            setMethod(methods[0])
        }
    }

    const methods = Object.keys(INSTALL_COMMANDS[platform]) as Method[]
    const commands = INSTALL_COMMANDS[platform][method]

    return (
        <section id="installation" className="relative py-12 sm:py-24">
            <div className="mx-auto max-w-3xl px-6">
                <Section>
                    <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
                        Up and running in 10 seconds.
                    </h2>
                </Section>

                <div className="mt-16 space-y-10">
                    <Section delay={100}>
                        <div className="flex flex-wrap items-center gap-4">
                            <TabBar
                                tabs={['macOS', 'Linux', 'Windows'] as Platform[]}
                                active={platform}
                                onChange={handlePlatformChange}
                            />
                            {methods.length > 1 && <TabBar tabs={methods} active={method} onChange={setMethod} />}
                        </div>
                    </Section>

                    <Section delay={150}>
                        <h3 className="mb-4 text-sm font-medium tracking-wide text-subtle uppercase">Install</h3>
                        <CodeBlock copyText={commands?.install.join('\n') ?? ''}>
                            {commands?.install.map((cmd) => (
                                <CodeLine key={cmd}>{cmd}</CodeLine>
                            ))}
                        </CodeBlock>
                    </Section>

                    <Section delay={200}>
                        <h3 className="mb-4 text-sm font-medium tracking-wide text-subtle uppercase">Run it</h3>
                        <CodeBlock copyText="hb">
                            <CodeLine>hb</CodeLine>
                        </CodeBlock>
                        <p className="mt-4 text-sm text-subtle">
                            That&apos;s it. Huba scans your{' '}
                            <code className="font-mono text-accent">~/.claude/tasks/</code> directory and shows your
                            task lists.
                        </p>
                    </Section>

                    <Section delay={300}>
                        <h3 className="mb-4 text-sm font-medium tracking-wide text-subtle uppercase">Upgrade</h3>
                        <CodeBlock copyText={commands?.upgrade.join('\n') ?? ''}>
                            {commands?.upgrade.map((cmd) => (
                                <CodeLine key={cmd}>{cmd}</CodeLine>
                            ))}
                        </CodeBlock>
                    </Section>
                </div>
            </div>
        </section>
    )
}

export { Installation }
