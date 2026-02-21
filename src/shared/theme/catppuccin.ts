import { RGBA } from '@opentui/core'

import type { Theme } from './types'

const palette = {
    base: RGBA.fromHex('#1E1E2E'),
    mantle: RGBA.fromHex('#181825'),
    crust: RGBA.fromHex('#11111B'),
    surface0: RGBA.fromHex('#313244'),
    surface1: RGBA.fromHex('#45475A'),
    surface2: RGBA.fromHex('#585B70'),
    overlay0: RGBA.fromHex('#6C7086'),
    overlay1: RGBA.fromHex('#7F849C'),
    overlay2: RGBA.fromHex('#9399B2'),
    subtext0: RGBA.fromHex('#A6ADC8'),
    subtext1: RGBA.fromHex('#BAC2DE'),
    text: RGBA.fromHex('#CDD6F4'),
    lavender: RGBA.fromHex('#B4BEFE'),
    blue: RGBA.fromHex('#89B4FA'),
    sapphire: RGBA.fromHex('#74C7EC'),
    sky: RGBA.fromHex('#89DCEB'),
    teal: RGBA.fromHex('#94E2D5'),
    green: RGBA.fromHex('#A6E3A1'),
    yellow: RGBA.fromHex('#F9E2AF'),
    peach: RGBA.fromHex('#FAB387'),
    maroon: RGBA.fromHex('#EBA0AC'),
    red: RGBA.fromHex('#F38BA8'),
    mauve: RGBA.fromHex('#CBA6F7'),
    pink: RGBA.fromHex('#F5C2E7'),
    flamingo: RGBA.fromHex('#F2CDCD'),
    rosewater: RGBA.fromHex('#F5E0DC'),
}

export const catppuccin: Theme = {
    border: {
        default: palette.surface2,
        focused: palette.mauve,
    },
    status: {
        blocked: {
            id: palette.red,
            icon: palette.red,
            title: palette.maroon,
        },
        pending: {
            id: palette.subtext1,
            icon: palette.subtext1,
            title: palette.text,
        },
        inProgress: {
            id: palette.peach,
            icon: palette.yellow,
            title: palette.text,
        },
        completed: {
            id: palette.subtext0,
            icon: palette.green,
            title: palette.subtext0,
        },
    },
    colors: {
        primary: palette.text,
        secondary: palette.subtext1,
        tertiary: palette.subtext0,
        date: palette.subtext1,
        hint: palette.subtext0,
        accent: palette.mauve,
    },
    surface: {
        selection: palette.surface1,
        scrollbarTrack: palette.mantle,
        scrollbarThumb: palette.surface2,
    },
    progress: {
        blocked: palette.maroon,
        pending: palette.overlay0,
        inProgress: palette.peach,
        completed: palette.green,
    },
    markdown: {
        heading: palette.blue,
        list: palette.peach,
        code: palette.sky,
        default: palette.text,
    },
}
