import type { FC } from 'react'

import { Card, CardContent, CardMedia, cardGradient } from '@/shared/ui/card'

import type { Feature } from '../model/features-data'

type FeatureCardProps = {
    feature: Feature
}

const FeatureCardHorizontal: FC<FeatureCardProps> = ({ feature }) => (
    <Card variant={feature.variant}>
        <div className="md:col-span-2">
            <CardMedia variant={feature.variant} image={feature.image} alt={feature.title} />
        </div>
        <CardContent variant={feature.variant}>
            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{feature.description}</p>
        </CardContent>
    </Card>
)

const FeatureCardBottomImage: FC<FeatureCardProps> = ({ feature }) => (
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
)

const FeatureCardDefault: FC<FeatureCardProps> = ({ feature }) => (
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
)

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
    if (feature.variant === 'horizontal') return <FeatureCardHorizontal feature={feature} />
    if (feature.variant === 'bottom-image') return <FeatureCardBottomImage feature={feature} />
    return <FeatureCardDefault feature={feature} />
}

export { FeatureCard }
