import type { FC } from 'react'

import { useAtom } from 'jotai'

import { type TaskSortField, taskSortAtom } from '@/entities/task/model/tasks-sort.atom'
import { useFocus } from '@/shared/focus-manager'
import { FormField } from '@/shared/ui/forms'
import { List } from '@/shared/ui/input'

const options = [
    { value: 'id' as const, label: 'Id' },
    { value: 'subject' as const, label: 'Title' },
    { value: 'status' as const, label: 'Status' },
    { value: 'updatedAt' as const, label: 'Updated' },
]

type SortFieldFieldProps = {
    autoFocus?: boolean
}

const SortFieldField: FC<SortFieldFieldProps> = ({ autoFocus = false }) => {
    const { isFocused, ref } = useFocus({ id: 'settings-sort-field', autoFocus })

    const [sort, setSort] = useAtom(taskSortAtom)

    return (
        <FormField title="Sort By" isFocused={isFocused}>
            <List
                options={options}
                value={sort.field}
                onChange={(value) => setSort({ ...sort, field: value as TaskSortField })}
                isFocused={isFocused}
                focusRef={ref}
            />
        </FormField>
    )
}

export { SortFieldField }
