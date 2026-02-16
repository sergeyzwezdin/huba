import type { ComponentProps, FC } from 'react'

import { Panel } from '@/shared/ui/panel'

type ListsTableProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'height' | 'minWidth' | 'minHeight'
>

const ListsTable: FC<ListsTableProps> = (props) => {
    return (
        <Panel
            focusable
            panelId="lists-table"
            borderStyle="round"
            borderColor={undefined}
            titles={['Active List']}
            {...props}>
            {null}
        </Panel>
    )
}

export { ListsTable }
