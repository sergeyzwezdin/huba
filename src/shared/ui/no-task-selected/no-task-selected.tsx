import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'

import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'

const NoTaskSelected: FC = () => {
    const { theme } = useTheme()

    return (
        <Panel
            style={{
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
            }}>
            <ascii-font text="=" font="slick" color={theme.colors.hint} />
            <text fg={theme.colors.hint} attributes={TextAttributes.DIM}>
                No task selected
            </text>
        </Panel>
    )
}

export { NoTaskSelected }
