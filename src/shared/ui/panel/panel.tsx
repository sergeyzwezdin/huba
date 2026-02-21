import { type FC, type ReactNode, type Ref, useCallback } from 'react'

import type { BoxRenderable, OptimizedBuffer } from '@opentui/core'
import { parseColor } from '@opentui/core'
import type { BoxProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

type PanelProps = Omit<BoxProps, 'title'> & {
    title?: string | string[]
    subTitle?: string
    footer?: string
    subFooter?: string
    ref?: Ref<BoxRenderable>
}

function padText(text: string): string {
    return text.replaceAll(' ', '\u00A0')
}

const Panel: FC<PanelProps> = ({ title, subTitle, footer, subFooter, ref, style, ...props }): ReactNode => {
    const { theme } = useTheme()
    const boxTitle = Array.isArray(title) ? title.join('─') : title

    // const borderColor = parseColor(theme.border.default)

    const renderAfter = useCallback(
        function (this: BoxRenderable, buffer: OptimizedBuffer) {
            const bg = this._backgroundColor
            const borderColor = this._focused ? this._focusedBorderColor : this._borderColor

            if (subTitle?.trim()) {
                const text = padText(`[ ${subTitle.trim()} ]`)
                const x = this.x + this.width - 2 - text.length
                const y = this.y
                buffer.fillRect(x, y, text.length, 1, bg)
                buffer.drawText(text, x, y, borderColor)
            }

            if (footer?.trim()) {
                const text = padText(`[ ${footer.trim()} ]`)
                const x = this.x + 2
                const y = this.y + this.height - 1
                buffer.fillRect(x, y, text.length, 1, bg)
                buffer.drawText(text, x, y, borderColor)
            }

            if (subFooter?.trim()) {
                const text = padText(`[ ${subFooter.trim()} ]`)
                const x = this.x + this.width - 2 - text.length
                const y = this.y + this.height - 1
                buffer.fillRect(x, y, text.length, 1, bg)
                buffer.drawText(text, x, y, borderColor)
            }
        },
        [subTitle, footer, subFooter],
    )

    return (
        <box
            ref={ref}
            title={title ? `${boxTitle}` : undefined}
            renderAfter={renderAfter}
            {...props}
            style={{
                borderStyle: 'rounded',
                borderColor: theme.border.default,
                focusedBorderColor: theme.border.focused,
                ...style,
            }}
        />
    )
}

export { Panel }
