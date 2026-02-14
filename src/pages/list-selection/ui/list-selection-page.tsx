import type { FC } from 'react'

import { Box, Text, useStdout } from 'ink'

import { TaskListRow, useTaskListsQuery } from '@/entities/task-list'
import { useListSelection } from '@/features/list-selection'
import { useSelectedTaskIndex, useTaskNavigation } from '@/features/task-selection'
import { useRouter } from '@/shared/routing'

/**
 * List selection page
 * Displays available task lists and allows user to select one
 */
const ListSelectionPage: FC = () => {
    const {
        stdout: { columns, rows },
    } = useStdout()
    const { data: taskLists, isLoading, error } = useTaskListsQuery()
    const [selectedIndex] = useSelectedTaskIndex()
    const { replace } = useRouter()

    useTaskNavigation(taskLists?.length ?? 0)

    // Get selected list ID
    const selectedListId = taskLists?.[selectedIndex]?.id ?? null

    // Handle Enter key to select list and navigate to task list page
    useListSelection(selectedListId, () => {
        replace('task-list')
    })

    if (isLoading) {
        return (
            <Box width={columns} height={rows} flexDirection="column" padding={1}>
                <Text dimColor>Loading task lists...</Text>
            </Box>
        )
    }

    if (error) {
        return (
            <Box width={columns} height={rows} flexDirection="column" padding={1}>
                <Text color="red">Error loading task lists: {String(error)}</Text>
            </Box>
        )
    }

    if (!taskLists || taskLists.length === 0) {
        return (
            <Box width={columns} height={rows} flexDirection="column" padding={1}>
                <Text color="yellow">No task lists found</Text>
                <Text dimColor>Create a task list in ~/.claude/tasks/ first</Text>
            </Box>
        )
    }

    // Single list edge case - auto-select?
    // For now, still show selection screen but could auto-select in the future

    return (
        <Box width={columns} height={rows} flexDirection="column">
            <Box padding={1} flexDirection="column">
                <Box marginBottom={1}>
                    <Text bold>Select a task list:</Text>
                </Box>
                <Box marginBottom={1}>
                    <Text bold>
                        <Text dimColor>{'List ID'.padEnd(40)}</Text> <Text dimColor>Created</Text>
                    </Text>
                </Box>
                {taskLists.map((taskList, index) => (
                    <TaskListRow key={taskList.id} taskList={taskList} isSelected={index === selectedIndex} />
                ))}
                <Box marginTop={1}>
                    <Text dimColor>Press ↑/↓ to navigate, Enter to select, q to quit</Text>
                </Box>
            </Box>
        </Box>
    )
}

export { ListSelectionPage }
