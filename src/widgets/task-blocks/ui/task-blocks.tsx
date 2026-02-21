import type { ComponentProps, FC } from 'react'

import { useAtom, useSetAtom } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { selectedTaskIdAtom, TaskBlockers, useSelectedTasksBlocks } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/task-blocks/model/use-hotkeys'

type TaskBlocksProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskBlocks: FC<TaskBlocksProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocks' })
    const { focus } = useFocusManager()

    const [selectedList] = useAtom(selectedListAtom)
    const blocks = useSelectedTasksBlocks(selectedList)

    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    useHotkeys(isFocused)

    if (blocks.length === 0) return undefined

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[4]', `Blocks (${blocks.length})`]}
            {...props}
            style={{
                ...props.style,
                height: Math.min(8, blocks.length + 2),
            }}
            onMouseUp={() => focus('task-blocks')}>
            <TaskBlockers
                items={blocks}
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

export { TaskBlocks }
