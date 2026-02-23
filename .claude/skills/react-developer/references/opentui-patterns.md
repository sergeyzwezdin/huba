# OpenTUI: TUI Patterns & Style Props

## Core Patterns

- `<box>` for layout (flexbox model, lowercase JSX element)
- `<text>` for all text rendering (lowercase JSX element)
- Keyboard: use `useKeyboard` from `@/shared/keyboard` (not raw OpenTUI — wraps it to respect global enable/disable)
- Focus: `useFocus` + `useFocusManager` from `@/shared/focus-manager`
- Terminal dimensions: `useTerminalDimensions` from `opentui/react`
- Avoid expensive re-renders — terminal re-draws are visible
- **When uncertain about OpenTUI API**: Use Context7 to query OpenTUI documentation

## Style Props — Always Use `style` Object

All layout/dimension/appearance props go into `style`, not as direct JSX props:

```tsx
// BAD
<box flexDirection="row" paddingBottom={1} gap={1} flexGrow={1} />
<Panel borderStyle="rounded" height={10} paddingLeft={1} {...props} />

// GOOD
<box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1, flexGrow: 1 }} />
<Panel {...props} style={{ ...props.style, borderStyle: 'rounded', height: 10, paddingLeft: 1 }} />
```

Place `{...props}` before `style` so callers can override defaults.

**Exception:** Props that are NOT style props (`focusable`, `focused`, `title`, `fg`, `bg` on `<text>`, `onMouseUp`) remain as direct JSX props.

## Keyboard Handling

Always import from `@/shared/keyboard` — it respects global enable/disable state:

```typescript
import { useKeyboard } from '@/shared/keyboard'

const useHotkeys = (enabled: boolean, selectRef: RefObject<SelectRenderable | null>): void => {
    const { focus } = useFocusManager()
    const setFilter = useSetAtom(filterAtom)

    useKeyboard((key) => {
        // Global hotkeys: always run regardless of focus
        if (key.name === '1') focus('task-table')

        // Widget-specific: guard by focus state
        if (!enabled) return

        if (key.name === 'escape') setSomeAtom(false)
        else if (key.shift && key.name === 'f') setFilter((prev) => nextFilter(prev))
        else selectRef.current?.handleKeyPress(key) // delegate navigation to renderable
    })
}
```

**Pattern:** Each widget has `model/use-hotkeys.ts`; page-level in `pages/*/model/use-hotkeys.ts`.
Page calls `useHotkeys()` (no args); widget calls `useHotkeys(isFocused, selectRef)`.

## Focus Management

```typescript
import { useFocus, useFocusManager } from '@/shared/focus-manager'

const MyWidget: FC = () => {
    const { isFocused, ref } = useFocus({ id: 'my-widget', autoFocus: true })
    const { focus } = useFocusManager()
    const selectRef = useRef<SelectRenderable>(null)

    useHotkeys(isFocused, selectRef)

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[1]', 'Widget Title']}
            onMouseUp={() => focus('my-widget')}>
            {/* children */}
        </Panel>
    )
}
```

## Panel Component

`Panel` wraps a `<box>` with border, title, and focus styling. Import from `@/shared/ui/panel`.

```tsx
<Panel
    focusable                              // marks as focusable element
    focused={isFocused}                    // shows focus border style when true
    ref={ref}                              // BoxRenderable ref for focus manager
    title={['[1]', 'Task List']}           // title segments rendered in border
    onMouseUp={() => focus('task-table')}  // click-to-focus
    style={{ flexGrow: 1 }}>
    {/* children */}
</Panel>
```

## Terminal Dimensions & Min Size

```typescript
import { useTerminalDimensions } from 'opentui/react'
import { RequiredWindowSize } from '@/shared/ui/required-window-size'

const MyPage: FC = () => {
    const { width: columns, height: rows } = useTerminalDimensions()

    return (
        <RequiredWindowSize minWidth={80} minHeight={24}>
            {/* Responsive layout using columns/rows */}
        </RequiredWindowSize>
    )
}
```

## Theme Usage

```typescript
import { useTheme } from '@/shared/settings'
import { rgbToHex } from '@/shared/theme'

const MyComponent: FC = () => {
    const { theme } = useTheme()

    return (
        <text fg={rgbToHex(theme.colors.primary)} bg={rgbToHex(theme.surface.selection)}>
            Themed text
        </text>
    )
}
```

**Theme token categories:**
- `theme.colors.*` — primary, secondary, tertiary text colors
- `theme.border.*` — default, focused border colors
- `theme.status.*` — per-status (pending, inProgress, completed, blocked) icon/title/id colors
- `theme.surface.*` — selection, scrollbarTrack, scrollbarThumb backgrounds
- `theme.progress.*` — blocked, pending, inProgress, completed progress bar colors
- `theme.markdown.*` — heading, list, code, default markdown render colors

## Toast Notifications

```typescript
import { toast } from '@opentui-ui/toast'

// In hotkey handlers or event handlers
toast.info('List switched', { description: listId })
toast.success('Task completed')
toast.error('Failed to load', { duration: 6000 })
toast.warning('No tasks found')
```

`<Toaster>` is registered once in `src/app/toaster.tsx` — do not add it again.

## BaseSelectRenderable

For custom list/select UIs, extend `BaseSelectRenderable` from `@/shared/ui/select`.
Item type must extend `BaseSelectOption` (`{ id: string }`):

```typescript
import { BaseSelectRenderable, type BaseSelectOption } from '@/shared/ui/select'

type MyItem = BaseSelectOption & { title: string; status: string }

class MySelectRenderable extends BaseSelectRenderable<MyItem> {
    protected onThemeChanged(theme: Theme): void { /* cache color refs */ }
    protected prepareLayout(items: MyItem[], width: number): number[] { /* return per-row heights */ }
    protected renderItem(
        fb: OptimizedBuffer,
        item: MyItem,
        index: number,
        y: number,
        width: number,
    ): void { /* draw into frame buffer */ }
}

// React wrapper using forwardRef
const MySelect = forwardRef<MySelectRenderable, MySelectProps>((props, ref) => {
    const { theme } = useTheme()
    return <my-select {...props} theme={theme} ref={ref} />
})
MySelect.displayName = 'MySelect'
```
