import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { getTasks } from '@/shared/api'
import type { Task, TaskStatus } from '@/shared/domain'
import { queryKeys } from '@/shared/query'

import { selectedTaskIdAtom } from './selected-task.atom'
import { taskFilterAtom } from './tasks-filter.atom'
import { taskSortAtom } from './tasks-sort.atom'

const statusOrder: Record<TaskStatus, number> = { in_progress: 0, pending: 1, blocked: 2, completed: 3 }

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
 * Hook to get filtered and sorted tasks for a list.
 * Reads sort/filter state from atoms and applies them to the raw task list.
 *
 * @param listId - Optional list ID passed to useTasksQuery
 * @returns All fields from useTasksQuery plus `data` overridden with filtered/sorted task array
 */
export const useTasks = (listId?: string): Omit<ReturnType<typeof useTasksQuery>, 'data'> & { data: Task[] } => {
    const query = useTasksQuery(listId)
    const sort = useAtomValue(taskSortAtom)
    const filter = useAtomValue(taskFilterAtom)

    const tasks = query.data?.list ?? []

    const filteredTasks = useMemo(() => {
        const query = filter.search.toLowerCase().trim()
        return tasks.filter((task) => {
            const statusMatch = filter.status === 'all' || task.status === filter.status
            const searchMatch =
                !query ||
                task.subject.toLowerCase().includes(query) ||
                (task.description ?? '').toLowerCase().includes(query)
            return statusMatch && searchMatch
        })
    }, [tasks, filter.status, filter.search])

    const sortedTasks = useMemo(() => {
        const sorted = [...filteredTasks]
        sorted.sort((a, b) => {
            let result = 0

            if (sort.field === 'id') {
                const aNum = Number(a.id)
                const bNum = Number(b.id)
                result = !Number.isNaN(aNum) && !Number.isNaN(bNum) ? aNum - bNum : a.id.localeCompare(b.id)
            } else if (sort.field === 'subject') {
                result = a.subject.localeCompare(b.subject)
            } else if (sort.field === 'status') {
                result = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0)

                if (result === 0) {
                    const aNum = Number(a.id)
                    const bNum = Number(b.id)
                    result = !Number.isNaN(aNum) && !Number.isNaN(bNum) ? aNum - bNum : a.id.localeCompare(b.id)
                }
            } else if (sort.field === 'updatedAt') {
                const aTime = a.updatedAt?.getTime() ?? 0
                const bTime = b.updatedAt?.getTime() ?? 0
                result = aTime - bTime
            }

            return sort.direction === 'asc' ? result : -result
        })
        return sorted
    }, [filteredTasks, sort])

    return { ...query, data: sortedTasks } as const
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
