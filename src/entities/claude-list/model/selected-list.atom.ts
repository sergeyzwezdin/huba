import { atomWithStorage } from '@/shared/state'

/**
 * Minimal subset of TaskList stored in the atom.
 * Avoids serializing Date fields while keeping enough info for path resolution.
 */
export type SelectedList = {
    id: string
    path: string
    instance?: string
}

/**
 * Atom holding the currently selected task list.
 */
export const selectedListAtom = atomWithStorage<SelectedList | undefined>('list', undefined)
