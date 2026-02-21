import type { FC, ReactNode, Ref } from 'react'

import type { BoxRenderable } from '@opentui/core'
import type { BoxProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

type PanelProps = Omit<BoxProps, 'title'> & {
    title?: string | string[]
    ref?: Ref<BoxRenderable>
}

const Panel: FC<PanelProps> = ({ title, ref, style, ...props }): ReactNode => {
    const { theme } = useTheme()
    const boxTitle = Array.isArray(title) ? title.join('─') : title
    return (
        <box
            ref={ref}
            title={title ? `${boxTitle}` : undefined}
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
