import type { FC } from 'react'

import { rgbToHex } from '@opentui/core'

import { useTheme } from '@/shared/settings'

const NotFoundPage: FC = () => {
    const { theme } = useTheme()

    return (
        <box
            border
            borderStyle="rounded"
            borderColor={rgbToHex(theme.border.default)}
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
            }}>
            <ascii-font text="404" font="slick" color={rgbToHex(theme.colors.hint)} />
            <text fg={theme.colors.secondary}>Page not found</text>
        </box>
    )
}

export { NotFoundPage }
