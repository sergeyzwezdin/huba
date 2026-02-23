import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

import type { PrimitiveAtom } from 'jotai'
import { createJSONStorage, atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils'

const SETTINGS_DIR = join(homedir(), '.huba')
const SETTINGS_FILE = join(SETTINGS_DIR, 'settings.json')

let settingsCache: Record<string, unknown> | null = null

const readSettings = (): Record<string, unknown> => {
    if (settingsCache !== null) return settingsCache
    try {
        const content = readFileSync(SETTINGS_FILE, 'utf-8')
        settingsCache = JSON.parse(content) as Record<string, unknown>
        return settingsCache
    } catch {
        settingsCache = {}
        return settingsCache
    }
}

const updateSetting = <T>(key: string, value: T): void => {
    mkdirSync(SETTINGS_DIR, { recursive: true })
    const settings = readSettings()
    settings[key] = value
    writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

const getSetting = <T>(key: string): T | undefined => {
    const settings = readSettings()
    return settings[key] as T | undefined
}

const createSyncStorage = <T>() =>
    createJSONStorage<T>(() => ({
        getItem: (key: string) => {
            const value = getSetting<T>(key)
            return value !== undefined ? JSON.stringify(value) : null
        },
        setItem: (key: string, value: string) => {
            updateSetting(key, JSON.parse(value) as T)
        },
        removeItem: (key: string) => {
            updateSetting(key, undefined)
        },
    }))

/**
 * Creates a Jotai atom whose value is persisted in ~/.huba/settings.json.
 * Reads the initial value from storage, falls back to `initialValue` if absent.
 */
export const atomWithStorage = <T>(key: string, initialValue: T): PrimitiveAtom<T> =>
    jotaiAtomWithStorage<T>(key, initialValue, createSyncStorage<T>())
