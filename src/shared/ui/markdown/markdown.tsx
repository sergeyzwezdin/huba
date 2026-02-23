import type { FC } from 'react'

import { type MarkdownRenderable, SyntaxStyle } from '@opentui/core'
import type { ExtendedComponentProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

export type MarkdownProps = {
    children: string
} & Omit<ExtendedComponentProps<typeof MarkdownRenderable>, 'content' | 'syntaxStyle'>

const Markdown: FC<MarkdownProps> = ({ children, ...props }) => {
    const { theme } = useTheme()

    const style = SyntaxStyle.fromStyles({
        'markup.heading.1': { fg: theme.markdown.heading, bold: true },
        'markup.heading.2': { fg: theme.markdown.heading, bold: true },
        'markup.list': { fg: theme.markdown.list },
        'markup.raw': { fg: theme.markdown.code },
        default: { fg: theme.markdown.default },
    })

    return <markdown content={children} syntaxStyle={style} {...props} />
}

export { Markdown }
