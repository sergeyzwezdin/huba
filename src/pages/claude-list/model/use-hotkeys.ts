import type { RefObject } from 'react'
import { useNavigate } from 'react-router'

import type { ClaudeListSelectRenderable } from '@/entities/claude-list'
import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (focused: boolean, selectRef: RefObject<ClaudeListSelectRenderable | null>): void => {
    const navigate = useNavigate()

    useKeyboard((key) => {
        if (key.name === 'escape') {
            navigate('/')
            return
        }

        if (focused) {
            selectRef.current?.handleKeyPress(key)
        }
    })
}

export { useHotkeys }
