import { atom, useAtom } from 'jotai'

/**
 * Atom to store currently selected task list ID
 * Defaults to environment variable CLAUDE_CODE_TASK_LIST_ID
 */
const selectedListIdAtom = atom<string | null>(process.env.CLAUDE_CODE_TASK_LIST_ID ?? null)

/**
 * Hook to access and update selected task list ID
 */
export const useSelectedListId = () => {
    return useAtom(selectedListIdAtom)
}
