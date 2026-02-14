import type { ComponentType } from 'react'

export type RouteParams = Record<string, unknown>

export type RouteConfig = {
    name: string
    component: ComponentType<{ params?: RouteParams }>
}

export type RouteStackEntry = {
    name: string
    params?: RouteParams
}

export type RouterContextValue = {
    push: (name: string, params?: RouteParams) => void
    back: () => void
    replace: (name: string, params?: RouteParams) => void
    canGoBack: () => boolean
    currentRoute: RouteStackEntry | null
}
