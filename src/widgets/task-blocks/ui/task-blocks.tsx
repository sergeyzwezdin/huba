import type { ComponentProps, FC } from 'react'

import { Text, useFocus } from 'ink'

import { Panel } from '@/shared/ui/panel'

type TaskBlocksProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'minWidth'
>

const TaskBlocks: FC<TaskBlocksProps> = (props) => {
    return (
        <Panel focusable panelId="task-blocks" borderStyle="round" titles={['Blocks']} height={10} {...props}>
            <Text dimColor>Empty</Text>
        </Panel>
    )
}

export { TaskBlocks }
