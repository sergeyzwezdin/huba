import type { FC } from 'react'

import { Box, Text } from 'ink'

import type { Task } from '@/shared/domain'

type TaskRowProps = {
    /**
     * Task to display
     */
    task: Task

    /**
     * Whether this task is currently selected
     */
    isSelected: boolean
}

/**
 * Get status icon and color for a task
 */
const getStatusDisplay = (status: Task['status']): { icon: string; color: string; label: string } => {
    switch (status) {
        case 'pending':
            return { icon: '○', color: 'gray', label: 'pending' }
        case 'in_progress':
            return { icon: '◐', color: 'yellow', label: 'in progress' }
        case 'completed':
            return { icon: '●', color: 'green', label: 'completed' }
    }
}

/**
 * Single task row component
 * Displays task ID, status icon, status label, and title
 */
const TaskRow: FC<TaskRowProps> = ({ task, isSelected }) => {
    const { icon, color, label } = getStatusDisplay(task.status)

    return (
        <Box>
            <Text inverse={isSelected}>
                <Text dimColor>{task.id.padEnd(4)}</Text> <Text color={color}>{icon}</Text>{' '}
                <Text color={color}>{label.padEnd(12)}</Text> <Text>{task.subject}</Text>
            </Text>
        </Box>
    )
}

export { TaskRow }
export type { TaskRowProps }
