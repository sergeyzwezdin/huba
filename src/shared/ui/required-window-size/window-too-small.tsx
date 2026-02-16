import type { FC } from 'react'

import { Box, Text } from 'ink'

import { useDimensions } from '@/shared/lib'

const WindowTooSmall: FC = () => {
    const { columns, rows } = useDimensions()

    return (
        <Box width={columns} height={rows} alignItems="center" justifyContent="center">
            <Text dimColor={true}>Window is too small</Text>
        </Box>
    )
}

export { WindowTooSmall }
