import { useKeyboard } from '@opentui/react'

import { useFocusManager } from '@/shared/focus-manager'

const useHotkeys = (visible: boolean, focused: boolean): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (!visible) return
        if (key.name === '3') focus('task-blocked-by')

        if (!focused) return
        if (key.name === 'escape') focus('task-table')
    })
}

export { useHotkeys }
