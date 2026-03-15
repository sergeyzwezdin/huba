import type { FC, ReactNode } from 'react'

import { Card, CardContent, CardMedia, cardGradient } from '@/shared/ui/card'

import type { Feature } from '../model/features-data'

type FeatureCardProps = {
    feature: Feature
}

const CardLink: FC<{ href?: string; children: ReactNode }> = ({ href, children }) => {
    if (!href) return <>{children}</>
    return (
        <a href={href} className="block h-full">
            {children}
        </a>
    )
}

const FeatureCardHorizontal: FC<FeatureCardProps> = ({ feature }) => (
    <CardLink href={feature.link}>
        <Card variant={feature.variant}>
            <div className="md:col-span-2">
                <CardMedia variant={feature.variant} image={feature.image} alt={feature.title} />
            </div>
            <CardContent variant={feature.variant}>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </CardContent>
        </Card>
    </CardLink>
)

const FeatureCardBottomImage: FC<FeatureCardProps> = ({ feature }) => (
    <CardLink href={feature.link}>
        <Card variant={feature.variant}>
            <CardContent variant={feature.variant}>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </CardContent>
            <div className="relative mt-auto">
                <div className={cardGradient({ variant: feature.variant })} />
                <CardMedia variant={feature.variant} image={feature.image} alt={feature.title} />
            </div>
        </Card>
    </CardLink>
)

const FeatureCardDefault: FC<FeatureCardProps> = ({ feature }) => (
    <CardLink href={feature.link}>
        <Card variant={feature.variant}>
            <div className="relative">
                <CardMedia variant={feature.variant} image={feature.image} video={feature.video} alt={feature.title} />
                <div className={cardGradient({ variant: feature.variant })} />
            </div>
            <CardContent variant={feature.variant}>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </CardContent>
        </Card>
    </CardLink>
)

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
    if (feature.variant === 'horizontal') return <FeatureCardHorizontal feature={feature} />
    if (feature.variant === 'bottom-image') return <FeatureCardBottomImage feature={feature} />
    return <FeatureCardDefault feature={feature} />
}

export { FeatureCard }
