import { useEffect, useRef } from 'react'

import type { DOMElement } from 'ink'
import { measureElement, useFocusManager, useStdin, useStdout } from 'ink'

// ESC char via fromCharCode to avoid control character literals in source
const ESC = String.fromCharCode(27)

/** Matches SGR extended mouse press events: ESC[<button;col;rowM */
const SGR_MOUSE_PRESS = new RegExp(`${ESC}\\[<(\\d+);(\\d+);(\\d+)M`)

/**
 * Computes the absolute terminal position of a yoga layout node
 * by traversing the parent chain and summing computed offsets.
 *
 * @param node - Ink DOM element to measure
 * @returns Zero-based `{ x, y }` position in terminal columns/rows
 */
const getAbsolutePosition = (node: DOMElement): { x: number; y: number } => {
    let x = 0
    let y = 0
    let current: DOMElement | undefined = node

    while (current) {
        if (current.yogaNode) {
            x += current.yogaNode.getComputedLeft()
            y += current.yogaNode.getComputedTop()
        }
        current = current.parentNode
    }

    return { x, y }
}

/**
 * Enables terminal mouse tracking and focuses the given Ink focus target
 * when the user left-clicks within the bounds of the returned ref element.
 *
 * Activates SGR extended mouse protocol (`\x1b[?1000h\x1b[?1006h`) on mount
 * and deactivates it on unmount. Hit-testing uses yoga computed layout to
 * derive the element's absolute terminal position.
 *
 * @param focusId - The `id` passed to `useFocus({ id })` in the target component
 * @returns Ref to attach to the `<Box>` that defines the clickable area
 *
 * @example
 * const ref = useMouseFocus('my-panel')
 * return <Box ref={ref}>...</Box>
 */
const useMouseFocus = (focusId: string) => {
    // Ref attached to the <Box> whose bounds define the clickable area
    const ref = useRef<DOMElement>(null)
    const { focus } = useFocusManager()
    const { stdin } = useStdin()
    const { stdout } = useStdout()

    // Keep focusId in a ref so the stdin handler always reads the latest value
    // without needing to re-register the listener on every render
    const focusIdRef = useRef(focusId)

    useEffect(() => {
        focusIdRef.current = focusId
    })

    useEffect(() => {
        // Request SGR extended mouse tracking from the terminal.
        // ?1000h = enable basic mouse reporting, ?1006h = switch to SGR encoding
        // (supports terminals wider than 223 columns and gives exact press/release)
        stdout.write(`${ESC}[?1000h${ESC}[?1006h`)

        const handler = (data: Buffer) => {
            const match = data.toString().match(SGR_MOUSE_PRESS)
            if (!match) return

            const [, buttonStr, colStr, rowStr] = match

            // Button 0 = left button press; skip scroll, right-click, etc.
            if (buttonStr !== '0') return

            // Terminal reports 1-based coordinates; convert to 0-based
            const x = parseInt(colStr ?? '0', 10) - 1
            const y = parseInt(rowStr ?? '0', 10) - 1

            // Guard: ref may not be populated yet on the very first render
            if (!ref.current) return

            // Get element size and absolute position in the terminal grid
            const { width, height } = measureElement(ref.current)
            const { x: elX, y: elY } = getAbsolutePosition(ref.current)

            // Hit-test: check whether the click falls inside the element's bounds
            if (x >= elX && x < elX + width && y >= elY && y < elY + height) {
                focus(focusIdRef.current)
            }
        }

        stdin.on('data', handler)

        return () => {
            // Restore terminal to non-tracking mode and remove the listener
            stdout.write(`${ESC}[?1006l${ESC}[?1000l`)
            stdin.off('data', handler)
        }
    }, [stdin, stdout, focus])

    return ref
}

export { useMouseFocus }
