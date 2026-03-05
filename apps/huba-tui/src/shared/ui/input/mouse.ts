import { useRef } from 'react'

const DOUBLE_CLICK_THRESHOLD = 400

/**
 * Returns a mousedown handler that fires `onChange` only on double-click.
 */
const useDoubleClick = <T extends string>(onChange: (value: T) => void): ((value: T) => void) => {
    const lastClickRef = useRef<{ value: string; time: number } | null>(null)

    return (optionValue: T): void => {
        const now = Date.now()
        const last = lastClickRef.current
        if (last && last.value === optionValue && now - last.time < DOUBLE_CLICK_THRESHOLD) {
            onChange(optionValue)
            lastClickRef.current = null
        } else {
            lastClickRef.current = { value: optionValue, time: now }
        }
    }
}

export { useDoubleClick }
