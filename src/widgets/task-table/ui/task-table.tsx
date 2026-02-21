import type { ComponentProps, FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import { useTasksQuery } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { detailsVisibleAtom } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskTableProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskTable: FC<TaskTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })
    const { focus } = useFocusManager()
    const [, setShowDetails] = useAtom(detailsVisibleAtom)
    const selectRef = useRef<TaskSelectRenderable>(null)
    const [selectedList] = useAtom(selectedListAtom)
    const { data: tasks } = useTasksQuery(selectedList)

    const options = useMemo(() => {
        return tasks?.map((task) => ({
            id: task.id,
            title: task.subject,
            description: task.description,
            status: task.status,
            date: new Date(),
        }))
    }, [tasks])

    useKeyboard((key) => {
        if (!isFocused) return

        if (key.name === 'space') {
            setShowDetails((prev) => !prev)
        } else if (key.name === 'return') {
            setShowDetails(true)
            setTimeout(() => {
                focus('task-details')
            }, 100)
        } else {
            selectRef.current?.handleKeyPress(key)
        }
    })

    const [selectedItem, setSelectedItem] = useState<string | undefined>('54')

    useEffect(() => {
        console.log('selectedItem', selectedItem)
    }, [selectedItem])

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[1]', `Task List${!!tasks && tasks.length > 0 ? ` (${tasks.length})` : ''}`]}
            {...props}
            style={props.style}>
            <TaskSelect
                ref={selectRef}
                style={{ flexGrow: 1 }}
                showScrollIndicator={true}
                showId={true}
                showDate={true}
                maxLines={2}
                options={options}
                selectedItem={selectedItem}
                onSelect={(id) => {
                    setSelectedItem(id)
                }}
            />
        </Panel>
    )
}

export { TaskTable }
