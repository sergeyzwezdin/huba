import { createContext } from 'react'

type KeyboardContextValue = {
    isGlobalEnabled: boolean
    disableGlobalHotkeys: () => void
    enableGlobalHotkeys: () => void
}

const KeyboardContext = createContext<KeyboardContextValue>({
    isGlobalEnabled: true,
    disableGlobalHotkeys: () => {},
    enableGlobalHotkeys: () => {},
})

export { KeyboardContext, type KeyboardContextValue }
