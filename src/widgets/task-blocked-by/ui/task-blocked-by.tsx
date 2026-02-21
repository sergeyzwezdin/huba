import type { ComponentProps, FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import { selectedTaskIdAtom, useSelectedTasksBlockedBy } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskBlockedByProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskBlockedBy: FC<TaskBlockedByProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocked-by' })
    const { focus } = useFocusManager()
    const selectRef = useRef<TaskSelectRenderable>(null)

    const [selectedList] = useAtom(selectedListAtom)
    const [, setSelectedTaskId] = useAtom(selectedTaskIdAtom)
    const blockedBy = useSelectedTasksBlockedBy(selectedList)
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

    useEffect(() => {
        setSelectedId(blockedBy[0]?.id)
    }, [blockedBy])

    useKeyboard((key) => {
        if (!isFocused) return
        if (key.name === 'escape') focus('task-table')
        else if (key.name === 'return' && selectedId) {
            setSelectedTaskId(selectedId)
            focus('task-table')
        } else selectRef.current?.handleKeyPress(key)
    })

    if (blockedBy.length === 0) return undefined

    const options = blockedBy.map((task) => ({
        id: task.id,
        title: task.subject,
        description: task.description,
        status: task.status,
        date: new Date(),
    }))

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[3]', `Blocked By (${blockedBy.length})`]}
            {...props}
            style={{
                ...props.style,
                height: Math.min(8, options.length + 2),
            }}>
            <TaskSelect
                ref={selectRef}
                style={{ flexGrow: 1 }}
                showScrollIndicator={true}
                showId={true}
                showDate={false}
                showSelection={isFocused}
                maxLines={1}
                options={options}
                selectedItem={selectedId}
                onSelect={setSelectedId}
            />
        </Panel>
    )
}

export { TaskBlockedBy }
