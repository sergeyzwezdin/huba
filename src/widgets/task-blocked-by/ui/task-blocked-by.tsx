import type { ComponentProps, FC } from 'react'

import { useAtomValue, useSetAtom } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { selectedTaskIdAtom, TaskBlockers, useSelectedTasksBlockedBy } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/task-blocked-by/model/use-hotkeys'

type TaskBlockedByProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskBlockedBy: FC<TaskBlockedByProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocked-by' })
    const { focus } = useFocusManager()

    const selectedList = useAtomValue(selectedListAtom)
    const blockedBy = useSelectedTasksBlockedBy(selectedList)

    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    useHotkeys((props.style?.visible ?? true) && blockedBy.length > 0, isFocused)

    if (blockedBy.length === 0) return undefined

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[3]', `Blocked By (${blockedBy.length})`]}
            {...props}
            style={{
                ...props.style,
                height: Math.min(8, blockedBy.length + 2),
            }}
            onMouseUp={() => focus('task-blocked-by')}>
            <TaskBlockers
                items={blockedBy}
                isFocused={isFocused}
                style={{ flexGrow: 1 }}
                onSelect={(taskId) => {
                    setSelectedTaskId(taskId)
                    focus('task-table')
                }}
            />
        </Panel>
    )
}

export { TaskBlockedBy }
