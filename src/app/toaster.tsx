import type { FC } from 'react'

import { rgbToHex } from '@opentui/core'
import { Toaster as ToasterBase } from '@opentui-ui/toast/react'

import { useTheme } from '@/shared/settings'

export const Toaster: FC = () => {
    const { theme } = useTheme()
    return (
        <ToasterBase
            stackingMode="single"
            toastOptions={{
                duration: 3000,
                style: {
                    backgroundColor: rgbToHex(theme.surface.selection),
                    foregroundColor: rgbToHex(theme.colors.primary),
                    borderColor: rgbToHex(theme.border.default),
                    borderStyle: 'rounded',
                    paddingX: 1,
                    paddingY: 0,
                },
                success: {
                    style: { borderColor: rgbToHex(theme.progress.completed) },
                },
                error: {
                    style: { borderColor: rgbToHex(theme.progress.blocked) },
                    duration: 6000,
                },
                warning: {
                    style: { borderColor: rgbToHex(theme.colors.accent) },
                },
                info: {
                    style: { borderColor: rgbToHex(theme.markdown.heading) },
                },
                loading: {
                    style: { borderColor: rgbToHex(theme.progress.pending) },
                },
            }}
        />
    )
}
