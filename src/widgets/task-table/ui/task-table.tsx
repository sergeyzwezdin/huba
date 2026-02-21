import type { ComponentProps, FC } from 'react'
import { useEffect, useMemo, useRef } from 'react'

import { useKeyboard } from '@opentui/react'
import { useDialog } from '@opentui-ui/dialog/react'
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

const sortLabel: Record<TaskSortField, string> = {
    id: 'ID',
    subject: 'Title',
    status: 'Status',
    updatedAt: 'UPDATED',
}
const filterLabel: Record<Exclude<TaskFilterStatus, 'all'>, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    completed: 'Completed',
}

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
    const [sort, setSort] = useAtom(taskSortAtom)
    const [filter, setFilter] = useAtom(taskFilterAtom)

    const subTitle = `${sortLabel[sort.field].toUpperCase()} ${sort.direction === 'asc' ? '↑' : '↓'}`
    const footer = filter.status !== 'all' ? filterLabel[filter.status].toUpperCase() : undefined

    const filteredTasks = useMemo(() => {
        const query = filter.search?.toLowerCase().trim() ?? ''
        return tasks.filter((task) => {
            const statusMatch = filter.status === 'all' || task.status === filter.status
            const searchMatch =
                !query ||
                task.subject.toLowerCase().includes(query) ||
                (task.description ?? '').toLowerCase().includes(query)
            return statusMatch && searchMatch
        })
    }, [tasks, filter.status, filter.search])

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

    const selectedTaskIndex = useMemo(
        () => (selectedTaskId !== undefined ? options.findIndex((option) => option.id === selectedTaskId) : undefined),
        [options, selectedTaskId],
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
            title={['[1]', 'Task List']}
            subTitle={subTitle}
            footer={footer}
            subFooter={
                selectedTaskIndex !== undefined ? `${selectedTaskIndex + 1}/${options.length}` : String(options.length)
            }
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
