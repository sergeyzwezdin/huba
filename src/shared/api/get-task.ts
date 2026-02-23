import { existsSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

import type { Task } from '@/shared/domain'
import { taskSchema } from '@/shared/domain'

import { getTasksDir } from './paths'

/**
 * Read and parse a single task file
 * Returns undefined if file doesn't exist or is invalid
 *
 * @param taskId - Task identifier (filename without .json extension)
 * @param listId - Optional list ID
 */
export const getTask = async (taskId: string, listId?: string): Promise<Task | undefined> => {
    if (!listId) return undefined

    const dirPath = getTasksDir(listId)
    const filePath = join(dirPath, `${taskId}.json`)

    if (!existsSync(filePath)) return undefined

    try {
        const [content, fileStat] = await Promise.all([readFile(filePath, 'utf-8'), stat(filePath)])
        const data = JSON.parse(content)

        const result = taskSchema.safeParse({ ...data, updatedAt: fileStat.mtime })

        if (!result.success) {
            console.error(`Invalid task data in ${filePath}:`, result.error)
            return undefined
        }

        return result.data
    } catch (error) {
        console.error(`Error reading task file ${filePath}:`, error)
        return undefined
    }
}
