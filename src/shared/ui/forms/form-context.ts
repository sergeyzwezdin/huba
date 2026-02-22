import { createContext, type RefObject, useContext } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'

type FormContextValue = {
    maxTitleWidth: number
    registerTitle: (id: string, length: number) => void
    unregisterTitle: (id: string) => void
    scrollRef?: RefObject<ScrollBoxRenderable | null>
}

const FormContext = createContext<FormContextValue | null>(null)

const useFormContext = () => useContext(FormContext)

export { FormContext }
export type { FormContextValue }
export { useFormContext }
