import type { FC } from 'react'

import { Box, Text } from 'ink'

import { TaskRow, useTasksQuery } from '@/entities/task'
import { useSelectedListId } from '@/features/list-selection'
import { useSelectedTaskIndex, useTaskNavigation } from '@/features/task-selection'

/**
 * Task table widget
 * Displays a list of all tasks with selection support
 */
const TaskTable: FC = () => {
    const [selectedListId] = useSelectedListId()
    const { data: tasks, isLoading, error } = useTasksQuery(selectedListId ?? undefined)
    const [selectedIndex] = useSelectedTaskIndex()
    useTaskNavigation(tasks?.length ?? 0)

    if (isLoading) {
        return (
            <Box padding={1}>
                <Text dimColor>Loading tasks...</Text>
            </Box>
        )
    }

    if (error) {
        return (
            <Box padding={1}>
                <Text color="red">Error loading tasks: {String(error)}</Text>
            </Box>
        )
    }

    if (!tasks || tasks.length === 0) {
        return (
            <Box padding={1}>
                <Text dimColor>No tasks found</Text>
            </Box>
        )
    }

    return (
        <Box flexDirection="column" padding={1}>
            <Box marginBottom={1}>
                <Text bold>
                    <Text dimColor>{'ID'.padEnd(4)}</Text> <Text dimColor>{'Status'.padEnd(14)}</Text>{' '}
                    <Text dimColor>Title</Text>
                </Text>
            </Box>
            {tasks.map((task, index) => (
                <TaskRow key={task.id} task={task} isSelected={index === selectedIndex} />
            ))}
        </Box>
    )
}

export { TaskTable }
