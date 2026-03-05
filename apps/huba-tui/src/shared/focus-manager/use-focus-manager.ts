import { useContext } from 'react'

import { FocusContext } from './focus-context'

type UseFocusManagerResult = {
    isEnabled: boolean
    isTabEnabled: boolean
    enableFocus: () => void
    disableFocus: () => void
    enableTabButton: () => void
    disableTabButton: () => void
    focusNext: () => void
    focusPrevious: () => void
    focus: (id: string) => void
}

const useFocusManager = (): UseFocusManagerResult => {
    const {
        isEnabled,
        isTabEnabled,
        enableFocus,
        disableFocus,
        enableTabButton,
        disableTabButton,
        focusNext,
        focusPrevious,
        focus,
    } = useContext(FocusContext)

    return {
        isEnabled,
        isTabEnabled,
        enableFocus,
        disableFocus,
        enableTabButton,
        disableTabButton,
        focusNext,
        focusPrevious,
        focus,
    }
}

export { useFocusManager, type UseFocusManagerResult }
