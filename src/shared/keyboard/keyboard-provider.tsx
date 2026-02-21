import { type FC, type PropsWithChildren, useCallback, useState } from 'react'

import { KeyboardContext } from './keyboard-context'

const KeyboardProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isGlobalEnabled, setIsGlobalEnabled] = useState(true)

    const disableGlobalHotkeys = useCallback(() => setIsGlobalEnabled(false), [])
    const enableGlobalHotkeys = useCallback(() => setIsGlobalEnabled(true), [])

    return (
        <KeyboardContext.Provider value={{ isGlobalEnabled, disableGlobalHotkeys, enableGlobalHotkeys }}>
            {children}
        </KeyboardContext.Provider>
    )
}

export { KeyboardProvider }
