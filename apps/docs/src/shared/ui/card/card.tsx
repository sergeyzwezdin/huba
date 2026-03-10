import type { FC, ReactNode } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassValue } from 'clsx'
import Image from 'next/image'

type CardVariant = 'default' | 'horizontal' | 'bottom-image'

const cardContainer = cva<{ variant: Record<CardVariant, ClassValue> }>('h-full', {
    variants: {
        variant: {
            default: '',
            horizontal: 'grid grid-cols-1 md:grid-cols-3',
            'bottom-image': 'flex flex-col',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

const cardContent = cva<{ variant: Record<CardVariant, ClassValue> }>('', {
    variants: {
        variant: {
            default: 'px-8 pt-6 pb-8',
            horizontal: 'flex flex-col justify-center px-8 py-8',
            'bottom-image': 'px-8 pt-8 pb-6',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

const cardMedia = cva<{ variant: Record<CardVariant, ClassValue> }>('w-full opacity-50', {
    variants: {
        variant: {
            default: 'rounded-t-2xl',
            horizontal: 'h-full rounded-t-2xl object-cover md:rounded-t-none md:rounded-l-2xl',
            'bottom-image': 'rounded-b-2xl',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

const cardGradient = cva<{ variant: Record<CardVariant, ClassValue> }>(
    'pointer-events-none absolute inset-x-0 z-10 h-8',
    {
        variants: {
            variant: {
                default: 'bottom-0 bg-gradient-to-t from-[var(--navy-100)] to-transparent',
                horizontal: '',
                'bottom-image': 'top-0 bg-gradient-to-b from-[var(--navy-100)] to-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

type CardProps = {
    variant?: CardVariant
    children: ReactNode
    className?: string
}

type CardVideo = {
    mp4: string
    webm: string
}

type CardMediaProps = VariantProps<typeof cardMedia> & {
    image?: string
    video?: CardVideo
    alt: string
}

type CardContentProps = VariantProps<typeof cardContent> & {
    children: ReactNode
}

const CardMedia: FC<CardMediaProps> = ({ variant, image, video, alt }) => {
    if (video) {
        return (
            <video autoPlay loop muted playsInline className={cardMedia({ variant })}>
                <source src={video.webm} type="video/webm" />
                <source src={video.mp4} type="video/mp4" />
            </video>
        )
    }

    if (!image) {
        return null
    }

    return <Image src={image} alt={alt} width={800} height={450} className={cardMedia({ variant })} />
}

const CardContent: FC<CardContentProps> = ({ variant, children }) => (
    <div className={cardContent({ variant })}>{children}</div>
)

const Card: FC<CardProps> = ({ variant = 'default', children, className = '' }) => (
    <div className={`${cardContainer({ variant })} ${className}`}>{children}</div>
)

export { Card, CardMedia, CardContent, cardGradient }
export type { CardVariant }
