import { type ComponentProps, type FC, useEffect, useMemo, useRef, useState } from 'react'

import { useKeyboard } from '@opentui/react'

import type { Task } from '@/shared/domain'

import { TaskSelect, type TaskSelectRenderable } from './task-select'

type TaskBlockersProps = {
    items: Task[]
    isFocused?: boolean
    style?: ComponentProps<typeof TaskSelect>['style']
    onSelect: (taskId: string) => void
}

const TaskBlockers: FC<TaskBlockersProps> = ({ items, isFocused, style, onSelect }) => {
    const selectRef = useRef<TaskSelectRenderable>(null)
    const [selectedId, setSelectedId] = useState<string | undefined>(items[0]?.id)

    const options = useMemo(
        () =>
            items.map((task) => ({
                id: task.id,
                title: task.subject,
                description: task.description,
                status: task.status,
                date: task.updatedAt,
            })),
        [items],
    )
    const optionsRef = useRef(options)
    useEffect(() => {
        optionsRef.current = options
    }, [options])

    useEffect(() => {
        if (isFocused) {
            if (optionsRef.current.length > 0) setSelectedId(optionsRef.current[0]?.id)
        }
    }, [isFocused])

    useKeyboard((key) => {
        if (!isFocused) return
        if (key.name === 'return' && selectedId) {
            onSelect(selectedId)
        } else {
            selectRef.current?.handleKeyPress(key)
        }
    })

    return (
        <TaskSelect
            ref={selectRef}
            style={style}
            showId={true}
            showDate={false}
            showSelection={isFocused}
            maxLines={1}
            options={options}
            selectedItem={selectedId}
            onSelect={setSelectedId}
            onConfirm={onSelect}
        />
    )
}

export { TaskBlockers, type TaskBlockersProps }
