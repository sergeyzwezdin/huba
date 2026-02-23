import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

import type { Task, TaskStatus } from '@/shared/domain'

import { getTask } from './get-task'
import { getTasksDir } from './paths'

export type TasksData = {
    list: Task[]
    map: Record<string, Task>
}

/**
 * Read all task files for a given list ID
 *
 * @param listId - Optional list ID
 * @returns Object with `list` (sorted array) and `map` (tasks indexed by id)
 */
export const getTasks = async (listId?: string): Promise<TasksData> => {
    if (!listId) return { list: [], map: {} }

    const dirPath = getTasksDir(listId)

    if (!existsSync(dirPath)) return { list: [], map: {} }

    try {
        const files = await readdir(dirPath)
        const jsonFiles = files.filter((file) => file.endsWith('.json'))

        const taskIds = jsonFiles.map((file) => file.replace(/\.json$/, ''))
        const result = await Promise.all(taskIds.map((taskId) => getTask(taskId, listId)))

        const rawList: Task[] = result.filter((task): task is Task => task !== undefined)
        const list = resolveBlockedStatuses(rawList).sort((a, b) => {
            const aNum = Number(a.id)
            const bNum = Number(b.id)
            return !Number.isNaN(aNum) && !Number.isNaN(bNum) ? aNum - bNum : a.id.localeCompare(b.id)
        })

        const map: Record<string, Task> = Object.fromEntries(list.map((task) => [task.id, task]))

        return { list, map } as const
    } catch (error) {
        console.error(`Error reading tasks from ${dirPath}:`, error)
        return { list: [], map: {} }
    }
}

/**
 * Resolve effective statuses for tasks based on their dependency graph.
 *
 * - `in_progress` / `completed` tasks keep their file status
 * - `pending` tasks with any non-completed blocker become `blocked`
 * - Missing blocker references are ignored
 * - Circular dependencies resolve to `blocked`
 *
 * Complexity: O(N + E) where N = tasks, E = total blockedBy edges.
 * Each task is resolved at most once via memoization.
 *
 * @param tasks - Array of tasks with file-level statuses
 * @returns New array with computed effective statuses
 */
const resolveBlockedStatuses = (tasks: Task[]): Task[] => {
    const taskMap = new Map<string, Task>()
    for (const task of tasks) {
        taskMap.set(task.id, task)
    }

    const cache = new Map<string, TaskStatus>()

    const resolve = (taskId: string, visiting: Set<string>): TaskStatus => {
        const cached = cache.get(taskId)
        if (cached !== undefined) return cached

        const task = taskMap.get(taskId)
        if (!task) return 'completed' // missing ref → ignored (does not block)

        if (task.status !== 'pending') {
            cache.set(taskId, task.status)
            return task.status
        }

        const blockers = task.blockedBy
        if (!blockers || blockers.length === 0) {
            cache.set(taskId, 'pending')
            return 'pending'
        }

        // Circular dependency → blocked
        if (visiting.has(taskId)) {
            cache.set(taskId, 'blocked')
            return 'blocked'
        }

        visiting.add(taskId)

        let status: TaskStatus = 'pending'
        for (const blockerId of blockers) {
            if (!taskMap.has(blockerId)) continue
            const blockerStatus = resolve(blockerId, visiting)
            if (blockerStatus !== 'completed') {
                status = 'blocked'
                break
            }
        }

        visiting.delete(taskId)
        cache.set(taskId, status)

        return status
    }

    return tasks.map((task) => {
        const status = resolve(task.id, new Set())
        return status !== task.status ? { ...task, status } : task
    })
}
