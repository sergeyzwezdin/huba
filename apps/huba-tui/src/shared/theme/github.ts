import { RGBA } from '@opentui/core'

import type { Theme } from './types'

const palette = {
    foreground: RGBA.fromHex('#E6EDF3'),
    muted: RGBA.fromHex('#B1BAC4'),
    subtle: RGBA.fromHex('#8B949E'),
    border: RGBA.fromHex('#484F58'),
    borderMuted: RGBA.fromHex('#21262D'),
    accent: RGBA.fromHex('#2F81F7'),
    blue: RGBA.fromHex('#58A6FF'),
    blueLight: RGBA.fromHex('#A5D6FF'),
    green: RGBA.fromHex('#3FB950'),
    greenEmphasis: RGBA.fromHex('#238636'),
    red: RGBA.fromHex('#F85149'),
    redEmphasis: RGBA.fromHex('#DA3633'),
    orange: RGBA.fromHex('#F78166'),
    coral: RGBA.fromHex('#FF7B72'),
    overlay: RGBA.fromHex('#161B22'),
    gray5: RGBA.fromHex('#484F58'),
    gray3: RGBA.fromHex('#8B949E'),
}

export const github: Theme = {
    border: {
        default: palette.border,
        focused: palette.accent,
    },
    status: {
        blocked: {
            id: palette.red,
            icon: palette.red,
            title: palette.red,
        },
        pending: {
            id: palette.muted,
            icon: palette.muted,
            title: palette.muted,
        },
        inProgress: {
            id: palette.accent,
            icon: palette.accent,
            title: palette.foreground,
        },
        completed: {
            id: palette.subtle,
            icon: palette.green,
            title: palette.subtle,
        },
    },
    colors: {
        primary: palette.foreground,
        secondary: palette.muted,
        tertiary: palette.subtle,
        date: palette.gray3,
        hint: palette.subtle,
        accent: palette.accent,
    },
    surface: {
        background: palette.overlay,
        selection: palette.borderMuted,
        scrollbarTrack: palette.overlay,
        scrollbarThumb: palette.gray5,
    },
    progress: {
        blocked: palette.redEmphasis,
        pending: palette.subtle,
        inProgress: palette.accent,
        completed: palette.green,
    },
    markdown: {
        heading: palette.blue,
        list: palette.coral,
        code: palette.blueLight,
        default: palette.foreground,
    },
}
