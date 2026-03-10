import type { FC } from 'react'

import { GITHUB_REPO_URL, PROJECT_NAME } from '@/shared/info'
import { GitHub } from '@/shared/ui/icons'

const Nav: FC = () => (
    <nav>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="text-2xl font-bold tracking-tight text-foreground">
                {PROJECT_NAME}
            </a>
            <div className="flex items-center gap-4 sm:gap-8">
                <a href="/docs" className="text-sm text-foreground transition-colors hover:underline">
                    <span className="sm:hidden">Docs</span>
                    <span className="hidden sm:inline">Documentation</span>
                </a>
                <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:underline">
                    <GitHub className="hidden h-4 w-4 sm:block" />
                    <span className="sm:hidden">GitHub</span>
                    <span className="hidden sm:inline">Star on GitHub</span>
                </a>
            </div>
        </div>
    </nav>
)

export { Nav }
