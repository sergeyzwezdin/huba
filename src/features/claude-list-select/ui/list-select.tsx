import type { ComponentProps } from 'react'
import { forwardRef, useMemo, useState } from 'react'

import { useAtom, useSetAtom } from 'jotai'

import {
    type ClaudeListSelectRenderable,
    ClaudeListSelect as ListSelectControl,
    type SelectedList,
    selectedListAtom,
    useListsQuery,
} from '@/entities/claude-list'
import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'
import { useKeyboard } from '@/shared/keyboard'

type ListSelectProps = Pick<ComponentProps<typeof ListSelectControl>, 'onSelect' | 'style' | 'focused'>

const ListSelect = forwardRef<ClaudeListSelectRenderable, ListSelectProps>(({ style, focused, onSelect }, ref) => {
    const { data: lists } = useListsQuery()
    const [selectedList, setSelectedList] = useAtom(selectedListAtom)
    const setTaskFilter = useSetAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    const listMap = useMemo(() => new Map((lists ?? []).map((list) => [list.path, list])), [lists])

    const options = useMemo(
        () =>
            (lists ?? []).map((list) => ({
                id: list.path,
                name: list.id,
                createdAt: list.createdAt,
                tasksCount: list.tasksCount,
                instance: list.instance,
            })),
        [lists],
    )

    const [selected, setSelected] = useState(selectedList?.path)

    const handleConfirm = (path: string) => {
        const list = listMap.get(path)
        if (!list) return

        const sel: SelectedList = { id: list.id, path: list.path, instance: list.instance }
        setSelectedList(sel)
        setTaskFilter({ status: 'all', search: '' })
        setSelectedTaskId(undefined)
        onSelect?.(path)
    }

    useKeyboard((key) => {
        if (!focused) return

        if (key.name === 'return') {
            if (!selected) return
            handleConfirm(selected)
        }
    })

    return (
        <ListSelectControl
            ref={ref}
            options={options}
            selectedItem={selected}
            style={style}
            onSelect={setSelected}
            onConfirm={handleConfirm}
        />
    )
})

export { ListSelect }
