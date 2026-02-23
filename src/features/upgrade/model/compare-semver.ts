/**
 * Compares two semver strings. Returns positive if a > b, negative if a < b, 0 if equal.
 * Strips leading "v" prefix if present.
 */
const compareSemver = (a: string, b: string): number => {
    const parse = (v: string): number[] => v.replace(/^v/, '').split('.').map(Number)
    const [aMaj = 0, aMin = 0, aPatch = 0] = parse(a)
    const [bMaj = 0, bMin = 0, bPatch = 0] = parse(b)
    if (aMaj !== bMaj) return aMaj - bMaj
    if (aMin !== bMin) return aMin - bMin
    return aPatch - bPatch
}

export { compareSemver }
