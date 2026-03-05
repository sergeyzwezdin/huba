import type { FC } from 'react'

import { useAtom } from 'jotai'

import { useFocus } from '@/shared/focus-manager'
import { type TaskDetailsLayout, taskDetailsLayoutAtom } from '@/shared/settings'
import { FormField } from '@/shared/ui/forms'
import { Selector } from '@/shared/ui/input'

const options = [
    { value: 'horizontal' as const, label: 'horizontal' },
    { value: 'vertical' as const, label: 'vertical' },
]

type LayoutFieldProps = {
    autoFocus?: boolean
}

const LayoutField: FC<LayoutFieldProps> = ({ autoFocus = false }) => {
    const { isFocused, ref } = useFocus({ id: 'settings-layout', autoFocus })

    const [layout, setLayout] = useAtom(taskDetailsLayoutAtom)

    return (
        <FormField title="Layout" hint="Task list layout" isFocused={isFocused}>
            <Selector
                options={options}
                value={layout}
                onChange={(value) => setLayout(value as TaskDetailsLayout)}
                isFocused={isFocused}
                focusRef={ref}
            />
        </FormField>
    )
}

export { LayoutField }
