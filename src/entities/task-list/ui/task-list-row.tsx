import type { FC } from 'react'

import { Box, Text } from 'ink'

import type { TaskList } from '@/shared/domain'
import { formatDateTime } from '@/shared/formatters'

type TaskListRowProps = {
    /**
     * Task list to display
     */
    taskList: TaskList

    /**
     * Whether this list is currently selected
     */
    isSelected: boolean
}

/**
 * Single task list row component
 * Displays list ID and creation date
 */
const TaskListRow: FC<TaskListRowProps> = ({ taskList, isSelected }) => (
    <Box>
        <Text inverse={isSelected}>
            <Text>{taskList.id.padEnd(40)}</Text> <Text dimColor>{formatDateTime(taskList.createdAt)}</Text>
        </Text>
    </Box>
)

export { TaskListRow }
export type { TaskListRowProps }
