import { useAtomValue } from 'jotai'

import type { TaskFilterStatus, TaskSortField } from '@/entities/task'
import { taskFilterAtom, taskSortAtom } from '@/entities/task'

const sortLabel: Record<TaskSortField, string> = {
    id: 'ID',
    subject: 'Title',
    status: 'Status',
    updatedAt: 'UPDATED',
}

const filterLabel: Record<Exclude<TaskFilterStatus, 'all'>, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    completed: 'Completed',
}

const useTitle = (selectedIndex: number | undefined, totalCount: number) => {
    const sort = useAtomValue(taskSortAtom)
    const filter = useAtomValue(taskFilterAtom)

    const subTitle = `${sortLabel[sort.field].toUpperCase()} ${sort.direction === 'asc' ? '↑' : '↓'}`
    const footer = filter.status !== 'all' ? filterLabel[filter.status].toUpperCase() : undefined
    const subFooter = selectedIndex !== undefined ? `${selectedIndex + 1}/${totalCount}` : String(totalCount)

    return { subTitle, footer, subFooter } as const
}

export { useTitle }
