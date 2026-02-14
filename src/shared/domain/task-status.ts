import { z } from 'zod'

/**
 * Task status schema
 */
export const taskStatusSchema = z.enum(['pending', 'in_progress', 'completed'])

/**
 * Task status type
 */
export type TaskStatus = z.infer<typeof taskStatusSchema>
