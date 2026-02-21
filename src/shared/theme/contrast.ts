import { RGBA } from '@opentui/core'

import type { Theme } from './types'

const palette = {
    black: RGBA.fromHex('#000000'),
    white: RGBA.fromHex('#FFFFFF'),
    lightGray: RGBA.fromHex('#CCCCCC'),
    mediumGray: RGBA.fromHex('#888888'),
    darkGray: RGBA.fromHex('#333333'),
    deepGray: RGBA.fromHex('#1A1A1A'),
    brightRed: RGBA.fromHex('#FF3333'),
    dimRed: RGBA.fromHex('#CC2222'),
    brightGreen: RGBA.fromHex('#00FF41'),
    dimGreen: RGBA.fromHex('#00BB33'),
    brightYellow: RGBA.fromHex('#FFFF00'),
    brightCyan: RGBA.fromHex('#00FFFF'),
    orange: RGBA.fromHex('#FF8800'),
}

export const contrast: Theme = {
    border: {
        default: palette.mediumGray,
        focused: palette.white,
    },
    status: {
        blocked: {
            id: palette.brightRed,
            icon: palette.brightRed,
            title: palette.brightRed,
        },
        pending: {
            id: palette.lightGray,
            icon: palette.lightGray,
            title: palette.lightGray,
        },
        inProgress: {
            id: palette.brightYellow,
            icon: palette.brightYellow,
            title: palette.white,
        },
        completed: {
            id: palette.mediumGray,
            icon: palette.brightGreen,
            title: palette.mediumGray,
        },
    },
    colors: {
        primary: palette.white,
        secondary: palette.lightGray,
        tertiary: palette.mediumGray,
        date: palette.lightGray,
        hint: palette.mediumGray,
        accent: palette.brightYellow,
    },
    surface: {
        selection: palette.deepGray,
        scrollbarTrack: palette.black,
        scrollbarThumb: palette.darkGray,
    },
    progress: {
        blocked: palette.dimRed,
        pending: palette.darkGray,
        inProgress: palette.brightYellow,
        completed: palette.brightGreen,
    },
    markdown: {
        heading: palette.brightCyan,
        list: palette.brightYellow,
        code: palette.brightGreen,
        default: palette.white,
    },
}
