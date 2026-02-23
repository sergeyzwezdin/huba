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
                Huba v.0.0.1
            </text>

            {columns > 75 && (
                <text
                    style={{ fg: theme.colors.hint }}
                    attributes={TextAttributes.ITALIC | TextAttributes.UNDERLINE | TextAttributes.DIM}>
                    <a href="https://github.com/sergeyzwezdin/huba">
                        https://github.com/sergeyzwezdin/huba
                    </a>
                </text>
            )}
        </box>
    )
}

export { Footer }
