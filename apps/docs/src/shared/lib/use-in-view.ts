'use client'

import { useEffect, useRef, useState } from 'react'

const useInView = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold })
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, visible }
}

export { useInView }
