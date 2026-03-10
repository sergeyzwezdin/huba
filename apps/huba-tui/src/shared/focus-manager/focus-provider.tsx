import { type FC, type PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react'

import { useKeyboard } from '@opentui/react'

import { FocusContext } from './focus-context'

type FocusableEntry = {
    id: string
    isActive: boolean
}

const FocusProvider: FC<PropsWithChildren> = ({ children }) => {
    const [activeId, setActiveId] = useState<string | undefined>(undefined)
    const [isEnabled, setIsEnabled] = useState(true)
    const [isTabEnabled, setIsTabEnabled] = useState(true)

    const activeIdRef = useRef<string | undefined>(undefined)
    const isEnabledRef = useRef(true)
    const isTabEnabledRef = useRef(true)
    const focusablesRef = useRef<FocusableEntry[]>([])

    activeIdRef.current = activeId
    isEnabledRef.current = isEnabled
    isTabEnabledRef.current = isTabEnabled

    const add = useCallback((id: string, options: { autoFocus: boolean }) => {
        focusablesRef.current = [...focusablesRef.current, { id, isActive: true }]

        if (options.autoFocus && activeIdRef.current === undefined) {
            setActiveId(id)
        }
    }, [])

    const remove = useCallback((id: string) => {
        focusablesRef.current = focusablesRef.current.filter((f) => f.id !== id)

        if (activeIdRef.current === id) {
            const remaining = focusablesRef.current.filter((f) => f.isActive)
            setActiveId(remaining[0]?.id)
        }
    }, [])

    const activate = useCallback((id: string) => {
        focusablesRef.current = focusablesRef.current.map((f) => (f.id === id ? { ...f, isActive: true } : f))
    }, [])

    const deactivate = useCallback((id: string) => {
        focusablesRef.current = focusablesRef.current.map((f) => (f.id === id ? { ...f, isActive: false } : f))

        if (activeIdRef.current === id) {
            setActiveId(undefined)
        }
    }, [])

    const enableFocus = useCallback(() => {
        setIsEnabled(true)
    }, [])

    const disableFocus = useCallback(() => {
        setIsEnabled(false)
        setActiveId(undefined)
    }, [])

    const enableTabButton = useCallback(() => {
        setIsTabEnabled(true)
    }, [])

    const disableTabButton = useCallback(() => {
        setIsTabEnabled(false)
    }, [])

    const focusNext = useCallback(() => {
        if (!isEnabledRef.current) return

        const active = focusablesRef.current.filter((f) => f.isActive)
        if (active.length === 0) return

        const currentIndex = active.findIndex((f) => f.id === activeIdRef.current)
        const nextIndex = currentIndex === -1 || currentIndex === active.length - 1 ? 0 : currentIndex + 1

        setActiveId(active[nextIndex].id)
    }, [])

    const focusPrevious = useCallback(() => {
        if (!isEnabledRef.current) return

        const active = focusablesRef.current.filter((f) => f.isActive)
        if (active.length === 0) return

        const currentIndex = active.findIndex((f) => f.id === activeIdRef.current)
        const prevIndex = currentIndex === -1 || currentIndex === 0 ? active.length - 1 : currentIndex - 1

        setActiveId(active[prevIndex].id)
    }, [])

    const focus = useCallback((id: string) => {
        if (!isEnabledRef.current) return

        const found = focusablesRef.current.find((f) => f.id === id && f.isActive)
        if (found) {
            setActiveId(id)
        }
    }, [])

    useKeyboard((key) => {
        if (!isEnabledRef.current) return
        if (!isTabEnabledRef.current) return

        if (key.name === 'tab' && !key.shift) {
            focusNext()
        } else if (key.name === 'tab' && key.shift) {
            focusPrevious()
        }
    })

    const contextValue = useMemo(
        () => ({
            activeId,
            isEnabled,
            isTabEnabled,
            add,
            remove,
            activate,
            deactivate,
            enableFocus,
            disableFocus,
            enableTabButton,
            disableTabButton,
            focusNext,
            focusPrevious,
            focus,
        }),
        [
            activeId,
            isEnabled,
            isTabEnabled,
            add,
            remove,
            activate,
            deactivate,
            enableFocus,
            disableFocus,
            enableTabButton,
            disableTabButton,
            focusNext,
            focusPrevious,
            focus,
        ],
    )

    return <FocusContext.Provider value={contextValue}>{children}</FocusContext.Provider>
}

export { FocusProvider }
