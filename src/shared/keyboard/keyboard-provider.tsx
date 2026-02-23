import { type FC, type PropsWithChildren, useCallback, useState } from 'react'

import { useDialogState } from '@opentui-ui/dialog/react'

import { KeyboardContext } from './keyboard-context'

const KeyboardProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isGlobalEnabled, setIsGlobalEnabled] = useState(true)
    const isDialogOpen = useDialogState((s) => s.isOpen)

    const disableGlobalHotkeys = useCallback(() => setIsGlobalEnabled(false), [])
    const enableGlobalHotkeys = useCallback(() => setIsGlobalEnabled(true), [])

    const effectiveIsGlobalEnabled = isGlobalEnabled && !isDialogOpen

    return (
        <KeyboardContext.Provider
            value={{ isGlobalEnabled: effectiveIsGlobalEnabled, disableGlobalHotkeys, enableGlobalHotkeys }}>
            {children}
        </KeyboardContext.Provider>
    )
}

export { KeyboardProvider }
