'use client'

import type { FC, ReactNode } from 'react'
import { useCallback, useState } from 'react'

type CodeBlockProps = {
    children: ReactNode
    copyText?: string
    className?: string
}

const CodeBlock: FC<CodeBlockProps> = ({ children, copyText, className }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(() => {
        if (!copyText) return
        navigator.clipboard.writeText(copyText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [copyText])

    return (
        <div className={`code-block group relative ${className ?? ''}`}>
            {copyText && (
                <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-3 right-3 rounded-md border border-border-subtle bg-elevated px-2.5 py-1 text-xs text-subtle opacity-0 transition-all hover:text-foreground group-hover:opacity-100"
                    aria-label="Copy code">
                    {copied ? 'Copied' : 'Copy'}
                </button>
            )}
            {children}
        </div>
    )
}

export { CodeBlock }
