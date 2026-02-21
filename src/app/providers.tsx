import type { FC, PropsWithChildren } from 'react'

import { DialogProvider } from '@opentui-ui/dialog/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'

import { FocusProvider } from '@/shared/focus-manager'
import { queryClient } from '@/shared/state'
import { store as jotaiStore } from '@/shared/state/jotai'

import { Toaster } from './toaster'

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <JotaiProvider store={jotaiStore}>
            <FocusProvider>
                <DialogProvider size="medium">{children}</DialogProvider>
                <Toaster />
            </FocusProvider>
        </JotaiProvider>
    </QueryClientProvider>
)

export { Providers }
