import type { FC } from 'react'

import { Section } from '@/shared/ui/section'

import { PLATFORMS } from '../model/platforms-data'

const Requirements: FC = () => (
    <section className="relative py-12 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
            <Section>
                <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">Runs where you do.</h2>
            </Section>

            <Section delay={100}>
                <div className="mt-12 overflow-hidden rounded-2xl border border-border-subtle">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface">
                                <th className="px-6 py-4 text-left font-medium text-subtle">Platform</th>
                                <th className="px-6 py-4 text-left font-medium text-subtle">Architecture</th>
                                <th className="px-6 py-4 text-left font-medium text-subtle">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PLATFORMS.map((row) => (
                                <tr
                                    key={`${row.platform}-${row.arch}`}
                                    className="border-b border-border-subtle/50 last:border-0">
                                    <td className="px-6 py-4 text-foreground">{row.platform}</td>
                                    <td className="px-6 py-4 font-mono text-xs text-secondary">{row.arch}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                row.supported ? 'bg-success-muted text-success' : 'bg-muted text-subtle'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section delay={200}>
                <div className="mt-8 space-y-2 text-sm text-subtle">
                    <p>
                        <strong className="text-secondary">Prerequisites:</strong>{' '}
                        <a
                            href="https://docs.anthropic.com/en/docs/claude-code/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent transition-colors hover:text-accent-hover">
                            Claude Code
                        </a>{' '}
                        installed and configured, with tasks created via Claude Code&apos;s native task system.
                    </p>
                </div>
            </Section>
        </div>
    </section>
)

export { Requirements }
