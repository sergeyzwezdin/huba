import { atom } from 'jotai'

/** Currently selected task ID */
export const selectedTaskIdAtom = atom<string | undefined>(undefined)
