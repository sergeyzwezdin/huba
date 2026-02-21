import { useKeyboard, useRenderer } from '@opentui/react'

import { queryClient } from '@/shared/state'

/**
 * Enables graceful application exit on `q` key press.
 *
 * Before exiting, clears the TanStack Query cache to avoid
 * any dangling async work. Ctrl+C is handled automatically by OpenTUI.
 */
const useAppQuit = (): void => {
    const renderer = useRenderer()

    useKeyboard((key) => {
        if (key.name === 'q' && !key.ctrl && !key.meta) {
            queryClient.clear()
            renderer.destroy()
        }
    })
}

export { useAppQuit }
