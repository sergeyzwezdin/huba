import type { FC, PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { FocusProvider } from '@/shared/focus-manager'
import { queryClient } from '@/shared/query'

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <FocusProvider>{children}</FocusProvider>
    </QueryClientProvider>
)

export { Providers }
