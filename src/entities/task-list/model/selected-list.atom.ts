import { atom } from 'jotai'

/**
 * Atom holding the currently selected task list ID.
 * Defaults to the CLAUDE_CODE_TASK_LIST_ID environment variable if set.
 */
export const selectedListAtom = atom<string | undefined>(process.env.CLAUDE_CODE_TASK_LIST_ID ?? undefined)
