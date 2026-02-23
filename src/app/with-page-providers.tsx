import type { FC } from 'react'

import { FocusProvider } from '@/shared/focus-manager'
import { KeyboardProvider } from '@/shared/keyboard'

const withPageProviders: (component: FC) => FC = (Component) => () => (
    <KeyboardProvider>
        <FocusProvider>
            <Component />
        </FocusProvider>
    </KeyboardProvider>
)

export { withPageProviders }
