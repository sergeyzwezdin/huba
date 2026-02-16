import { useApp, useInput } from 'ink'

import { queryClient } from '@/shared/query'

/**
 * Enables graceful application exit on `q` key press.
 *
 * Before exiting, clears the TanStack Query cache to avoid
 * any dangling async work. Ctrl+C (SIGINT) is handled automatically by Ink.
 */
const useAppQuit = (): void => {
    const { exit } = useApp()

    useInput((input, key) => {
        // Handle 'q' key press
        if (input === 'q' && !key.ctrl && !key.meta) {
            // Clear query cache
            queryClient.clear()

            // Exit application
            exit()
        }
    })
}

export { useAppQuit }
