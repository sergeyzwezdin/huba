import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

import type { Task } from '@/shared/domain'
import { taskSchema } from '@/shared/domain'

import { getTasksDir } from './paths'

/**
 * Read and parse a single task file
 * Returns null if file is invalid or doesn't exist
 *
 * @param taskId - Task identifier (filename without .json extension)
 * @param listId - Optional list ID (defaults to CLAUDE_CODE_TASK_LIST_ID env var or 'default')
 */
export const getTask = async (taskId: string, listId?: string): Promise<Task | null> => {
    const dirPath = getTasksDir(listId)
    const filePath = join(dirPath, `${taskId}.json`)

    try {
        const [content, fileStat] = await Promise.all([readFile(filePath, 'utf-8'), stat(filePath)])
        const data = JSON.parse(content)

        const result = taskSchema.safeParse({ ...data, updatedAt: fileStat.mtime })

        if (!result.success) {
            console.error(`Invalid task data in ${filePath}:`, result.error)
            return null
        }

        return result.data
    } catch (error) {
        console.error(`Error reading task file ${filePath}:`, error)
        return null
    }
}
