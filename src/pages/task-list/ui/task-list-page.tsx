import type { FC } from 'react'
import { useEffect } from 'react'

import { Box, Text, useFocusManager } from 'ink'
import Link from 'ink-link'

import { useDimensions } from '@/shared/lib'
import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { ListsTable } from '@/widgets/lists-table'
import { Progress } from '@/widgets/progress'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'
import { TaskTable } from '@/widgets/task-table'
import { TasksSearch } from '@/widgets/tasks-search'
import { TasksStatusFilter } from '@/widgets/tasks-status-filter'

const TaskListPage: FC = () => {
    const { columns, rows } = useDimensions()
    const { focus } = useFocusManager()

    useEffect(() => {
        focus('task-table')
    }, [focus])

    return (
        <RequiredWindowSize minWidth={70} minHeight={20}>
            <Box width={columns} height={rows} flexDirection="column" paddingLeft={1} paddingRight={1}>
                <Box flexDirection="row">
                    <TasksStatusFilter width={16} />
                    <TasksSearch flexGrow={1} />
                    <ListsTable width={20} />
                </Box>
                <Box flexGrow={1} flexDirection="row">
                    <TaskTable flexGrow={1} flexBasis={1} />
                    <Box flexDirection="column" flexGrow={1} flexBasis={1}>
                        <TaskDetails flexGrow={1} />
                        <TaskBlockedBy />
                        <TaskBlocks />
                    </Box>
                </Box>
                <Progress />
                <Box paddingLeft={1}>
                    <Link url="https://github.com/sergeyzwezdin/claude-tasks">
                        <Text color="cyan">Claude Tasks v.1.5.0</Text>
                    </Link>
                </Box>
            </Box>
        </RequiredWindowSize>
    )
}

export { TaskListPage }
