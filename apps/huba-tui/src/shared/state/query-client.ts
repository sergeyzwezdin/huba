import { QueryClient } from '@tanstack/react-query'

/**
 * Global TanStack Query client with default configuration
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000, // 30 seconds
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})
