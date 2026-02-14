import type { FC, ReactNode } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

import type { RouteConfig, RouteParams, RouterContextValue, RouteStackEntry } from './types'

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

export const RouterContext = createContext<RouterContextValue | null>(null)

RouterContext.displayName = 'RouterContext'

type RouterProps = {
    routes: RouteConfig[]
    defaultRoute: string
    children?: ReactNode
}

const Router: FC<RouterProps> = ({ routes, defaultRoute, children }) => {
    // Memoize routes map for O(1) lookup
    const routesMap = useMemo(() => new Map(routes.map((route) => [route.name, route])), [routes])

    // Validate default route exists
    if (IS_DEVELOPMENT && !routesMap.has(defaultRoute)) {
        console.warn(`[RouterProvider] Default route "${defaultRoute}" not found in routes`)
    }

    const [stack, setStack] = useState<RouteStackEntry[]>(() => [{ name: defaultRoute }])

    // Navigation callbacks - stable references
    const push = useCallback((name: string, params?: RouteParams) => {
        setStack((prev) => [...prev, { name, params }])
    }, [])

    const back = useCallback(() => {
        setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
    }, [])

    const replace = useCallback((name: string, params?: RouteParams) => {
        setStack([{ name, params }])
    }, [])

    // Derived state
    const currentRoute = stack[stack.length - 1] ?? null
    const canGoBack = stack.length > 1

    // Context value - only recreate when necessary
    const value = useMemo<RouterContextValue>(
        () => ({
            push,
            back,
            replace,
            canGoBack: () => canGoBack,
            currentRoute,
        }),
        [push, back, replace, canGoBack, currentRoute],
    )

    // Find current route component
    const routeConfig = currentRoute ? routesMap.get(currentRoute.name) : null
    if (IS_DEVELOPMENT && currentRoute && !routeConfig) {
        console.warn(`[RouterProvider] Route "${currentRoute.name}" not found`)
    }

    const CurrentComponent = routeConfig?.component
    if (!CurrentComponent) {
        return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
    }

    return (
        <RouterContext.Provider value={value}>
            <CurrentComponent params={currentRoute?.params} />
        </RouterContext.Provider>
    )
}

Router.displayName = 'Router'

export { Router }
