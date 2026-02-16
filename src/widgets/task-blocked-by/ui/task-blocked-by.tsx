import type { ComponentProps, FC } from 'react'

import { Text } from 'ink'

import { Panel } from '@/shared/ui/panel'

type TaskBlockedByProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'minWidth' | 'minHeight'
>

const TaskBlockedBy: FC<TaskBlockedByProps> = (props) => {
    return (
        <Panel focusable panelId="task-blocked-by" borderStyle="round" titles={['Blocked By']} height={10} {...props}>
            <Text dimColor>Empty</Text>
        </Panel>
    )
}

export { TaskBlockedBy }
