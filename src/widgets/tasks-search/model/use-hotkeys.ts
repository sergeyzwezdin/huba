import { useKeyboard } from '@opentui/react'

import { useFocusManager } from '@/shared/focus-manager'

const useHotkeys = (enabled: boolean): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (key.name === ':') focus('tasks-search')

        if (!enabled) return
    })
}

export { useHotkeys }
