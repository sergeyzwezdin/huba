import type { ComponentProps, FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import { selectedTaskIdAtom, useSelectedTasksBlocks } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskBlocksProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskBlocks: FC<TaskBlocksProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-blocks' })
    const { focus } = useFocusManager()
    const selectRef = useRef<TaskSelectRenderable>(null)

    const [selectedList] = useAtom(selectedListAtom)
    const [, setSelectedTaskId] = useAtom(selectedTaskIdAtom)
    const blocks = useSelectedTasksBlocks(selectedList)
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

    useEffect(() => {
        setSelectedId(blocks[0]?.id)
    }, [blocks])

    useKeyboard((key) => {
        if (!isFocused) return
        if (key.name === 'escape') focus('task-table')
        else if (key.name === 'return' && selectedId) {
            setSelectedTaskId(selectedId)
            focus('task-table')
        } else selectRef.current?.handleKeyPress(key)
    })

    if (blocks.length === 0) return undefined

    const options = blocks.map((task) => ({
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
            title={['[4]', `Blocks (${blocks.length})`]}
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

export { TaskBlocks }
