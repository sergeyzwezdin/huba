import { RGBA } from '@opentui/core'

import type { Theme } from './types'

const palette = {
    charcoal: RGBA.fromHex('#696968'),
    rust: RGBA.fromHex('#D77757'),
    smoke: RGBA.fromHex('#BCBCBB'),
    crimson: RGBA.fromHex('#FF5455'),
    white: RGBA.fromHex('#FFFFFF'),
    ash: RGBA.fromHex('#999999'),
    emerald: RGBA.fromHex('#4DBA64'),
    stone: RGBA.fromHex('#888888'),
    flint: RGBA.fromHex('#666666'),
    coal: RGBA.fromHex('#444444'),
    void: RGBA.fromHex('#1A1A1A'),
    pebble: RGBA.fromHex('#aaaaaa'),
    fog: RGBA.fromHex('#A2A2A2'),
    bark: RGBA.fromHex('#C1484C'),
    iron: RGBA.fromHex('#7C7C7B'),
    sapphire: RGBA.fromHex('#58A6FF'),
    coral: RGBA.fromHex('#FF7B72'),
    mist: RGBA.fromHex('#A5D6FF'),
    paper: RGBA.fromHex('#E6EDF3'),
}

export const claude: Theme = {
    border: {
        default: palette.charcoal,
        focused: palette.rust,
    },
    status: {
        blocked: {
            id: palette.crimson,
            icon: palette.crimson,
            title: palette.crimson,
        },
        pending: {
            id: palette.smoke,
            icon: palette.smoke,
            title: palette.smoke,
        },
        inProgress: {
            id: palette.rust,
            icon: palette.rust,
            title: palette.white,
        },
        completed: {
            id: palette.ash,
            icon: palette.emerald,
            title: palette.ash,
        },
    },
    colors: {
        primary: palette.white,
        secondary: palette.stone,
        tertiary: palette.flint,
        date: palette.pebble,
        hint: palette.fog,
        accent: palette.rust,
    },
    surface: {
        background: palette.void,
        selection: palette.coal,
        scrollbarTrack: palette.coal,
        scrollbarThumb: palette.flint,
    },
    progress: {
        blocked: palette.bark,
        pending: palette.iron,
        inProgress: palette.rust,
        completed: palette.emerald,
    },
    markdown: {
        heading: palette.sapphire,
        list: palette.coral,
        code: palette.mist,
        default: palette.paper,
    },
}
