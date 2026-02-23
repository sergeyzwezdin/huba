import type { FC } from 'react'

import { useAtom } from 'jotai'

import { type TaskFilterStatus, taskFilterAtom } from '@/entities/task'
import { useFocus } from '@/shared/focus-manager'
import { FormField } from '@/shared/ui/forms'
import { Selector } from '@/shared/ui/input'

const options = [
    { value: 'all' as const, label: 'All' },
    { value: 'pending' as const, label: 'Pending' },
    { value: 'in_progress' as const, label: 'In Progress' },
    { value: 'completed' as const, label: 'Completed' },
]

type FilterStatusFieldProps = {
    autoFocus?: boolean
}

const FilterStatusField: FC<FilterStatusFieldProps> = ({ autoFocus = false }) => {
    const { isFocused, ref } = useFocus({ id: 'settings-filter-status', autoFocus })

    const [filter, setFilter] = useAtom(taskFilterAtom)

    return (
        <FormField title="Status Filter" hint="Filter tasks by status" isFocused={isFocused}>
            <Selector
                options={options}
                value={filter.status}
                onChange={(value) => setFilter({ ...filter, status: value as TaskFilterStatus })}
                isFocused={isFocused}
                focusRef={ref}
            />
        </FormField>
    )
}

export { FilterStatusField }
