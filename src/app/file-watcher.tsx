import type { FC, PropsWithChildren } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useListsWatcher } from '@/entities/claude-list'
import { useTasksWatcher } from '@/entities/task'
import { queryKeys } from '@/shared/state'

const FileWatcher: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = useQueryClient()

    useListsWatcher(async () => await queryClient.invalidateQueries({ queryKey: queryKeys.taskLists.all() }))
    useTasksWatcher(async (listId) => await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list(listId) }))

    return children
}

export { FileWatcher }
