import { useContext } from 'react'

import { RouterContext } from './router'

const useRouter = () => {
    const context = useContext(RouterContext)
    if (!context) throw new Error('useRouter must be used within RouterProvider')

    return context
}

export { useRouter }
