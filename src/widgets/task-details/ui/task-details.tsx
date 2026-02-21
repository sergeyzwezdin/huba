import type { ComponentProps, FC } from 'react'
import { useEffect, useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { TextAttributes } from '@opentui/core'
import { useAtom } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { useSelectedTask } from '@/entities/task'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { fullScreenAtom, useTheme } from '@/shared/settings'
import { Markdown } from '@/shared/ui/markdown'
import { Panel } from '@/shared/ui/panel'
import { useHotkeys } from '@/widgets/task-details/model/use-hotkeys'

type TaskDetailsProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskDetails: FC<TaskDetailsProps> = (props) => {
    const { theme } = useTheme()
    const { isFocused, ref } = useFocus({ id: 'task-details' })
    const { focus } = useFocusManager()
    const scrollRef = useRef<ScrollBoxRenderable>(null)
    const [expanded, toggleExpanded] = useAtom(fullScreenAtom)

    const [selectedList] = useAtom(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    const { disableTabButton, enableTabButton } = useFocusManager()

    useHotkeys(isFocused, expanded, toggleExpanded, scrollRef)

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
            title={['[2]', 'Task Details']}
            {...props}
            style={{
                ...props.style,
                flexDirection: 'column',
                paddingLeft: 1,
                paddingTop: 1,
                paddingRight: 1,
            }}
            onMouseUp={() => focus('task-details')}>
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
            {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
            <scrollbox
                ref={scrollRef}
                focusable={false}
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
                }}
                onMouseUp={() => focus('task-details')}>
                <Markdown>{selectedTask.description}</Markdown>
            </scrollbox>
        </Panel>
    )
}

export { TaskDetails }
