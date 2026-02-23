import { existsSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

import { toast } from '@opentui-ui/toast'

import { type TaskList, taskListSchema } from '@/shared/domain'

import { getTasksBaseDir } from './paths'

/**
 * Get all task lists from ~/.claude/tasks/
 * Scans subdirectories and returns metadata sorted by creation date (newest first)
 *
 * @returns Array of task list metadata
 */
export const getTaskLists = async (): Promise<TaskList[]> => {
    const tasksBaseDir = getTasksBaseDir()

    if (!existsSync(tasksBaseDir)) return []

    // Read all entries in the tasks directory
    const entries = await readdir(tasksBaseDir, { withFileTypes: true })

    // Filter directories only and get their metadata
    const lists = await Promise.all(
        entries
            .filter((entry) => entry.isDirectory())
            .map(async (entry) => {
                const listPath = join(tasksBaseDir, entry.name)
                const stats = await stat(listPath)

                const listEntries = await readdir(listPath)
                const tasksCount = listEntries.filter((name) => name.endsWith('.json')).length

                const rawData = {
                    id: entry.name,
                    path: listPath,
                    createdAt: stats.birthtime,
                    tasksCount,
                }

                // Validate using Zod schema
                const result = taskListSchema.safeParse(rawData)
                if (!result.success) {
                    toast.error(`Invalid task list data for ${entry.name}`)
                    return undefined
                }

                return result.data
            }),
    )

    // Sort by creation date (newest first)
    return lists
        .filter((list): list is TaskList => list !== undefined)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}
