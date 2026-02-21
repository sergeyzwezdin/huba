import { useQuery } from '@tanstack/react-query'

import { getTaskList } from '@/shared/api'
import type { Task } from '@/shared/domain'
import { queryKeys } from '@/shared/query'

/**
 * Hook to load all tasks from the file system
 *
 * @param listId - Optional list ID (defaults to CLAUDE_CODE_TASK_LIST_ID env var or 'default')
 */
export const useTasksQuery = (listId?: string) => {
    return useQuery({
        queryKey: queryKeys.tasks.list(listId),
        queryFn: async (): Promise<Task[]> => {
            const tasks = await getTaskList(listId)
            return tasks.sort((a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10))
        },
    })
}
