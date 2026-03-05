import type { ComponentProps, FC } from 'react'
import { useMemo, useRef } from 'react'

import { useAtom, useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { selectedTaskIdAtom, TaskSelect, type TaskSelectRenderable, useTasks } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { NoTasksFound } from '@/shared/ui/placeholders'
import { useHotkeys } from '@/widgets/task-table/model/use-hotkeys'
import { useTitle } from '@/widgets/task-table/model/use-title'

type TaskTableProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskTable: FC<TaskTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })
    const { focus } = useFocusManager()
    const selectRef = useRef<TaskSelectRenderable>(null)

    const selectedList = useAtomValue(selectedListAtom)
    const { data: tasks } = useTasks(selectedList)

    const options = useMemo(
        () =>
            tasks.map((task) => ({
                id: task.id,
                title: task.subject,
                description: task.description,
                status: task.status,
                date: task.updatedAt,
            })),
        [tasks],
    )

    const [selectedTaskId, setSelectedTaskId] = useAtom(selectedTaskIdAtom)

    const selectedTaskIndex = useMemo(
        () => (selectedTaskId !== undefined ? options.findIndex((option) => option.id === selectedTaskId) : undefined),
        [options, selectedTaskId],
    )

    const { subTitle, footer, subFooter } = useTitle(selectedTaskIndex, options.length)

    useHotkeys(isFocused, selectRef)

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[1]', 'Task List']}
            subTitle={subTitle}
            footer={footer}
            subFooter={subFooter}
            {...props}
            style={props.style}
            onMouseUp={() => focus('task-table')}>
            {options.length === 0 && <NoTasksFound />}
            <TaskSelect
                ref={selectRef}
                style={{ flexGrow: 1 }}
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
