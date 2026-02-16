import { type FC, type ReactNode, useEffect, useRef } from 'react'

import { useInput, useStdout } from 'ink'
import { ScrollView as ScrollViewBase, type ScrollViewRef } from 'ink-scroll-view'

type ScrollViewProps = {
    isFocused?: boolean
    children: ReactNode
}

const ScrollView: FC<ScrollViewProps> = ({ isFocused = false, children }) => {
    const scrollRef = useRef<ScrollViewRef>(null)
    const { stdout } = useStdout()

    useEffect(() => {
        const handleResize = () => scrollRef.current?.remeasure()
        stdout?.on('resize', handleResize)
        return () => {
            stdout?.off('resize', handleResize)
        }
    }, [stdout])

    const scrollBy = (delta: number) => {
        const ref = scrollRef.current
        if (!ref) return
        const next = ref.getScrollOffset() + delta
        ref.scrollTo(Math.max(0, Math.min(ref.getBottomOffset(), next)))
    }

    useInput(
        (input, key) => {
            if (key.upArrow || input === 'k') {
                scrollBy(-1)
            }
            if (key.downArrow || input === 'j') {
                scrollBy(1)
            }
            if (key.pageUp) {
                scrollBy(-(scrollRef.current?.getViewportHeight() || 1))
            }
            if (key.pageDown) {
                scrollBy(scrollRef.current?.getViewportHeight() || 1)
            }
            if (key.home) {
                scrollRef.current?.scrollToTop()
            }
            if (key.end) {
                scrollRef.current?.scrollToBottom()
            }
        },
        { isActive: isFocused },
    )

    return <ScrollViewBase ref={scrollRef}>{children}</ScrollViewBase>
}

export { ScrollView }
