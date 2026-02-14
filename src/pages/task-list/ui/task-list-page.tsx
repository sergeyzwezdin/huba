import type { FC } from 'react'

import { Box, Text } from 'ink'
import useDimensions from 'ink-use-stdout-dimensions'

const TaskListPage: FC = () => {
    const [width = 80, height = 24] = useDimensions()

    return (
        <Box width={width} height={height} flexDirection="column" justifyContent="center" alignItems="center">
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
