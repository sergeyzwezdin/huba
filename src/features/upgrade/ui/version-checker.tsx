import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'

import { useTheme } from '@/shared/settings'

import { useUpdateAvailable } from '../model/use-update-available'

const VersionChecker: FC = () => {
    const { newVersionAvailable, latestVersion } = useUpdateAvailable()
    const { theme } = useTheme()

    if (!newVersionAvailable) return null

    return (
        <box style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 2, paddingRight: 2 }}>
            <text fg={theme.colors.accent} attributes={TextAttributes.BOLD}>
                New version available: {latestVersion}. Run:{' '}
            </text>
            <text fg={theme.colors.primary} attributes={TextAttributes.BOLD | TextAttributes.ITALIC}>
                brew upgrade huba
            </text>
        </box>
    )
}

export { VersionChecker }
