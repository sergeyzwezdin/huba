import type { ComponentProps } from 'react'
import { forwardRef, useMemo, useState } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom, useSetAtom } from 'jotai'

import {
    type ClaudeListSelectRenderable,
    ClaudeListSelect as ListSelectControl,
    selectedListAtom,
    useListsQuery,
} from '@/entities/claude-list'
import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'

type ListSelectProps = Pick<ComponentProps<typeof ListSelectControl>, 'onSelect' | 'style' | 'focused'>

const ListSelect = forwardRef<ClaudeListSelectRenderable, ListSelectProps>(({ style, focused, onSelect }, ref) => {
    const { data: lists } = useListsQuery()
    const [selectedList, setSelectedList] = useAtom(selectedListAtom)
    const setTaskFilter = useSetAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    const options = useMemo(() => (lists ?? []).map((list) => ({ id: list.id, createdAt: list.createdAt })), [lists])

    const [selected, setSelected] = useState(selectedList)

    useKeyboard((key) => {
        if (!focused) return

        if (key.name === 'return') {
            setSelectedList(selected)
            setTaskFilter({ status: 'all', search: '' })
            setSelectedTaskId(undefined)

            onSelect?.(selected ?? '')
        }
    })

    return (
        <ListSelectControl ref={ref} options={options} selectedItem={selected} style={style} onSelect={setSelected} />
    )
})

export { ListSelect }
