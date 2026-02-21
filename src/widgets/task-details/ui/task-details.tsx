import type { ComponentProps, FC } from 'react'
import { useEffect, useRef } from 'react'

import { type ScrollBoxRenderable, TextAttributes } from '@opentui/core'
import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import { useSelectedTask } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { detailsExpandedAtom, useTheme } from '@/shared/settings'
import { Markdown } from '@/shared/ui/markdown'
import { Panel } from '@/shared/ui/panel'

type TaskDetailsProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskDetails: FC<TaskDetailsProps> = (props) => {
    const { theme } = useTheme()
    const { isFocused, ref } = useFocus({ id: 'task-details' })
    const { focus } = useFocusManager()
    const scrollRef = useRef<ScrollBoxRenderable>(null)
    const [expanded, toggleExpanded] = useAtom(detailsExpandedAtom)

    const [selectedList] = useAtom(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    const { disableTabButton, enableTabButton } = useFocusManager()

    useKeyboard((key) => {
        if (!isFocused) return
        if (key.name === 'return') {
            toggleExpanded((prev) => !prev)
        } else if (key.name === 'escape') {
            if (expanded) {
                toggleExpanded(false)
            } else {
                focus('task-table')
            }
        } else if (key.name === 'up' || key.name === 'k') {
            scrollRef.current?.scrollBy(-1)
        } else if (key.name === 'down' || key.name === 'j') {
            scrollRef.current?.scrollBy(1)
        } else {
            scrollRef.current?.handleKeyPress(key)
        }
    })

    useEffect(() => {
        if (isFocused && expanded) disableTabButton()
        else enableTabButton()
    }, [isFocused, expanded, disableTabButton, enableTabButton])

    if (!selectedTask) return undefined

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            // title={['[123]', 'Implement task details scrollable panel that renders the task description as markdown.']}
            title={['[2]', 'Task Details']}
            {...props}
            style={{
                ...props.style,
                flexDirection: 'column',
                paddingLeft: 1,
                paddingTop: 1,
                paddingRight: 1,
            }}>
            <box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1 }}>
                <box style={{ flexShrink: 0 }}>
                    <text fg={theme.colors.accent} attributes={TextAttributes.DIM}>
                        <strong>#{selectedTask.id}</strong>
                    </text>
                </box>
                <box style={{ flexGrow: 1 }}>
                    <text fg={theme.colors.primary}>
                        <u>{selectedTask.subject}</u>
                    </text>
                </box>
            </box>
            <box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1 }}>
                <box style={{ flexShrink: 0 }}>
                    <text fg={theme.colors.secondary}>Status:</text>
                </box>
                <box style={{ flexGrow: 1 }}>
                    <text fg={theme.colors.primary}>{selectedTask.status}</text>
                </box>
            </box>
            <scrollbox
                ref={scrollRef}
                scrollbarOptions={{
                    showArrows: false,
                    trackOptions: {
                        foregroundColor: theme.surface.scrollbarThumb,
                        backgroundColor: theme.surface.scrollbarTrack,
                    },
                }}
                style={{
                    padding: 0,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    titleAlignment: 'center',
                }}>
                <Markdown>{selectedTask.description}</Markdown>
            </scrollbox>
        </Panel>
    )
}

export { TaskDetails }
