import { useKeyboard } from '@opentui/react'

import { useFocusManager } from '@/shared/focus-manager'

const useHotkeys = (enabled: boolean): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (!enabled) return
        if (key.name === 'escape') focus('task-table')
    })
}

export { useHotkeys }
