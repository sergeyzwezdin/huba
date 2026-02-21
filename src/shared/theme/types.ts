import type { RGBA } from '@opentui/core'

export type Theme = {
    border: {
        default: RGBA
        focused: RGBA
    }
    status: {
        blocked: { id: RGBA; icon: RGBA; title: RGBA }
        pending: { id: RGBA; icon: RGBA; title: RGBA }
        inProgress: { id: RGBA; icon: RGBA; title: RGBA }
        completed: { id: RGBA; icon: RGBA; title: RGBA }
    }
    colors: {
        primary: RGBA
        secondary: RGBA
        tertiary: RGBA
        date: RGBA
        hint: RGBA
        accent: RGBA
    }
    surface: {
        selection: RGBA
        scrollbarTrack: RGBA
        scrollbarThumb: RGBA
    }
    progress: {
        blocked: RGBA
        pending: RGBA
        inProgress: RGBA
        completed: RGBA
    }
    markdown: {
        heading: RGBA
        list: RGBA
        code: RGBA
        default: RGBA
    }
}
