import { useMemo } from 'react'

import { useAtomValue } from 'jotai'

import { taskSortAtom } from '@/entities/task'
import type { TaskStatus } from '@/shared/domain'
import type { Task } from '@/shared/domain/task'

const statusOrder: Record<TaskStatus, number> = { in_progress: 0, pending: 1, blocked: 2, completed: 3 }

/**
 * Sorts tasks by the current sort field and direction from taskSortAtom.
 */
const useSorted = (tasks: Task[]): Task[] => {
    const sort = useAtomValue(taskSortAtom)

    return useMemo(() => {
        const sorted = [...tasks]
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
    }, [tasks, sort])
}

export { useSorted }
