import type { FC } from 'react'

type CodeLineProps = {
    prompt?: boolean
    children: string
}

const CodeLine: FC<CodeLineProps> = ({ prompt = true, children }) => (
    <div>
        {prompt && <span className="prompt">$ </span>}
        {children}
    </div>
)

export { CodeLine }
