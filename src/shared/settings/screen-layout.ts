import { atom } from 'jotai'

import { atomWithStorage } from '@/shared/state'

export type TaskDetailsLayout = 'horizontal' | 'vertical'

export const fullScreenAtom = atom<false | 'lists' | 'task-details'>(false)

export const showTaskDetailsAtom = atomWithStorage<boolean>('show-task-details', true)

export const taskDetailsLayoutAtom = atomWithStorage<TaskDetailsLayout>('task-details-layout', 'horizontal')
