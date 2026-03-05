import { type RefObject, useContext, useEffect, useMemo, useRef } from 'react'

import { type BoxRenderable, RenderableEvents } from '@opentui/core'

import { FocusContext } from './focus-context'

type UseFocusOptions = {
    id?: string
    isActive?: boolean
    autoFocus?: boolean
}

type UseFocusResult = {
    isFocused: boolean
    focus: (id: string) => void
    ref: RefObject<BoxRenderable | null>
}

const useFocus = ({ id: providedId, isActive = true, autoFocus = false }: UseFocusOptions = {}): UseFocusResult => {
    const { activeId, add, remove, activate, deactivate, focus } = useContext(FocusContext)

    const ref = useRef<BoxRenderable>(null)
    const focusRef = useRef(focus)
    focusRef.current = focus

    const id = useMemo(
        () => providedId ?? Math.random().toString(36).slice(2),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [providedId],
    )

    useEffect(() => {
        add(id, { autoFocus })
        return () => {
            remove(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, add, autoFocus, remove])

    useEffect(() => {
        if (isActive) {
            activate(id)
        } else {
            deactivate(id)
        }
    }, [id, isActive, activate, deactivate])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const handleFocused = () => {
            focusRef.current(id)
        }

        el.on(RenderableEvents.FOCUSED, handleFocused)
        return () => {
            el.off(RenderableEvents.FOCUSED, handleFocused)
        }
    }, [id])

    return {
        isFocused: activeId === id,
        focus,
        ref,
    }
}

export { useFocus, type UseFocusOptions, type UseFocusResult }
