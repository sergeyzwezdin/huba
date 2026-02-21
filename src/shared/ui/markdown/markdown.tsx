import type { FC } from 'react'

import { SyntaxStyle } from '@opentui/core'

import { useTheme } from '@/shared/settings'

export type MarkdownProps = {
    children: string
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
    const { theme } = useTheme()

    const style = SyntaxStyle.fromStyles({
        'markup.heading.1': { fg: theme.markdown.heading, bold: true },
        'markup.heading.2': { fg: theme.markdown.heading, bold: true },
        'markup.list': { fg: theme.markdown.list },
        'markup.raw': { fg: theme.markdown.code },
        default: { fg: theme.markdown.default },
    })

    return <markdown content={children} syntaxStyle={style} />
}

export { Markdown }
