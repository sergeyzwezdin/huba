import type { FC, PropsWithChildren } from 'react'

import { Providers } from './providers'

const App: FC<PropsWithChildren> = ({ children }) => <Providers>{children}</Providers>

export { App }
