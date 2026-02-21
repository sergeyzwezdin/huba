import type { ComponentProps, FC } from 'react'
import { useMemo, useRef } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import type { TaskFilterStatus, TaskSortField } from '@/entities/task'
import { selectedTaskIdAtom, taskFilterAtom, taskSortAtom, useTasksQuery } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { detailsVisibleAtom } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

import { useSorted } from '../model/use-sorted'

const filterCycle: TaskFilterStatus[] = ['all', 'pending', 'in_progress', 'blocked', 'completed']

type TaskTableProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskTable: FC<TaskTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })
    const { focus } = useFocusManager()
    const [, setShowDetails] = useAtom(detailsVisibleAtom)
    const selectRef = useRef<TaskSelectRenderable>(null)
    const [selectedList] = useAtom(selectedListAtom)
    const { data } = useTasksQuery(selectedList)
    const tasks = data?.list ?? []

    const [selectedTaskId, setSelectedTaskId] = useAtom(selectedTaskIdAtom)
    const [, setSort] = useAtom(taskSortAtom)
    const [filter, setFilter] = useAtom(taskFilterAtom)

    const filteredTasks = useMemo(
        () => (filter.status === 'all' ? tasks : tasks.filter((task) => task.status === filter.status)),
        [tasks, filter.status],
    )

    const sortedTasks = useSorted(filteredTasks)

    const toggleSort = (field: TaskSortField): void => {
        setSort((prev) =>
            prev.field === field
                ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { field, direction: 'asc' },
        )
    }

    const options = useMemo(
        () =>
            sortedTasks.map((task) => ({
                id: task.id,
                title: task.subject,
                description: task.description,
                status: task.status,
                date: task.updatedAt,
            })),
        [sortedTasks],
    )

    useKeyboard((key) => {
        if (!isFocused) return

        if (key.name === 'space') {
            setShowDetails((prev) => !prev)
        } else if (key.name === 'return') {
            setShowDetails(true)
            setTimeout(() => {
                focus('task-details')
            }, 100)
        } else if (key.shift && key.name === 'i') {
            toggleSort('id')
        } else if (key.shift && key.name === 't') {
            toggleSort('subject')
        } else if (key.shift && key.name === 's') {
            toggleSort('status')
        } else if (key.shift && key.name === 'd') {
            toggleSort('updatedAt')
        } else if (key.shift && key.name === 'f') {
            setFilter((prev) => {
                const idx = filterCycle.indexOf(prev.status)
                const next = filterCycle[(idx + 1) % filterCycle.length]
                return { ...prev, status: next }
            })
        } else {
            selectRef.current?.handleKeyPress(key)
        }
    })

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
                selectedItem={selectedTaskId}
                onSelect={(id) => setSelectedTaskId(id)}
            />
        </Panel>
    )
}

export { TaskTable }
