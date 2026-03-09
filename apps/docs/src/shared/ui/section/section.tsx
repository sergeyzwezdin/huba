'use client'

import type { FC, ReactNode } from 'react'

import { useInView } from '@/shared/lib/use-in-view'

type SectionProps = {
    children: ReactNode
    className?: string
    delay?: number
}

const Section: FC<SectionProps> = ({ children, className = '', delay = 0 }) => {
    const { ref, visible } = useInView()
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    )
}

export { Section }
