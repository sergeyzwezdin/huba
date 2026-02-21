import type { ComponentProps, FC } from 'react'

import { useAtom, useSetAtom } from 'jotai'

import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'
import { useFocus } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'

type TasksSearchProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TasksSearch: FC<TasksSearchProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'tasks-search' })
    const [filter, setFilter] = useAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    return (
        <Panel focusable focused={isFocused} ref={ref} title={['[:]', 'Search']} style={{ paddingLeft: 2 }} {...props}>
            <input
                value={filter.search}
                onInput={(value) => {
                    setFilter((prev) => ({ ...prev, search: value }))
                    setSelectedTaskId(undefined)
                }}
                focused={isFocused}
                placeholder="Search tasks..."
                style={{ flexGrow: 1 }}
            />
        </Panel>
    )
}

export { TasksSearch }
