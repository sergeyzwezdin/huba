export type Platform = 'macOS' | 'Linux' | 'Windows'
export type Method = 'Brew' | 'NPM'

export const INSTALL_COMMANDS: Record<Platform, Partial<Record<Method, { install: string[]; upgrade: string[] }>>> = {
    macOS: {
        Brew: {
            install: ['brew tap sergeyzwezdin/huba', 'brew install sergeyzwezdin/huba/huba'],
            upgrade: ['brew update', 'brew upgrade huba'],
        },
        NPM: {
            install: ['npm -g install huba'],
            upgrade: ['npm -g update huba'],
        },
    },
    Linux: {
        Brew: {
            install: ['brew tap sergeyzwezdin/huba', 'brew install sergeyzwezdin/huba/huba'],
            upgrade: ['brew update', 'brew upgrade huba'],
        },
        NPM: {
            install: ['npm -g install huba'],
            upgrade: ['npm -g update huba'],
        },
    },
    Windows: {
        NPM: {
            install: ['npm -g install huba'],
            upgrade: ['npm -g update huba'],
        },
    },
}
