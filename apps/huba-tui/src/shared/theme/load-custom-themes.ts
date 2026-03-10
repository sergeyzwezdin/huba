import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

import type { Theme } from './types'
import { themeSchema } from './types'

const THEMES_DIR = join(homedir(), '.huba', 'themes')

/**
 * Reads custom theme JSON files from ~/.huba/themes/.
 * Each valid .json file is validated against themeSchema and included in the result.
 * Invalid files are skipped with a console.warn.
 *
 * @returns Record mapping theme name (filename without .json) to Theme
 */
export const loadCustomThemes = (): Record<string, Theme> => {
    if (!existsSync(THEMES_DIR)) {
        return {}
    }

    const files = readdirSync(THEMES_DIR).filter((f) => f.endsWith('.json'))
    const result: Record<string, Theme> = {}

    for (const file of files) {
        const filePath = join(THEMES_DIR, file)
        const name = file.slice(0, -5)

        try {
            const content = readFileSync(filePath, 'utf-8')
            const parsed = JSON.parse(content) as unknown
            const validation = themeSchema.safeParse(parsed)

            if (!validation.success) {
                console.warn(`[themes] Skipping "${file}": invalid schema —`, validation.error.flatten())
                continue
            }

            result[name] = validation.data
        } catch (error) {
            console.warn(`[themes] Skipping "${file}": failed to read or parse —`, error)
        }
    }

    return result
}
