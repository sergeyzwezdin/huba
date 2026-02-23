# React Patterns — Toast Notifications

## Importing and Sending Toasts

```ts
import { toast } from '@opentui-ui/toast'

// Four types:
toast.info('Message')
toast.success('Task completed')
toast.error('Something went wrong')
toast.warning('Proceed with caution')

// With description:
toast.info('Switched to the latest list', {
    description: listId,
})

// With custom duration (ms):
toast.error('Failed to load', { duration: 6000 })
```

## Toaster Setup (app level)

The `<Toaster>` component is registered once in `src/app/toaster.tsx`. It uses theme colors
via `rgbToHex`. Do not add another Toaster — it's already mounted in the app providers.

```tsx
// src/app/toaster.tsx
import { Toaster as ToasterBase } from '@opentui-ui/toast/react'
import { rgbToHex } from '@opentui/core'
import { useTheme } from '@/shared/settings'

export const Toaster: FC = () => {
    const { theme } = useTheme()

    return (
        <ToasterBase
            stackingMode="single"
            toastOptions={{
                duration: 3000,
                style: {
                    backgroundColor: rgbToHex(theme.surface.selection),
                    foregroundColor: rgbToHex(theme.colors.primary),
                    borderColor: rgbToHex(theme.border.default),
                    borderStyle: 'rounded',
                    paddingX: 1,
                    paddingY: 0,
                },
                success: { style: { borderColor: rgbToHex(theme.progress.completed) } },
                error: {
                    style: { borderColor: rgbToHex(theme.progress.blocked) },
                    duration: 6000,
                },
                warning: { style: { borderColor: rgbToHex(theme.progress.in_progress) } },
            }}
        />
    )
}
```

## Usage Example

```ts
// In any hook or component — no provider or ref needed
import { toast } from '@opentui-ui/toast'

const useHotkeys = () => {
    useKeyboard((key) => {
        if (key.name === 'r') {
            refreshData()
            toast.success('Refreshed')
        }
    })
}
```
