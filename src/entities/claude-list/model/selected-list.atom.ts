import { atomWithStorage } from '@/shared/state'

/**
 * Atom holding the currently selected task list ID.
 */
export const selectedListAtom = atomWithStorage<string | undefined>('list', undefined)
