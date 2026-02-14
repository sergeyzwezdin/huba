/**
 * TanStack Query keys for cache management
 */
export const queryKeys = {
    /**
     * Tasks query keys
     */
    tasks: {
        /**
         * Tasks for a specific list ID
         * @param listId - List identifier
         */
        list: (listId?: string) => ['tasks', listId ?? 'default'] as const,
    },
} as const
