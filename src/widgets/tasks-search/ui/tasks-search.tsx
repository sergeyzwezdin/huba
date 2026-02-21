import { type ComponentProps, type FC, useEffect, useRef } from 'react'

import type { InputRenderable } from '@opentui/core'
import { useAtom, useSetAtom } from 'jotai'

import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'

type TasksSearchProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TasksSearch: FC<TasksSearchProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'tasks-search' })
    const { focus } = useFocusManager()
    const [filter, setFilter] = useAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)
    const inputRef = useRef<InputRenderable>(null)

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus()
        } else {
            // inputRef.current?.blur()
        }
    }, [isFocused])

    return (
        <Panel focusable focused={isFocused} ref={ref} title={['[:]', 'Search']} style={{ paddingLeft: 2 }} {...props}>
            <input
                ref={inputRef}
                value={filter.search}
                onInput={(value) => {
                    setFilter((prev) => ({ ...prev, search: value }))
                    setSelectedTaskId(undefined)
                }}
                placeholder="Search tasks..."
                style={{ flexGrow: 1 }}
                onMouseUp={() => focus('tasks-search')}
            />
        </Panel>
    )
}

export { TasksSearch }
