import type { ComponentProps, FC } from 'react'

import { Text, useFocus } from 'ink'

import { Panel } from '@/shared/ui/panel'

type TasksStatusFilterProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'height' | 'minWidth' | 'minHeight'
>

const TasksStatusFilter: FC<TasksStatusFilterProps> = (props) => {
    return (
        <Panel
            focusable
            panelId="tasks-status-filter"
            borderStyle="round"
            titles={['Filter']}
            paddingLeft={1}
            {...props}>
            {/* <Text>All | Todo | Blocked | In Progress | Completed</Text> */}
            <Text>In Progress</Text>
        </Panel>
    )
}

export { TasksStatusFilter }
