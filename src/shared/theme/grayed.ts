import { RGBA } from '@opentui/core'

import type { Theme } from './types'

const palette = {
    steel: RGBA.fromHex('#4A4A4A'),
    slate: RGBA.fromHex('#787878'),
    silver: RGBA.fromHex('#B0B0B0'),
    cloud: RGBA.fromHex('#D0D0D0'),
    mist: RGBA.fromHex('#E8E8E8'),
    white: RGBA.fromHex('#F5F5F5'),
    tin: RGBA.fromHex('#606060'),
    zinc: RGBA.fromHex('#505050'),
    iron: RGBA.fromHex('#383838'),
    ash: RGBA.fromHex('#2A2A2A'),
    pebble: RGBA.fromHex('#909090'),
    fog: RGBA.fromHex('#A0A0A0'),
    graphite: RGBA.fromHex('#6E6E6E'),
    nickel: RGBA.fromHex('#8A8A8A'),
    pearl: RGBA.fromHex('#C8C8C8'),
}

export const grayed: Theme = {
    border: {
        default: palette.steel,
        focused: palette.silver,
    },
    status: {
        pending: {
            id: palette.slate,
            icon: palette.slate,
            title: palette.slate,
        },
        blocked: {
            id: palette.pebble,
            icon: palette.pebble,
            title: palette.pebble,
        },
        inProgress: {
            id: palette.silver,
            icon: palette.silver,
            title: palette.white,
        },
        completed: {
            id: palette.tin,
            icon: palette.nickel,
            title: palette.tin,
        },
    },
    colors: {
        primary: palette.white,
        secondary: palette.white,
        tertiary: palette.cloud,
        date: palette.pearl,
        hint: palette.mist,
        accent: palette.silver,
    },
    surface: {
        selection: palette.zinc,
        scrollbarTrack: palette.ash,
        scrollbarThumb: palette.steel,
    },
    progress: {
        blocked: palette.zinc,
        pending: palette.graphite,
        inProgress: palette.silver,
        completed: palette.pearl,
    },
    markdown: {
        heading: palette.cloud,
        list: palette.nickel,
        code: palette.mist,
        default: palette.pearl,
    },
}
