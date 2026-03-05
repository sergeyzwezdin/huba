import { z } from 'zod'

/**
 * Task list metadata schema
 * Represents a subdirectory in ~/.claude/tasks/
 */
export const taskListSchema = z.object({
    /**
     * List ID (directory name)
     */
    id: z.string(),

    /**
     * Full path to the list directory
     */
    path: z.string(),

    /**
     * Directory creation date
     */
    createdAt: z.date(),

    /**
     * Number of task JSON files in the list directory
     */
    tasksCount: z.number().int().nonnegative(),

    /**
     * CCS instance name (e.g. "personal", "bluprynt").
     * Undefined for lists from ~/.claude/tasks/
     */
    instance: z.string().optional(),
})

/**
 * Task list metadata type
 */
export type TaskList = z.infer<typeof taskListSchema>
