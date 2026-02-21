import { z } from 'zod'

import { taskStatusSchema } from './task-status'

/**
 * Task object schema
 * Corresponds to JSON files in ~/.claude/tasks/{list-id}/*.json
 */
export const taskSchema = z.object({
    /**
     * Task identifier (matches filename without .json extension)
     * Example: "1", "2", "setup-auth"
     */
    id: z.string(),

    /**
     * Task title/subject (imperative form)
     * Example: "Setup authentication"
     */
    subject: z.string(),

    /**
     * Detailed description of the task
     * Can be multiple paragraphs
     */
    description: z.string(),

    /**
     * Present continuous form shown when task is in progress
     * Example: "Setting up authentication"
     */
    activeForm: z.string(),

    /**
     * Current task status
     */
    status: taskStatusSchema,

    /**
     * Optional owner (agent or user who claimed the task)
     */
    owner: z.string().optional(),

    /**
     * Array of task IDs that this task blocks
     * These tasks cannot start until this one completes
     */
    blocks: z.array(z.string()).optional(),

    /**
     * Array of task IDs that block this task
     * This task cannot start until these complete
     */
    blockedBy: z.array(z.string()).optional(),

    /**
     * Optional metadata (arbitrary key-value pairs)
     */
    metadata: z.record(z.string(), z.unknown()).optional(),

    /**
     * Last modification time of the task file
     * Injected from filesystem stat, not stored in JSON
     */
    updatedAt: z.date(),
})

/**
 * Task object type
 */
export type Task = z.infer<typeof taskSchema>
