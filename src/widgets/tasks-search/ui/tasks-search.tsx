import type { ComponentProps, FC } from 'react'

import { useFocus } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'

type TasksSearchProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TasksSearch: FC<TasksSearchProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'tasks-search' })

    return (
        <Panel focusable focused={isFocused} ref={ref} title="Search" {...props}>
            <text> Search</text>
        </Panel>
    )
}

export { TasksSearch }
