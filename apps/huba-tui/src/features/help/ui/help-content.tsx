import { type FC, useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { TextAttributes } from '@opentui/core'
import { useDialog, useDialogKeyboard, useDialogState } from '@opentui-ui/dialog/react'

import { useTheme } from '@/shared/settings'

import { hotkeys } from '../model/hotkeys'

const HelpContent: FC = () => {
    const dialog = useDialog()
    const dialogId = useDialogState((s) => s.topDialog?.id)
    const { theme } = useTheme()
    const scrollRef = useRef<ScrollBoxRenderable>(null)

    useDialogKeyboard((key) => {
        if (key.name === 'escape') {
            dialog.close()
        }
        if (key.name === 'up' || key.name === 'k') {
            scrollRef.current?.scrollBy(-1)
        }
        if (key.name === 'down' || key.name === 'j') {
            scrollRef.current?.scrollBy(1)
        }
    }, dialogId ?? '')

    return (
        <box
            style={{
                flexDirection: 'column',
                gap: 1,
                paddingLeft: 2,
                paddingRight: 1,
            }}>
            <box>
                <text fg={theme.colors.primary} attributes={TextAttributes.BOLD}>
                    Keyboard Shortcuts
                </text>
            </box>
            <scrollbox
                ref={scrollRef}
                scrollbarOptions={{
                    showArrows: false,
                    trackOptions: {
                        foregroundColor: theme.surface.scrollbarThumb,
                        backgroundColor: theme.surface.scrollbarTrack,
                    },
                }}>
                {hotkeys.map(({ group, entries }) => (
                    <box key={group} style={{ flexDirection: 'column', paddingBottom: 1 }}>
                        <box style={{ paddingBottom: 1 }}>
                            <text style={{ fg: theme.colors.secondary }}>
                                <u>{group}</u>
                            </text>
                        </box>
                        {entries.map((entry) => (
                            <box key={entry.key.join('+')} style={{ flexDirection: 'row', gap: 2 }}>
                                <box style={{ width: 12, flexShrink: 0, flexDirection: 'row' }}>
                                    {entry.key.map((k, i) => (
                                        <box key={k} style={{ flexDirection: 'row' }}>
                                            {i > 0 && (
                                                <text fg={theme.colors.hint} attributes={TextAttributes.DIM}>
                                                    {', '}
                                                </text>
                                            )}
                                            <text fg={theme.colors.accent} attributes={TextAttributes.BOLD}>
                                                {k}
                                            </text>
                                        </box>
                                    ))}
                                </box>
                                <box style={{ flexGrow: 1 }}>
                                    <text fg={theme.colors.hint}>{entry.description}</text>
                                </box>
                            </box>
                        ))}
                    </box>
                ))}
            </scrollbox>
        </box>
    )
}

export { HelpContent }
