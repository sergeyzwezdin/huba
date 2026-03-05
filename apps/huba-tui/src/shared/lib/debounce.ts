/**
 * Returns a debounced version of `fn` that delays invocation by `delay` ms.
 * Subsequent calls within the delay window reset the timer.
 */
export const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number): ((...args: T) => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined
    return (...args: T) => {
        if (timer !== undefined) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}
