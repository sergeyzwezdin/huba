import { type FC, type PropsWithChildren, type RefObject, useCallback, useMemo, useState } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import type { BoxProps } from '@opentui/react'

import { FormContext } from './form-context'

type FormProps = PropsWithChildren<
    BoxProps & {
        scrollRef?: RefObject<ScrollBoxRenderable | null>
    }
>

const Form: FC<FormProps> = ({ children, scrollRef, ...props }) => {
    const [titles, setTitles] = useState<Record<string, number>>({})

    const registerTitle = useCallback((id: string, length: number) => {
        setTitles((prev) => ({ ...prev, [id]: length }))
    }, [])

    const unregisterTitle = useCallback((id: string) => {
        setTitles((prev) => {
            const next = { ...prev }
            delete next[id]
            return next
        })
    }, [])

    const maxTitleWidth = useMemo(() => Math.min(20, Math.max(0, ...Object.values(titles))), [titles])

    const contextValue = useMemo(
        () => ({ maxTitleWidth, registerTitle, unregisterTitle, scrollRef }),
        [maxTitleWidth, registerTitle, unregisterTitle, scrollRef],
    )

    return (
        <FormContext.Provider value={contextValue}>
            <box
                {...props}
                style={{
                    ...props.style,
                    gap: 1,
                }}>
                {children}
            </box>
        </FormContext.Provider>
    )
}

export { Form }
export type { FormProps }
