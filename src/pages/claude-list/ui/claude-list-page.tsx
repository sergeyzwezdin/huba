import type { FC } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

import { type ClaudeListSelectRenderable, useListsQuery } from '@/entities/claude-list'
import { ListSelect } from '@/features/claude-list-select'
import { useFocus } from '@/shared/focus-manager'
import { Panel } from '@/shared/ui/panel'
import { NoListsFound } from '@/shared/ui/placeholders'

import { useHotkeys } from '../model/use-hotkeys'

const ClaudeListPage: FC = () => {
    const navigate = useNavigate()

    const selectRef = useRef<ClaudeListSelectRenderable>(null)
    const { isFocused, ref } = useFocus({ id: 'lists-table', autoFocus: true })
    const { data: lists } = useListsQuery()

    useHotkeys(isFocused, selectRef)

    return (
        <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
            <Panel focusable focused={isFocused} ref={ref} title="Lists" style={{ flexGrow: 1 }}>
                {!!lists && lists.length > 0 ? (
                    <ListSelect
                        ref={selectRef}
                        focused={isFocused}
                        style={{ flexGrow: 1, flexBasis: 1 }}
                        onSelect={() => navigate('/')}
                    />
                ) : (
                    <NoListsFound />
                )}
            </Panel>
        </box>
    )
}

export { ClaudeListPage }
