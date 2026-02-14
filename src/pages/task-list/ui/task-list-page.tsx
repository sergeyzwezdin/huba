import type { FC } from 'react'

import { Box, useStdout } from 'ink'

import { TaskTable } from '@/widgets/task-table'

const TaskListPage: FC = () => {
    const {
        stdout: { columns, rows },
    } = useStdout()

    return (
        <Box width={columns} height={rows} flexDirection="column">
            <TaskTable />
        </Box>
    )
}

export { TaskListPage }
