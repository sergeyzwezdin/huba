import { useEffect, useState } from 'react'

import { useStdout } from 'ink'

/**
 * Terminal dimensions in columns and rows
 */
type Dimensions = {
    /** Number of character columns (horizontal size) */
    columns: number
    /** Number of character rows (vertical size) */
    rows: number
}

/**
 * Returns the current terminal dimensions and re-renders when the terminal is resized.
 *
 * Subscribes to the stdout `resize` event so the returned value stays in sync
 * with the actual terminal size throughout the component's lifetime.
 *
 * @returns Current `{ columns, rows }` of the terminal window
 */
const useDimensions = (): Dimensions => {
    const { stdout } = useStdout()

    // Initialise with the current size so the first render is already correct
    const [dimensions, setDimensions] = useState<Dimensions>({
        columns: stdout.columns,
        rows: stdout.rows,
    })

    useEffect(() => {
        // Re-read dimensions whenever the terminal window is resized
        const handler = () => {
            setDimensions({ columns: stdout.columns, rows: stdout.rows })
        }
        stdout.on('resize', handler)
        return () => {
            stdout.off('resize', handler)
        }
    }, [stdout])

    return dimensions
}

export { useDimensions }
