import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'

import { useTheme } from '@/shared/settings'

const NoTasksFound: FC = () => {
    const { theme } = useTheme()

    return (
        <box
            style={{
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
            }}>
            <text
                style={{ fg: theme.colors.hint }}
                attributes={TextAttributes.DIM}
                content={`
 /\\_/\\
( o.o )
 > ^ <`}></text>
            <text style={{ fg: theme.colors.hint }}>All done</text>
        </box>
    )
}

export { NoTasksFound }
