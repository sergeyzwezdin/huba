import { existsSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

import { toast } from '@opentui-ui/toast'

import { type TaskList, taskListSchema } from '@/shared/domain'

import { getCcsInstancesWithTasks, getCcsTasksBaseDir, getTasksBaseDir } from './paths'

type TaskSource = {
    baseDir: string
    instance?: string
}

/**
 * Scan a single base directory for task list subdirectories
 */
const scanTasksDir = async (source: TaskSource): Promise<TaskList[]> => {
    const { baseDir, instance } = source

    if (!existsSync(baseDir)) return []

    try {
        const entries = await readdir(baseDir, { withFileTypes: true })

        const lists = await Promise.all(
            entries
                .filter((entry) => entry.isDirectory())
                .map(async (entry) => {
                    try {
                        const listPath = join(baseDir, entry.name)
                        const stats = await stat(listPath)

                        const listEntries = await readdir(listPath)
                        const tasksCount = listEntries.filter((name) => name.endsWith('.json')).length

                        const rawData = {
                            id: entry.name,
                            path: listPath,
                            createdAt: stats.birthtime,
                            tasksCount,
                            instance,
                        }

                        const result = taskListSchema.safeParse(rawData)
                        if (!result.success) {
                            toast.error(`Invalid task list data for ${entry.name}`)
                            return undefined
                        }

                        return result.data
                    } catch {
                        toast.error(`Failed to read task list ${entry.name}`)
                        return undefined
                    }
                }),
        )

        return lists.filter((list): list is TaskList => list !== undefined)
    } catch {
        toast.error(`Failed to scan tasks directory: ${baseDir}`)
        return []
    }
}

/**
 * Get all task lists from ~/.claude/tasks/ and CCS instance task directories.
 * Scans subdirectories and returns metadata sorted by creation date (newest first)
 */
export const getTaskLists = async (): Promise<TaskList[]> => {
    const sources: TaskSource[] = [{ baseDir: getTasksBaseDir() }]

    for (const instance of getCcsInstancesWithTasks()) {
        sources.push({ baseDir: getCcsTasksBaseDir(instance), instance })
    }

    const results = await Promise.all(sources.map(scanTasksDir))
    const allLists = results.flat()

    return allLists.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}
