import { useQuery } from '@tanstack/react-query'

import { getTaskLists } from '@/shared/api'
import type { TaskList } from '@/shared/domain'
import { queryKeys } from '@/shared/query'

/**
 * Hook to fetch all available task lists
 * Returns query result with task lists sorted by creation date (newest first)
 */
export const useTaskListsQuery = () => {
    return useQuery<TaskList[], Error>({
        queryKey: queryKeys.taskLists.all(),
        queryFn: getTaskLists,
        staleTime: 60_000, // Cache for 1 minute
    })
}
