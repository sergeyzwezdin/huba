import type { FC } from 'react'

import { Section } from '@/shared/ui/section'

const Explainer: FC = () => (
    <section className="relative py-12 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-16 md:grid-cols-2">
                <Section>
                    <h2 className="text-gradient text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
                        You craft the context. The agent delivers.
                    </h2>
                </Section>
                <Section delay={150}>
                    <div className="space-y-6 text-secondary leading-relaxed">
                        <p>
                            In agentic development, tasks aren't just checkboxes — they're the communication layer
                            between you and the agent. You define what needs to happen, the agent picks it up and runs.
                        </p>
                        <p>
                            Claude Code's native task list works great for the agent. But as a human, you need more than
                            task names in a flat list. You need to see the full picture — descriptions, dependencies,
                            status, progress — to shape the work effectively.
                        </p>
                        <p className="text-foreground">
                            Huba gives you that picture. A terminal UI built specifically for the way agentic
                            development works:{' '}
                            <strong className="text-accent">
                                you manage the context, the agent manages the execution.
                            </strong>
                        </p>
                    </div>
                </Section>
            </div>
        </div>
    </section>
)

export { Explainer }
