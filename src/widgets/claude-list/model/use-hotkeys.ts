import { useNavigate } from 'react-router'

import { useFocusManager } from '@/shared/focus-manager'
import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (enabled: boolean): void => {
    const navigate = useNavigate()
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (key.shift && key.name === 'l') {
            navigate('/claude-list')
            return
        }

        if (!enabled) return

        if (key.name === 'escape') {
            focus('task-table')
            return
        } else if (key.name === 'return') {
            navigate('/claude-list')
            return
        }
    })
}

export { useHotkeys }
