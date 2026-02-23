import type { FC } from 'react'

import { useAtom } from 'jotai'

import { type TaskSortDirection, taskSortAtom } from '@/entities/task/model/tasks-sort.atom'
import { useFocus } from '@/shared/focus-manager'
import { FormField } from '@/shared/ui/forms'
import { Selector } from '@/shared/ui/input'

const options = [
    { value: 'asc' as const, label: 'Ascending' },
    { value: 'desc' as const, label: 'Descending' },
]

type SortDirectionFieldProps = {
    autoFocus?: boolean
}

const SortDirectionField: FC<SortDirectionFieldProps> = ({ autoFocus = false }) => {
    const { isFocused, ref } = useFocus({ id: 'settings-sort-direction', autoFocus })

    const [sort, setSort] = useAtom(taskSortAtom)

    return (
        <FormField title="Sort Order" isFocused={isFocused}>
            <Selector
                options={options}
                value={sort.direction}
                onChange={(value) => setSort({ ...sort, direction: value as TaskSortDirection })}
                isFocused={isFocused}
                focusRef={ref}
            />
        </FormField>
    )
}

export { SortDirectionField }
