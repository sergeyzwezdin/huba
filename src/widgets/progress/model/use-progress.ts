import { useMemo } from 'react'

import { useAtom } from 'jotai'

import { useTasksQuery } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'

export type ProgressValues = {
    items: {
        blocked: number
        pending: number
        inProgress: number
        completed: number
    }
    total: number
    progress: number
}

/**
 * Loads tasks for the selected list and computes progress counters.
 *
 * @returns Per-status counts grouped in `items`, total, and overall completion percentage
 */
export const useProgress = (): ProgressValues => {
    const [selectedList] = useAtom(selectedListAtom)
    const { data } = useTasksQuery(selectedList)
    const tasks = data?.list ?? []

    return useMemo(() => {
        const items: ProgressValues['items'] = {
            blocked: tasks.filter((t) => t.status === 'blocked').length,
            pending: tasks.filter((t) => t.status === 'pending').length,
            inProgress: tasks.filter((t) => t.status === 'in_progress').length,
            completed: tasks.filter((t) => t.status === 'completed').length,
        }

        const total = items.blocked + items.pending + items.inProgress + items.completed
        const progress = total > 0 ? Math.round((items.completed / total) * 100) : 0

        return { items, total, progress } as const
    }, [tasks])
}
