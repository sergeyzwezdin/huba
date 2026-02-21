import type { TaskStatus } from '@/shared/domain'
import { atomWithStorage } from '@/shared/state'

/** Filter value: a specific status or 'all' */
export type TaskFilterStatus = TaskStatus | 'all'

/** Filter state */
export type TaskFilter = {
    status: TaskFilterStatus
    search: string
}

/** Atom holding the current task filter configuration */
export const taskFilterAtom = atomWithStorage<TaskFilter>('filter', { status: 'all', search: '' })
