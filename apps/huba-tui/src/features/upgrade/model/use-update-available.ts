import { useCallback, useState } from 'react'

import { useBrewUpdateAvailable } from './use-brew-update-available'

/**
 * Checks whether a newer version is available on Homebrew.
 * Only performs the check when the app was installed via Homebrew.
 */
const useUpdateAvailable = (): { newVersionAvailable: boolean; latestVersion: string | undefined } => {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false)
    const [latestVersion, setLatestVersion] = useState<string | undefined>(undefined)

    const handleUpdateAvailable = useCallback((version: string) => {
        setLatestVersion(version)
        setNewVersionAvailable(true)
    }, [])

    useBrewUpdateAvailable(handleUpdateAvailable)

    return { newVersionAvailable, latestVersion }
}

export { useUpdateAvailable }
