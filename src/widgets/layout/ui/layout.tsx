import type { FC } from 'react'
import { Outlet } from 'react-router'

import { useTerminalDimensions } from '@opentui/react'

import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { Footer } from '@/widgets/footer'

const Layout: FC = () => {
    const { width: columns, height: rows } = useTerminalDimensions()

    return (
        <box style={{ flexDirection: 'column', flexGrow: 1 }}>
            <box style={{ flexGrow: 1 }}>
                <RequiredWindowSize minWidth={40} minHeight={28}>
                    <Outlet />
                </RequiredWindowSize>
            </box>
            {rows > 40 && columns > 28 && <Footer />}
        </box>
    )
}

export { Layout }
