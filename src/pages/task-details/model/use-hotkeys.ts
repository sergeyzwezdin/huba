import type { RefObject } from 'react'
import { useNavigate } from 'react-router'

import type { ScrollBoxRenderable } from '@opentui/core'

import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (scrollRef: RefObject<ScrollBoxRenderable | null>): void => {
    const navigate = useNavigate()

    useKeyboard((key) => {
        if (key.name === 'escape') {
            navigate(-1)
        } else if (key.name === 'up' || key.name === 'k') {
            scrollRef.current?.scrollBy(-1)
        } else if (key.name === 'down' || key.name === 'j') {
            scrollRef.current?.scrollBy(1)
        } else {
            scrollRef.current?.handleKeyPress(key)
        }
    })
}

export { useHotkeys }
