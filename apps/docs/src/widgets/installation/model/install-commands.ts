export type Platform = 'macOS' | 'Linux' | 'Windows'
export type Method = 'Brew' | 'NPM'

export const INSTALL_COMMANDS: Record<Platform, Partial<Record<Method, { install: string[]; upgrade: string[] }>>> = {
    macOS: {
        Brew: {
            install: ['brew tap sergeyzwezdin/huba', 'brew install sergeyzwezdin/huba/huba'],
            upgrade: ['brew update', 'brew upgrade huba'],
        },
        NPM: {
            install: ['npm -g install @sergeyzwezdin/huba'],
            upgrade: ['npm -g install @sergeyzwezdin/huba@latest'],
        },
    },
    Linux: {
        Brew: {
            install: ['brew tap sergeyzwezdin/huba', 'brew install sergeyzwezdin/huba/huba'],
            upgrade: ['brew update', 'brew upgrade huba'],
        },
        NPM: {
            install: ['npm -g install @sergeyzwezdin/huba'],
            upgrade: ['npm -g install @sergeyzwezdin/huba@latest'],
        },
    },
    Windows: {
        NPM: {
            install: ['npm -g install @sergeyzwezdin/huba'],
            upgrade: ['npm -g install @sergeyzwezdin/huba@latest'],
        },
    },
}
