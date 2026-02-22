import type { FC } from 'react'

import { useFocus } from '@/shared/focus-manager'
import { useTheme } from '@/shared/settings'
import { themes } from '@/shared/theme'
import { FormField } from '@/shared/ui/forms'
import { List } from '@/shared/ui/input'

type ThemeFieldProps = {
    autoFocus?: boolean
}

const ThemeField: FC<ThemeFieldProps> = ({ autoFocus = false }) => {
    const { themeName, setTheme } = useTheme()
    const { isFocused, ref } = useFocus({ id: 'settings-theme', autoFocus })

    const options = Object.keys(themes).map((name) => ({
        value: name,
        label: name,
    }))

    return (
        <FormField title="Theme" isFocused={isFocused}>
            <List options={options} value={themeName} onChange={setTheme} isFocused={isFocused} focusRef={ref} />
        </FormField>
    )
}

export { ThemeField }
