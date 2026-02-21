import type { ComponentProps, FC } from 'react'
import { useRef } from 'react'

import { useKeyboard } from '@opentui/react'

import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskBlocksProps = Pick<ComponentProps<typeof Panel>, 'style'>

const now = new Date()
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000)

const TaskBlocks: FC<TaskBlocksProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocks' })
    const { focus } = useFocusManager()
    const selectRef = useRef<TaskSelectRenderable>(null)

    useKeyboard((key) => {
        if (!isFocused) return
        if (key.name === 'escape') focus('task-table')
        else selectRef.current?.handleKeyPress(key)
    })

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[4]', 'Blocks (5)']}
            {...props}
            style={{
                ...props.style,
                height: 6,
            }}>
            <TaskSelect
                ref={selectRef}
                style={{ flexGrow: 1 }}
                showScrollIndicator={true}
                showId={true}
                showDate={false}
                showSelection={isFocused}
                maxLines={1}
                options={[
                    { id: '5', title: 'Update deps', status: 'pending', date: minutesAgo(45) },
                    { id: '12', title: 'Bug', status: 'pending', date: minutesAgo(115) },
                    { id: '12', title: 'Bug', status: 'in_progress', date: minutesAgo(115) },
                    {
                        id: '13',
                        title: 'Optimize re-renders in task table when filtering by status or search query',
                        status: 'completed',
                        date: minutesAgo(125),
                    },
                ]}
            />
        </Panel>
    )
}

export { TaskBlocks }
