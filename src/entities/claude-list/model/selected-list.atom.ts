import { atomWithStorage } from 'jotai/utils'

/**
 * Atom holding the currently selected task list ID.
 * Defaults to the CLAUDE_CODE_TASK_LIST_ID environment variable if set.
 */
export const selectedListAtom = atomWithStorage<string | undefined>(
    'list',
    process.env.CLAUDE_CODE_TASK_LIST_ID ?? undefined,
)
