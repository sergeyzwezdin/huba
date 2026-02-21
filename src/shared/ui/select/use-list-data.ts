import { useMemo } from 'react'

import type { BaseSelectOption } from './types'

type ListData<T extends BaseSelectOption> = {
    optionsById: Record<string, T>
    indexById: Record<string, number>
}

export const useListData = <T extends BaseSelectOption>(options: T[] | undefined): ListData<T> => {
    const optionsById = useMemo(
        () => Object.fromEntries((options ?? []).map((opt) => [opt.id, opt])) as Record<string, T>,
        [options],
    )

    const indexById = useMemo(
        () => Object.fromEntries((options ?? []).map((opt, i) => [opt.id, i])) as Record<string, number>,
        [options],
    )

    return { optionsById, indexById }
}
