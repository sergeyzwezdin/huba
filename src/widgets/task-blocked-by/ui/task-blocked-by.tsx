import type { ComponentProps, FC } from 'react'
import { useRef } from 'react'

import { useKeyboard } from '@opentui/react'

import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskBlockedByProps = Pick<ComponentProps<typeof Panel>, 'style'>

const now = new Date()
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000)

const TaskBlockedBy: FC<TaskBlockedByProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocked-by' })
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
            title={['[3]', 'Blocked By (4)']}
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
                    { id: '3', title: 'Refactor', status: 'pending', date: minutesAgo(25) },
                    { id: '3', title: 'Refactor', status: 'blocked', date: minutesAgo(25) },
                    { id: '3', title: 'Refactor', status: 'in_progress', date: minutesAgo(25) },
                    {
                        id: '7',
                        title: 'Design and implement responsive layout system for variable terminal dimensions',
                        status: 'completed',
                        date: minutesAgo(65),
                    },
                ]}
            />
        </Panel>
    )
}

export { TaskBlockedBy }
