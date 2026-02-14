import { useApp, useInput } from 'ink'

import { queryClient } from '@/shared/query'

/**
 * Hook to enable graceful application exit
 * Handles 'q' key press and cleanup
 *
 * Cleanup includes:
 * - Clearing TanStack Query cache
 * - Exiting the application
 *
 * Note: Ctrl+C (SIGINT) is handled automatically by Ink
 */
export const useAppQuit = (): void => {
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
