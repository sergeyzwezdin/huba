import type { ComponentProps, FC } from 'react'

import { useFocus } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'

type ListsTableProps = Pick<ComponentProps<typeof Panel>, 'style'>

const ListsTable: FC<ListsTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'lists-table' })

    return (
        <Panel focusable focused={isFocused} ref={ref} title={['[L]', 'Active List']} {...props}>
            <text></text>
        </Panel>
    )
}

export { ListsTable }
