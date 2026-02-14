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
})

/**
 * Task list metadata type
 */
export type TaskList = z.infer<typeof taskListSchema>
