import { atom } from 'jotai'

import type { TaskStatus } from '@/shared/domain'

/** Filter value: a specific status or 'all' */
export type TaskFilterStatus = TaskStatus | 'all'

/** Filter state */
export type TaskFilter = {
    status: TaskFilterStatus
}

/** Atom holding the current task filter configuration */
export const taskFilterAtom = atom<TaskFilter>({ status: 'all' })
