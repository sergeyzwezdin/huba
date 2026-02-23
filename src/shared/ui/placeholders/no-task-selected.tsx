import type { FC } from 'react'

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
            <ascii-font text="---" font="slick" color={theme.colors.hint} />
        </Panel>
    )
}

export { NoTaskSelected }
