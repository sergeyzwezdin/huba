import { homedir } from 'node:os'
import { join } from 'node:path'

/**
 * Get the base Claude directory path
 */
export const getClaudeDir = (): string => {
    return join(homedir(), '.claude')
}

/**
 * Get the base tasks directory path (contains all task list subdirectories)
 */
export const getTasksBaseDir = (): string => {
    return join(getClaudeDir(), 'tasks')
}

/**
 * Get the tasks directory path for a specific list ID
 */
export const getTasksDir = (listId: string): string => {
    return join(getTasksBaseDir(), listId)
}
