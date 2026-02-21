import type { FC, PropsWithChildren } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useTasksWatcher } from '@/entities/task'
import { useTaskListWatcher } from '@/entities/task-list'
import { queryKeys } from '@/shared/query'

const FileWatcher: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = useQueryClient()

    useTaskListWatcher(async () => await queryClient.invalidateQueries({ queryKey: queryKeys.taskLists.all() }))
    useTasksWatcher(async (listId) => await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list(listId) }))

    return children
}

export { FileWatcher }
