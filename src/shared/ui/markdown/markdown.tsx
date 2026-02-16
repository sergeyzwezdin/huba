import type { FC } from 'react'

import dedent from 'dedent'
import { Text } from 'ink'
import { type MarkedOptions, parse, setOptions } from 'marked'
import type TerminalRendererType from 'marked-terminal'
import TerminalRenderer from 'marked-terminal'

type TerminalRendererOptions = TerminalRendererType.TerminalRendererOptions

export type MarkdownProps = TerminalRendererOptions & {
    children: string
}

const Markdown: FC<MarkdownProps> = ({ children, ...options }) => {
    setOptions({ renderer: new TerminalRenderer(options) as unknown as MarkedOptions['renderer'] })
    return <Text>{(parse(dedent(children)) as string).trim()}</Text>
}

export { Markdown }
