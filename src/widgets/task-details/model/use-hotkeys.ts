import type { RefObject } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'

import { useFocusManager } from '@/shared/focus-manager'
import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (
    visible: boolean,
    focused: boolean,
    expanded: false | 'lists' | 'task-details',
    toggleExpanded: (value: false | 'lists' | 'task-details') => void,
    scrollRef: RefObject<ScrollBoxRenderable | null>,
): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (!visible) return
        if (key.name === '2') focus('task-details')

        if (!focused) return

        if (key.name === 'return') {
            toggleExpanded('task-details')
        } else if (key.name === 'escape') {
            if (expanded) {
                toggleExpanded(false)
            } else {
                focus('task-table')
            }
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
