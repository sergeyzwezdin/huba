import type { ComponentProps, FC } from 'react'

import { TextAttributes } from '@opentui/core'
import { useTerminalDimensions } from '@opentui/react'

import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'

type ProgressProps = Pick<ComponentProps<typeof Panel>, 'style'>

const segments = [
    { label: 'Todo', value: 3, color: '#0000ff' },
    { label: 'Blocked', value: 9, color: '#ff0000' },
    { label: 'In Progress', value: 5, color: '#99ff99' },
    { label: 'Completed', value: 12, color: '#00ff00' },
] as const

const total = segments.reduce((sum, s) => sum + s.value, 0)

const Progress: FC<ProgressProps> = (props) => {
    const { theme } = useTheme()
    const { width: columns } = useTerminalDimensions()
    // const barWidth = columns - 4

    return (
        <Panel
            focusable
            {...props}
            title={[' Progress ', '(5/25)', '[90%]']}
            style={{
                ...props.style,
                titleAlignment: 'center',
                paddingLeft: 1,
            }}>
            <box>
                <box style={{ flexDirection: 'row', gap: 0 }}>
                    <text style={{ fg: theme.progress.pending }} attributes={TextAttributes.DIM}>
                        ░░░░░░
                    </text>
                    <text style={{ fg: theme.progress.neutral }} attributes={TextAttributes.DIM}>
                        {'░'.repeat(columns - 26)}
                    </text>
                    <text style={{ fg: theme.progress.inProgress }} attributes={TextAttributes.DIM}>
                        ███
                    </text>
                    <text style={{ fg: theme.progress.completed }} attributes={TextAttributes.DIM}>
                        ███████████
                    </text>
                </box>
            </box>
        </Panel>
        // <Panel
        //     title={['Progress', '5 out of 25', '90%']}
        //     {...props}
        //     style={{
        //         ...props.style,
        //         paddingLeft: 1,
        //         flexDirection: 'column',
        //         borderStyle: 'rounded',
        //         height: 4,
        //     }}>
        //     <text>
        //         {segments.map((seg) => (
        //             <span key={seg.label} fg={seg.color}>
        //                 {' '}
        //                 {seg.label}: {seg.value}{' '}
        //             </span>
        //         ))}
        //     </text>
        //     <text>
        //         {segments.map((seg) => {
        //             const segWidth = Math.round((seg.value / total) * barWidth)
        //             return (
        //                 <span key={seg.label} bg={seg.color}>
        //                     {' '.repeat(segWidth)}
        //                 </span>
        //             )
        //         })}
        //     </text>
        // </Panel>
    )
}

export { Progress }
