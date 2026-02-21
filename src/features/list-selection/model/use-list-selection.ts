import { useKeyboard } from '@opentui/react'

import { useSelectedListId } from './selected-list.atom'

/**
 * Hook to handle list selection with Enter key
 * Accepts selected list ID and a callback to execute on selection
 *
 * @param listId - The list ID to set when Enter is pressed
 * @param onSelect - Optional callback to execute after selection
 */
export const useListSelection = (listId: string | null, onSelect?: () => void): void => {
    const [, setSelectedListId] = useSelectedListId()

    useKeyboard((key) => {
        if (key.name === 'enter' && listId) {
            setSelectedListId(listId)
            onSelect?.()
        }
    })
}
