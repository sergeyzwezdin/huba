import type { ComponentProps, FC } from 'react'

import { StackedBarChart } from '@pppp606/ink-chart'

import { Panel } from '@/shared/ui/panel'

type ProgressProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'minWidth' | 'minHeight'
>

const Progress: FC<ProgressProps> = (props) => {
    return (
        <Panel
            panelId="progress"
            titles={['Progress', '5 out of 25', '90%']}
            paddingLeft={1}
            flexDirection="column"
            borderStyle="round"
            height={4}
            {...props}>
            <StackedBarChart
                showValues={false}
                // showLabels={false}
                mode="absolute"
                width="full"
                max={3 + 9 + 5 + 12}
                data={[
                    { label: 'Todo', value: 3, color: '#0000ff' },
                    { label: 'Blocked', value: 9, color: '#ff0000' },
                    { label: 'In Progress', value: 5, color: '#99ff99' },
                    { label: 'Completed', value: 12, color: '#00ff00' },
                ]}
            />
        </Panel>
    )
}

export { Progress }
