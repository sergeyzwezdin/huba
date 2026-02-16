// ANSI escape sequences for the terminal alternate screen buffer
const ENTER_ALT_SCREEN = '\x1b[?1049h'
const LEAVE_ALT_SCREEN = '\x1b[?1049l'

/**
 * Switches the terminal to the alternate screen buffer and registers
 * a process `exit` handler to restore the primary screen on shutdown.
 *
 * The alternate screen provides a clean full-screen canvas that disappears
 * when the application exits, leaving the original terminal content intact.
 */
const enterAltScreen = (): void => {
    process.stdout.write(ENTER_ALT_SCREEN)
    process.on('exit', () => {
        process.stdout.write(LEAVE_ALT_SCREEN)
    })
}

export { enterAltScreen }
