import { useKeyboard as useCoreKeyboard } from '@opentui/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { selectedTaskIdAtom, taskFilterAtom, useTasks } from '@/entities/task'
import { useFocusManager } from '@/shared/focus-manager'
import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (enabled: boolean) => {
    const { focus } = useFocusManager()

    const [filter, setFilter] = useAtom(taskFilterAtom)

    const selectedList = useAtomValue(selectedListAtom)
    const { data: tasks } = useTasks(selectedList)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    // Escape bypasses the global disable gate so the user can leave search
    useCoreKeyboard((key) => {
        if (!enabled) return

        if (key.name === 'escape') {
            if (filter.search.length > 0) {
                setFilter((prev) => ({ ...prev, search: '' }))
            } else {
                setSelectedTaskId((prev) =>
                    !!prev && !!tasks && tasks.some((task) => task.id === prev)
                        ? prev
                        : tasks && tasks.length > 0
                          ? tasks[0].id
                          : undefined,
                )

                setTimeout(() => {
                    focus('task-table')
                }, 100)
            }
        }

        if (key.name === 'return') {
            setSelectedTaskId((prev) =>
                !!prev && !!tasks && tasks.some((task) => task.id === prev)
                    ? prev
                    : tasks && tasks.length > 0
                      ? tasks[0].id
                      : undefined,
            )

            setTimeout(() => {
                focus('task-table')
            }, 100)
        }
    })

    return useKeyboard((key) => {
        if (key.name === ':') focus('tasks-search')
    })
}

export { useHotkeys }
