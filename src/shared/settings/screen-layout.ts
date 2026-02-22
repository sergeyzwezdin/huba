import { atomWithStorage } from '@/shared/state'

export type TaskDetailsLayout = 'horizontal' | 'vertical'

export const showTaskDetailsAtom = atomWithStorage<boolean>('show-task-details', true)

export const taskDetailsLayoutAtom = atomWithStorage<TaskDetailsLayout>('task-details-layout', 'horizontal')

export const showProgressAtom = atomWithStorage<boolean>('show-progress', true)
