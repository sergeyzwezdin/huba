import type { ComponentProps, FC } from 'react'

import { TitledBox, type TitledBoxProps } from '@mishieck/ink-titled-box'
import { Box, useFocus } from 'ink'

import { useMouseFocus } from '@/shared/lib'

type SharedPanelProps = Omit<TitledBoxProps, 'borderColor'> & {
    borderColor?: ComponentProps<typeof Box>['borderColor']
}

type FocusablePanelProps = SharedPanelProps & {
    panelId: string
    focusedBorderColor?: ComponentProps<typeof Box>['borderColor']
}

type PanelProps = ({ focusable: true } & FocusablePanelProps) | ({ focusable?: false } & SharedPanelProps)

const StaticPanel: FC<SharedPanelProps> = ({ borderColor = 'white', children, ...props }) => (
    <TitledBox borderColor={borderColor} {...props}>
        {children}
    </TitledBox>
)

const FocusablePanel: FC<FocusablePanelProps> = ({
    panelId,
    borderColor = 'white',
    focusedBorderColor = 'blue',
    children,
    flexGrow,
    flexShrink,
    flexBasis,
    width,
    height,
    minWidth,
    minHeight,
    ...props
}) => {
    const { isFocused } = useFocus({ id: panelId })
    const ref = useMouseFocus(panelId)

    return (
        <Box
            ref={ref}
            flexGrow={flexGrow}
            flexShrink={flexShrink}
            flexBasis={flexBasis}
            width={width}
            height={height}
            minWidth={minWidth}
            minHeight={minHeight}
            flexDirection="column">
            <TitledBox
                borderColor={isFocused ? focusedBorderColor : borderColor}
                flexGrow={1}
                flexDirection="column"
                width={width}
                {...props}>
                {children}
            </TitledBox>
        </Box>
    )
}

const Panel: FC<PanelProps> = ({ focusable, ...rest }) => {
    if (focusable) return <FocusablePanel {...(rest as FocusablePanelProps)} />

    return <StaticPanel {...(rest as SharedPanelProps)} />
}

export { Panel }
