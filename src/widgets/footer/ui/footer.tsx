import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'
import { useTerminalDimensions } from '@opentui/react'

import { useTheme } from '@/shared/settings'

const Footer: FC = () => {
    const { theme } = useTheme()
    const { width: columns } = useTerminalDimensions()

    return (
        <box style={{ flexDirection: 'row', gap: 2, paddingLeft: 1 }}>
            <text fg={theme.colors.hint} attributes={TextAttributes.BOLD}>
                Claude Tasks v.1.5.0
            </text>

            {columns > 75 && (
                <text
                    style={{ fg: theme.colors.hint }}
                    attributes={TextAttributes.ITALIC | TextAttributes.UNDERLINE | TextAttributes.DIM}>
                    <a href="https://github.com/sergeyzwezdin/claude-tasks">
                        https://github.com/sergeyzwezdin/claude-tasks
                    </a>
                </text>
            )}
        </box>
    )
}

export { Footer }
