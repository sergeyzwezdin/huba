import { type ComponentProps, type FC, useEffect, useRef } from 'react'

import { useAtom, useAtomValue } from 'jotai'

import { type ClaudeListSelectRenderable, selectedListAtom } from '@/entities/claude-list'
import { ListSelect } from '@/features/claude-list-select'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { fullScreenAtom, useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/claude-list/model/use-hotkeys'

type ClaudeListProps = Pick<ComponentProps<typeof Panel>, 'style'>

const ClaudeList: FC<ClaudeListProps> = (props) => {
    const { theme } = useTheme()

    const { isFocused, ref } = useFocus({ id: 'lists-table' })
    const { focus, disableTabButton, enableTabButton } = useFocusManager()

    const selectRef = useRef<ClaudeListSelectRenderable>(null)

    const selectedList = useAtomValue(selectedListAtom)
    const [fullScreen, setFullScreen] = useAtom(fullScreenAtom)

    useHotkeys(isFocused, fullScreen, setFullScreen, selectRef)

    useEffect(() => {
        if (isFocused && fullScreen === 'lists') disableTabButton()
        else enableTabButton()
    }, [isFocused, fullScreen, disableTabButton, enableTabButton])

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={!fullScreen ? ['[L]', 'Claude List'] : 'Claude List'}
            {...props}
            onMouseUp={() => focus('lists-table')}>
            {fullScreen === 'lists' ? (
                <ListSelect
                    ref={selectRef}
                    focused={isFocused}
                    style={{ flexGrow: 1, flexBasis: 1 }}
                    onSelect={() => {
                        setFullScreen(false)

                        setTimeout(() => {
                            focus('task-table')
                        }, 100)
                    }}
                />
            ) : (
                <text style={{ flexGrow: 1, height: 1, truncate: true, fg: theme.colors.secondary }}>
                    {selectedList}
                </text>
            )}
        </Panel>
    )
}

export { ClaudeList }
