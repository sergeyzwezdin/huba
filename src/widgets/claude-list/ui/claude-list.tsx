import type { ComponentProps, FC } from 'react'

import { useTerminalDimensions } from '@opentui/react'
import { useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/claude-list/model/use-hotkeys'

type ClaudeListProps = Pick<ComponentProps<typeof Panel>, 'style'>

const ClaudeList: FC<ClaudeListProps> = (props) => {
    const { theme } = useTheme()
    const { width: columns } = useTerminalDimensions()

    const { isFocused, ref } = useFocus({ id: 'lists-table' })
    const { focus } = useFocusManager()

    const selectedList = useAtomValue(selectedListAtom)

    useHotkeys(isFocused)

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={columns > 90 ? ['[L]', 'Claude List'] : ['[L]']}
            {...props}
            onMouseUp={() => focus('lists-table')}>
            <text style={{ flexGrow: 1, height: 1, truncate: true, fg: theme.colors.secondary }}>{selectedList}</text>
        </Panel>
    )
}

export { ClaudeList }
