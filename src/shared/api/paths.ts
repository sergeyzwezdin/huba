import { homedir } from 'node:os'
import { join } from 'node:path'

/**
 * Get the base Claude directory path
 */
export const getClaudeDir = (): string => {
    return join(homedir(), '.claude')
}

/**
 * Get the tasks directory path for a specific list ID
 * If no listId provided, uses environment variable CLAUDE_TASKS_LIST_ID
 */
export const getTasksDir = (listId?: string): string => {
    const id = listId ?? process.env.CLAUDE_TASKS_LIST_ID ?? 'default'
    return join(getClaudeDir(), 'tasks', id)
}
