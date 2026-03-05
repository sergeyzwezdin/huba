import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/**
 * Get the base Claude directory path
 */
export const getClaudeDir = (): string => {
    return join(homedir(), '.claude')
}

/**
 * Get the base CCS directory path
 */
export const getCcsDir = (): string => {
    return join(homedir(), '.ccs')
}

/**
 * Get the CCS instances directory path
 */
export const getCcsInstancesDir = (): string => {
    return join(getCcsDir(), 'instances')
}

/**
 * Get the base tasks directory path (contains all task list subdirectories)
 */
export const getTasksBaseDir = (): string => {
    return join(getClaudeDir(), 'tasks')
}

/**
 * Get the base tasks directory path for a CCS instance
 */
export const getCcsTasksBaseDir = (instance: string): string => {
    return join(getCcsInstancesDir(), instance, 'tasks')
}

/**
 * Discover all CCS instance names that have a tasks/ subdirectory
 */
export const getCcsInstancesWithTasks = (): string[] => {
    const instancesDir = getCcsInstancesDir()
    if (!existsSync(instancesDir)) return []

    try {
        const entries = readdirSync(instancesDir, { withFileTypes: true })
        return entries
            .filter((entry) => entry.isDirectory() && existsSync(join(instancesDir, entry.name, 'tasks')))
            .map((entry) => entry.name)
    } catch {
        return []
    }
}
