import type { FC } from 'react'

import { useTheme } from '@/shared/settings'

const WindowTooSmall: FC = () => {
    const { theme } = useTheme()

    return (
        <box
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
            }}>
            <ascii-font text="Oops!" font="slick" color={theme.colors.hint} />
            <text fg={theme.colors.secondary}>Window is too small</text>
        </box>
    )
}

export { WindowTooSmall }
