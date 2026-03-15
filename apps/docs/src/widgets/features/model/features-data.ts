import type { CardVariant } from '@/shared/ui/card'

export type Feature = {
    title: string
    description: string
    image?: string
    video?: {
        mp4: string
        webm: string
    }
    link?: string

    variant: CardVariant
    columnSpan: number
}

export const FEATURES: Feature[] = [
    {
        title: 'Live reload',
        description:
            'File watchers pick up changes the moment Claude Code updates a task. No refresh button, no re-running commands. You see it as it happens.',
        video: { mp4: '/features/live-reload.mp4', webm: '/features/live-reload.webm' },
        link: '/docs/task-management#real-time-updates',
        variant: 'default',
        columnSpan: 2,
    },
    {
        title: 'Multi-project',
        description: 'Switch between task lists from all your Claude Code projects. One tool, every project.',
        image: '/features/multi-project.webp',
        link: '/docs/task-lists',
        variant: 'default',
        columnSpan: 2,
    },
    {
        title: 'Dependency graph',
        description:
            'See what blocks what at a glance. Every task shows its blockers and what it unblocks — so you always know where to focus.',
        image: '/features/dependency-graph.webp',
        link: '/docs/task-management#dependencies',
        variant: 'default',
        columnSpan: 2,
    },
    {
        title: 'Filter & sort',
        description:
            'Slice through tasks by status, search by keywords, sort by ID, title, status, or date. Find what you need in seconds.',
        image: '/features/filter-sort.webp',
        link: '/docs/task-management#filtering',
        variant: 'bottom-image',
        columnSpan: 3,
    },
    {
        title: 'Progress tracking',
        description:
            'Visual completion percentage across all tasks. See how many are pending, in progress, or done — toggle it on when you need the big picture.',
        image: '/features/progress-tracking.webp',
        link: '/docs/task-management#progress-tracking',
        variant: 'bottom-image',
        columnSpan: 3,
    },
    {
        title: 'Keyboard-first',
        description:
            'Fully navigable without touching the mouse. Every action has a shortcut. Navigate panels, toggle views, search, sort, filter — all from the keyboard.',
        video: { mp4: '/features/keyboard-first.mp4', webm: '/features/keyboard-first.webm' },
        link: '/docs/keyboard-shortcuts',
        variant: 'default',
        columnSpan: 2,
    },
    {
        title: 'Theming',
        description: '5 built-in themes — switch with a single keystroke. Want something custom? Create your own.',
        image: '/features/theming.webp',
        link: '/docs/themes',
        variant: 'horizontal',
        columnSpan: 4,
    },
]
