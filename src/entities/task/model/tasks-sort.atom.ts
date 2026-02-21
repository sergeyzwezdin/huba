import { atom } from 'jotai'

/** Field by which tasks can be sorted */
export type TaskSortField = 'id' | 'subject' | 'status' | 'updatedAt'

/** Sort direction */
export type TaskSortDirection = 'asc' | 'desc'

/** Sort state */
export type TaskSort = {
    field: TaskSortField
    direction: TaskSortDirection
}

/** Atom holding the current task sort configuration */
export const taskSortAtom = atom<TaskSort>({ field: 'id', direction: 'asc' })
