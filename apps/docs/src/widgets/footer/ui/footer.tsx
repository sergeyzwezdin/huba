import type { FC } from 'react'

import { AUTHOR_GITHUB_URL, AUTHOR_NAME, GITHUB_ISSUES_URL, GITHUB_REPO_URL } from '@/shared/info'

const currentYear = new Date().getFullYear()
const yearDisplay = currentYear > 2026 ? `2026–${currentYear}` : '2026'

const Footer: FC = () => (
    <footer className="relative border-t border-border-subtle/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-subtle">
                    &copy; {yearDisplay} Made by{' '}
                    <a
                        href={AUTHOR_GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary transition-colors hover:text-foreground">
                        {AUTHOR_NAME}
                    </a>
                </p>
                <div className="flex items-center gap-6">
                    <a
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-subtle transition-colors hover:text-foreground">
                        GitHub
                    </a>
                    <a href="/docs" className="text-sm text-subtle transition-colors hover:text-foreground">
                        Docs
                    </a>
                    <a
                        href={GITHUB_ISSUES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-subtle transition-colors hover:text-foreground">
                        Issues
                    </a>
                </div>
            </div>
            <p className="mt-8 max-w-2xl text-xs leading-relaxed text-subtle">
                The name <em className="italic">huba</em> comes from <em className="italic">hullaballoo</em> —
                reflecting the beautiful chaos that happens when you&apos;re vibing with AI agents and shipping code at
                the speed of thought.
            </p>
        </div>
    </footer>
)

export { Footer }
