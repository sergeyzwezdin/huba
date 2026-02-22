import type { FC } from 'react'
import { Outlet } from 'react-router'

import { useTerminalDimensions } from '@opentui/react'

import { Footer } from '@/widgets/footer'

const Layout: FC = () => {
    const { height: rows } = useTerminalDimensions()

    return (
        <box style={{ flexDirection: 'column', flexGrow: 1 }}>
            <box style={{ flexGrow: 1 }}>
                <Outlet />
            </box>
            {rows > 40 && <Footer />}
        </box>
    )
}

export { Layout }
