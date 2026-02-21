import type { RefObject } from 'react'

import { useKeyboard } from '@opentui/react'

import type { ClaudeListSelectRenderable } from '@/entities/claude-list'
import { useFocusManager } from '@/shared/focus-manager'

const useHotkeys = (
    enabled: boolean,
    fullScreen: false | 'lists' | 'task-details',
    setFullScreen: (value: false | 'lists' | 'task-details') => void,
    selectRef: RefObject<ClaudeListSelectRenderable | null>,
): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (key.shift && key.name === 'l') {
            focus('lists-table')
            setFullScreen('lists')
        }

        if (!enabled) return

        if (key.name === 'escape') {
            if (!fullScreen) {
                focus('task-table')
            } else {
                setFullScreen(false)
            }
            return
        } else if (key.name === 'return' && fullScreen !== 'lists') {
            setFullScreen('lists')
            return
        }

        selectRef.current?.handleKeyPress(key)
    })
}

export { useHotkeys }
