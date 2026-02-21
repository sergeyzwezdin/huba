import type { FC, PropsWithChildren } from 'react'

import { DialogProvider } from '@opentui-ui/dialog/react'
import { Toaster } from '@opentui-ui/toast/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { FocusProvider } from '@/shared/focus-manager'
import { queryClient } from '@/shared/state'

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <FocusProvider>
            <DialogProvider size="medium">{children}</DialogProvider>
            <Toaster stackingMode="single" />
        </FocusProvider>
    </QueryClientProvider>
)

export { Providers }
