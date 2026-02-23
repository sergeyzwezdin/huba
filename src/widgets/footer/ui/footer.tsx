import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'
import { useTerminalDimensions } from '@opentui/react'

import { useTheme } from '@/shared/settings'

import { homepage, version } from '~/package.json'

const Footer: FC = () => {
    const { theme } = useTheme()
    const { width: columns } = useTerminalDimensions()

    return (
        <box style={{ flexDirection: 'row', gap: 2, paddingLeft: 2, paddingRight: 2, justifyContent: 'space-between' }}>
            <box style={{ flexDirection: 'row', gap: 2 }}>
                <text fg={theme.colors.hint} attributes={TextAttributes.BOLD}>
                    Huba v.{version}
                </text>

                {columns > 75 && (
                    <text
                        style={{ fg: theme.colors.hint }}
                        attributes={TextAttributes.ITALIC | TextAttributes.UNDERLINE | TextAttributes.DIM}>
                        <a href={homepage}>{homepage}</a>
                    </text>
                )}
            </box>

            {columns > 40 && (
                <box style={{ flexDirection: 'row', gap: 1 }}>
                    <text style={{ fg: theme.colors.hint }} attributes={TextAttributes.BOLD}>
                        [?]
                    </text>
                    <text style={{ fg: theme.colors.hint }} attributes={TextAttributes.DIM}>
                        for help
                    </text>
                </box>
            )}
        </box>
    )
}

export { Footer }
