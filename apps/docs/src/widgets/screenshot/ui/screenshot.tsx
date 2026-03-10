import type { FC } from 'react'

import Image from 'next/image'

import { Section } from '@/shared/ui/section'

const Screenshot: FC = () => (
    <Section className="relative px-6 pb-8 sm:pb-32">
        <div className="mx-auto max-w-5xl">
            <Image
                src="/huba.webp"
                alt="Huba TUI screenshot"
                width={1024}
                height={640}
                className="screenshot-placeholder"
            />
            <p className="text-center text-sm text-subtle">
                Browse tasks, review descriptions, track dependencies — all in a single terminal pane.
            </p>
        </div>
    </Section>
)

export { Screenshot }
