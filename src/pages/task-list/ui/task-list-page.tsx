import type { FC } from 'react'

import { Box, Text, useStdout } from 'ink'

const TaskListPage: FC = () => {
    const {
        stdout: { columns, rows },
    } = useStdout()

    return (
        <Box width={columns} height={rows} flexDirection="column" justifyContent="center" alignItems="center">
            <Text color="cyan">
                {`
  ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
 ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
 ██║     ██║     ███████║██║   ██║██║  ██║█████╗
 ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
 ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝

 ████████╗ █████╗ ███████╗██╗  ██╗███████╗
 ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
    ██║   ███████║███████╗█████╔╝ ███████╗
    ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
    ██║   ██║  ██║███████║██║  ██╗███████║
    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
        `}
            </Text>
            <Text dimColor>Claude Code Task List with Ease</Text>
        </Box>
    )
}

export { TaskListPage }
