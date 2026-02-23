import type { ComponentProps, FC } from 'react'
import { useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { TaskDetailsView, useSelectedTask } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/task-details/model/use-hotkeys'

type TaskDetailsProps = Pick<ComponentProps<typeof Panel>, 'style'> & {
    autoFocus?: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({ autoFocus = false, ...props }) => {
    const { isFocused, ref } = useFocus({ id: 'task-details', autoFocus })
    const { focus } = useFocusManager()
    const scrollRef = useRef<ScrollBoxRenderable>(null)

    const selectedList = useAtomValue(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    useHotkeys((props.style?.visible ?? true) && !!selectedTask, isFocused, scrollRef)

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
