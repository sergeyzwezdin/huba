import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { getTasks } from '@/shared/api'
import type { Task } from '@/shared/domain'
import { queryKeys } from '@/shared/query'

import { selectedTaskIdAtom } from './selected-task.atom'

/**
 * Hook to load all tasks from the file system
 *
 * @param listId - Optional list ID (defaults to CLAUDE_CODE_TASK_LIST_ID env var or 'default')
 * @returns Query result with `data.list` (sorted array) and `data.map` (tasks indexed by id)
 */
export const useTasksQuery = (listId?: string) => {
    return useQuery({
        queryKey: queryKeys.tasks.list(listId),
        queryFn: () => getTasks(listId),
    })
}

/**
 * Hook to get the currently selected task
 *
 * @param listId - Optional list ID passed to useTasksQuery
 */
export const useSelectedTask = (listId?: string): Task | undefined => {
    const selectedId = useAtomValue(selectedTaskIdAtom)
    const { data } = useTasksQuery(listId)
    return selectedId !== undefined ? data?.map[selectedId] : undefined
}

/**
 * Hook to get tasks blocked by the currently selected task
 *
 * @param listId - Optional list ID passed to useTasksQuery
 */
export const useSelectedTasksBlocks = (listId?: string): Task[] => {
    const selectedTask = useSelectedTask(listId)
    const { data } = useTasksQuery(listId)
    return useMemo(
        () => (selectedTask?.blocks ?? []).map((id) => data?.map[id]).filter((task) => task !== undefined),
        [selectedTask, data],
    )
}

/**
 * Hook to get tasks that block the currently selected task
 *
 * @param listId - Optional list ID passed to useTasksQuery
 */
export const useSelectedTasksBlockedBy = (listId?: string): Task[] => {
    const selectedTask = useSelectedTask(listId)
    const { data } = useTasksQuery(listId)
    return useMemo(
        () => (selectedTask?.blockedBy ?? []).map((id) => data?.map[id]).filter((task) => task !== undefined),
        [selectedTask, data],
    )
}
