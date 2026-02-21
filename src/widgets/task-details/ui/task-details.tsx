import type { ComponentProps, FC } from 'react'
import { useEffect, useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { useAtom } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { TaskDetailsView, useSelectedTask } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { fullScreenAtom } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/task-details/model/use-hotkeys'

type TaskDetailsProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskDetails: FC<TaskDetailsProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-details' })
    const { focus } = useFocusManager()
    const scrollRef = useRef<ScrollBoxRenderable>(null)
    const [expanded, toggleExpanded] = useAtom(fullScreenAtom)

    const [selectedList] = useAtom(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    const { disableTabButton, enableTabButton } = useFocusManager()

    useHotkeys(isFocused, expanded, toggleExpanded, scrollRef)

    useEffect(() => {
        if (isFocused && expanded) disableTabButton()
        else enableTabButton()
    }, [isFocused, expanded, disableTabButton, enableTabButton])

    if (!selectedTask) return undefined

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[2]', 'Task Details']}
            {...props}
            style={{
                ...props.style,
                flexDirection: 'column',
                paddingLeft: 1,
                paddingTop: 1,
                paddingRight: 1,
            }}
            onMouseUp={() => focus('task-details')}>
            <TaskDetailsView ref={scrollRef} task={selectedTask} />
        </Panel>
    )
}

export { TaskDetails }
