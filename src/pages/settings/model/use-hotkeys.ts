import { useNavigate } from 'react-router'

import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (): void => {
    const navigate = useNavigate()

    useKeyboard((key) => {
        if (key.name === 'escape') {
            navigate(-1)
        }
    })
}

export { useHotkeys }
