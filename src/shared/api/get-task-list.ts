import { readdir } from 'node:fs/promises'

import type { Task } from '@/shared/domain'

import { getTask } from './get-task'
import { getTasksDir } from './paths'

/**
 * Read all task files for a given list ID
 * Returns array of valid tasks, skipping invalid files
 *
 * @param listId - Optional list ID (defaults to CLAUDE_TASKS_LIST_ID env var or 'default')
 */
export const getTaskList = async (listId?: string): Promise<Task[]> => {
    const dirPath = getTasksDir(listId)

    try {
        const files = await readdir(dirPath)
        const jsonFiles = files.filter((file) => file.endsWith('.json'))

        const tasks = jsonFiles.map((file) => file.replace(/\.json$/, ''))
        const result = await Promise.all(tasks.map((taskId) => getTask(taskId, listId)))

        return result.filter((task): task is Task => !!task)
    } catch (error) {
        console.error(`Error reading tasks from ${dirPath}:`, error)
        return []
    }
}
