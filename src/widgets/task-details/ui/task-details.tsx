import type { ComponentProps, FC } from 'react'

import { Box, Text, useFocus } from 'ink'

import { Markdown } from '@/shared/ui/markdown'
import { Panel } from '@/shared/ui/panel'
import { ScrollView } from '@/shared/ui/scroll-view'

type TaskDetailsProps = Pick<
    ComponentProps<typeof Panel>,
    'flexGrow' | 'flexShrink' | 'flexBasis' | 'width' | 'height' | 'minWidth' | 'minHeight'
>
const text = `Add a scrollable details panel to the task view that renders the task description as markdown. The panel should support keyboard navigation and respect focus state.

## Background

Currently the task list shows only subject and \`status\`. Users need to see the full task description without leaving the TUI. The description field contains arbitrary markdown authored by Claude Code.
`

const TaskDetails: FC<TaskDetailsProps> = (props) => {
    return (
        <Panel
            focusable
            panelId="task-details"
            borderStyle="round"
            paddingLeft={1}
            paddingTop={1}
            paddingRight={2}
            flexDirection="column"
            titles={['Details']}
            {...props}>
            <Box flexDirection="row" paddingBottom={1} gap={1}>
                <Box flexShrink={0}>
                    <Text dimColor={true} bold={true} backgroundColor="gray">
                        [123]
                    </Text>
                </Box>
                <Box flexGrow={1}>
                    <Text underline={true} color="brightWhite">
                        Implement task details scrollable panel that renders the task description as markdown.
                    </Text>
                </Box>
            </Box>
            <Box flexDirection="row" paddingBottom={1} gap={1}>
                <Box flexShrink={0}>
                    <Text dimColor={true}>Status:</Text>
                </Box>
                <Box flexGrow={1}>
                    <Text color="brightWhite">In Progress</Text>
                </Box>
            </Box>
            {/* <ScrollView isFocused={isFocused}> */}
            <Markdown>{text}</Markdown>
            {/* </ScrollView> */}
        </Panel>
    )
}

export { TaskDetails }
