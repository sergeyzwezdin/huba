import type { ComponentProps, FC } from 'react'

import { useAtom } from 'jotai'

import type { TaskFilterStatus } from '@/entities/task'
import { taskFilterAtom } from '@/entities/task'
import { useFocus } from '@/shared/focus-manager'
import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'

type TasksStatusFilterProps = Pick<ComponentProps<typeof Panel>, 'style'>

const filterLabels: Record<TaskFilterStatus, string> = {
    all: 'All',
    pending: 'Pending',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    completed: 'Completed',
}

const TasksStatusFilter: FC<TasksStatusFilterProps> = (props) => {
    const { theme } = useTheme()
    const { isFocused, ref } = useFocus({ id: 'tasks-status-filter' })
    const [filter] = useAtom(taskFilterAtom)

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title="Filter"
            {...props}
            style={{
                ...props.style,
                paddingLeft: 1,
            }}>
            <text style={{ fg: theme.colors.hint }}>[→ {filterLabels[filter.status]}</text>
        </Panel>
    )
}

export { TasksStatusFilter }
