import type { ComponentProps, FC } from 'react'

import { useFocus } from '@/shared/focus-manager'
import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'

type TasksStatusFilterProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TasksStatusFilter: FC<TasksStatusFilterProps> = (props) => {
    const { theme } = useTheme()
    const { isFocused, ref } = useFocus({ id: 'tasks-status-filter' })

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
            {/* <Text>All | Todo | Blocked | In Progress | Completed</Text> */}
            <text style={{ fg: theme.colors.hint }}>[→ Blocked</text>
        </Panel>
    )
}

export { TasksStatusFilter }
