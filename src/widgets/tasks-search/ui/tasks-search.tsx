import type { ComponentProps, FC } from 'react'

import { Text } from 'ink'

import { Panel } from '@/shared/ui/panel'

type TasksSearchProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'height' | 'minWidth' | 'minHeight'
>

const TasksSearch: FC<TasksSearchProps> = (props) => {
    return (
        <Panel focusable panelId="tasks-search" borderStyle="round" titles={['Search']} {...props}>
            <Text>Search</Text>
        </Panel>
    )
}

export { TasksSearch }
