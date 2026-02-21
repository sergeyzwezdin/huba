import { createContext } from 'react'

type FocusContextValue = {
    activeId: string | undefined
    isEnabled: boolean
    isTabEnabled: boolean
    add: (id: string, options: { autoFocus: boolean }) => void
    remove: (id: string) => void
    activate: (id: string) => void
    deactivate: (id: string) => void
    enableFocus: () => void
    disableFocus: () => void
    enableTabButton: () => void
    disableTabButton: () => void
    focusNext: () => void
    focusPrevious: () => void
    focus: (id: string) => void
}

const FocusContext = createContext<FocusContextValue>({
    activeId: undefined,
    isEnabled: true,
    isTabEnabled: true,
    add: () => {},
    remove: () => {},
    activate: () => {},
    deactivate: () => {},
    enableFocus: () => {},
    disableFocus: () => {},
    enableTabButton: () => {},
    disableTabButton: () => {},
    focusNext: () => {},
    focusPrevious: () => {},
    focus: () => {},
})

FocusContext.displayName = 'FocusContext'

export { FocusContext, type FocusContextValue }
