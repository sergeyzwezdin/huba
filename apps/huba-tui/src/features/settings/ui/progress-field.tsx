import type { FC } from 'react'

import { useAtom } from 'jotai'

import { useFocus } from '@/shared/focus-manager'
import { showProgressAtom } from '@/shared/settings'
import { FormField } from '@/shared/ui/forms'
import { Selector } from '@/shared/ui/input'

const options = [
    { value: 'yes' as const, label: 'yes' },
    { value: 'no' as const, label: 'no' },
]

type ProgressFieldProps = {
    autoFocus?: boolean
}

const ProgressField: FC<ProgressFieldProps> = ({ autoFocus = false }) => {
    const { isFocused, ref } = useFocus({ id: 'settings-progress', autoFocus })

    const [showProgress, setShowProgress] = useAtom(showProgressAtom)

    return (
        <FormField title="Progress" hint="Whether to show progress in the task list" isFocused={isFocused}>
            <Selector
                options={options}
                value={showProgress ? 'yes' : 'no'}
                onChange={(value) => setShowProgress(value === 'yes')}
                isFocused={isFocused}
                focusRef={ref}
            />
        </FormField>
    )
}

export { ProgressField }
