export type TaskStatus = 'pending' | 'blocked' | 'in_progress' | 'completed'

export interface TaskSelectOption {
    id: string
    title: string
    status: TaskStatus
    date: Date
}
