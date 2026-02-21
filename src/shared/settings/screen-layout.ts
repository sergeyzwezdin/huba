import { atom } from 'jotai'

export type TaskDetailsLayout = 'horizontal' | 'vertical'

export const fullScreenAtom = atom<false | 'lists' | 'task-details'>(false)

export const showTaskDetailsAtom = atom<boolean>(true)

export const taskDetailsLayoutAtom = atom<TaskDetailsLayout>('horizontal')
