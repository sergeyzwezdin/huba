import { type FC, useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'

import { LayoutField, ProgressField, ThemeField } from '@/features/settings'
import { useTheme } from '@/shared/settings'
import { Form } from '@/shared/ui/forms'
import { Panel } from '@/shared/ui/panel'

import { useHotkeys } from '../model/use-hotkeys'

const SettingsPage: FC = () => {
    const { theme } = useTheme()
    const scrollRef = useRef<ScrollBoxRenderable>(null)
    useHotkeys()

    return (
        <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
            <Panel
                focusable={false}
                title="Settings"
                style={{
                    flexDirection: 'column',
                    flexGrow: 1,
                    flexBasis: 1,
                    borderColor: theme.border.focused,
                }}>
                <scrollbox
                    ref={scrollRef}
                    scrollbarOptions={{
                        showArrows: false,
                        trackOptions: {
                            foregroundColor: theme.surface.scrollbarThumb,
                            backgroundColor: theme.surface.scrollbarTrack,
                        },
                    }}>
                    <Form
                        scrollRef={scrollRef}
                        style={{
                            paddingLeft: 2,
                            paddingRight: 3,
                            paddingTop: 1,
                            paddingBottom: 1,
                        }}>
                        <ThemeField autoFocus />
                        <LayoutField />
                        <ProgressField />
                        {/* <FilterStatusField />
                            <SortFieldField />
                            <SortDirectionField /> */}
                    </Form>
                </scrollbox>
            </Panel>
        </box>
    )
}

export { SettingsPage }
