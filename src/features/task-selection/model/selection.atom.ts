import { atom, useAtom } from 'jotai'

/**
 * Atom to store currently selected task index
 */
const selectedTaskIndexAtom = atom<number>(0)

/**
 * Hook to access and update selected task index
 */
export const useSelectedTaskIndex = () => useAtom(selectedTaskIndexAtom)
