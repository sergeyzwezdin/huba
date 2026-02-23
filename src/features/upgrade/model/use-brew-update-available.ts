import { useEffect } from 'react'

import { toast } from '@opentui-ui/toast'

import { version as currentVersion } from '~/package.json'

import { compareSemver } from './compare-semver'

const FORMULA_URL = 'https://raw.githubusercontent.com/sergeyzwezdin/homebrew-huba/refs/heads/master/Formula/huba.rb'

/**
 * Parses the version string from a Homebrew formula file content.
 * Matches patterns like: version "1.2.3"
 */
const parseFormulaVersion = (content: string): string | undefined => {
    const match = /version\s+"([^"]+)"/.exec(content)
    return match?.[1]
}

/** Returns true if the binary was installed via Homebrew. */
const isBrewInstall = (): boolean => {
    const execPath = process.execPath
    return execPath.includes('/homebrew/') || execPath.includes('/linuxbrew/')
}

/**
 * Checks for a newer Homebrew formula version and invokes the callback if one is found.
 * Only runs when the app was installed via Homebrew.
 */
const useBrewUpdateAvailable = (onUpdateAvailable: (version: string) => void): void => {
    useEffect(() => {
        if (!isBrewInstall()) return

        void (async () => {
            try {
                const response = await fetch(FORMULA_URL)
                if (!response.ok) return

                const content = await response.text()
                const parsed = parseFormulaVersion(content)

                if (!parsed) return

                if (compareSemver(parsed, currentVersion) > 0) {
                    onUpdateAvailable(parsed)
                }
            } catch {
                toast.error('Unable to check for updates. Check your internet connection.')
            }
        })()
    }, [onUpdateAvailable])
}

export { useBrewUpdateAvailable }
