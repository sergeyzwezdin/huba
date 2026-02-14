/**
 * Task status enumeration
 */
export type TaskStatus = 'pending' | 'in_progress' | 'completed'

/**
 * Task object structure
 * Corresponds to JSON files in ~/.claude/tasks/{list-id}/*.json
 */
export type Task = {
    /**
     * Task identifier (matches filename without .json extension)
     * Example: "1", "2", "setup-auth"
     */
    id: string

    /**
     * Task title/subject (imperative form)
     * Example: "Setup authentication"
     */
    subject: string

    /**
     * Detailed description of the task
     * Can be multiple paragraphs
     */
    description: string

    /**
     * Present continuous form shown when task is in progress
     * Example: "Setting up authentication"
     */
    activeForm: string

    /**
     * Current task status
     */
    status: TaskStatus

    /**
     * Optional owner (agent or user who claimed the task)
     */
    owner?: string

    /**
     * Array of task IDs that this task blocks
     * These tasks cannot start until this one completes
     */
    blocks?: string[]

    /**
     * Array of task IDs that block this task
     * This task cannot start until these complete
     */
    blockedBy?: string[]

    /**
     * Optional metadata (arbitrary key-value pairs)
     */
    metadata?: Record<string, unknown>
}

/**
 * Type guard to check if a value is a valid TaskStatus
 */
export const isValidStatus = (status: unknown): status is TaskStatus => {
    return ['pending', 'in_progress', 'completed'].includes(status as string)
}

/**
 * Type guard to validate if data conforms to Task type
 */
export const isValidTask = (data: unknown): data is Task => {
    if (typeof data !== 'object' || data === null) {
        return false
    }

    const task = data as Record<string, unknown>

    return (
        typeof task.id === 'string' &&
        typeof task.subject === 'string' &&
        typeof task.description === 'string' &&
        typeof task.activeForm === 'string' &&
        isValidStatus(task.status)
    )
}

/**
 * Default values for optional Task fields
 */
export const DEFAULT_TASK: Partial<Task> = {
    subject: 'Untitled Task',
    description: '',
    status: 'pending',
    blocks: [],
    blockedBy: [],
}
