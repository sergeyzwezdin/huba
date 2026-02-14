import { useQuery } from '@tanstack/react-query'

import { getTaskList } from '@/shared/api'
import type { Task } from '@/shared/domain'
import { queryKeys } from '@/shared/keys'

/**
 * Hook to load all tasks from the file system
 *
 * @param listId - Optional list ID (defaults to CLAUDE_TASKS_LIST_ID env var or 'default')
 */
export const useTasksQuery = (listId?: string) => {
    return useQuery({
        queryKey: queryKeys.tasks.list(listId),
        queryFn: async (): Promise<Task[]> => {
            return getTaskList(listId)
        },
    })
}
