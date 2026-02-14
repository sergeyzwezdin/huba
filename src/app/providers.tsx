import type { FC, PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/query'

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export { Providers }
