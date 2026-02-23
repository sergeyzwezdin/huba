import { useContext, useRef } from 'react'

import { useKeyboard as useCoreKeyboard } from '@opentui/react'

import { KeyboardContext } from './keyboard-context'

type UseKeyboardCallback = Parameters<typeof useCoreKeyboard>[0]

const useKeyboard = (callback?: UseKeyboardCallback) => {
    const { isGlobalEnabled, disableGlobalHotkeys, enableGlobalHotkeys } = useContext(KeyboardContext)

    const isEnabledRef = useRef(isGlobalEnabled)
    isEnabledRef.current = isGlobalEnabled

    const callbackRef = useRef(callback)
    callbackRef.current = callback

    useCoreKeyboard((key) => {
        if (!isEnabledRef.current) return
        callbackRef.current?.(key)
    })

    return { disableGlobalHotkeys, enableGlobalHotkeys } as const
}

export { useKeyboard }
