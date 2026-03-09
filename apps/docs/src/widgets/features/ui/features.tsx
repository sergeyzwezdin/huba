import type { FC } from 'react'

import { Section } from '@/shared/ui/section'

import { FEATURES } from '../model/features-data'
import { FeatureCard } from './feature-card'

const COLUMN_SPAN_CLASS: Record<number, string> = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
}

const Features: FC = () => (
    <section className="relative py-12 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
            <Section>
                <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
                    Sharp where it matters.
                    <br />
                    <span className="text-subtle">Quiet where it doesn&apos;t.</span>
                </h2>
            </Section>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:justify-items-start md:grid-cols-6">
                {FEATURES.map((feature, i) => (
                    <Section
                        key={feature.title}
                        delay={i * 80}
                        className={`sm:w-3/4 md:w-auto ${COLUMN_SPAN_CLASS[feature.columnSpan]}`}>
                        <div className="feature-card h-full !p-0">
                            <FeatureCard feature={feature} />
                        </div>
                    </Section>
                ))}
            </div>
        </div>
    </section>
)

export { Features }
