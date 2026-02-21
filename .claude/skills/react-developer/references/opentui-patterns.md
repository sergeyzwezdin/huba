# OpenTUI: TUI Patterns & Style Props

## Core Patterns

- `<box>` for layout (flexbox model, lowercase JSX element)
- `<text>` for all text rendering (lowercase JSX element)
- Handle keyboard input with `useKeyboard` hook
- Use `useRenderer` for renderer access (dimensions, exit via `renderer.exit()`)
- Focus management via keyboard-based approach
- Avoid expensive re-renders — terminal re-draws are visible
- Test TUI components with fixtures, not snapshots
- **When uncertain about OpenTUI API**: Use Context7 to query OpenTUI documentation

## Style Props — Always Use `style` Object

All layout/dimension/appearance props go into `style`, not as direct JSX props:

```tsx
// BAD: inline style props directly on element
<box flexDirection="row" paddingBottom={1} gap={1} flexGrow={1} />
<Panel borderStyle="rounded" height={10} paddingLeft={1} {...props} />

// GOOD: grouped into style prop
<box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1, flexGrow: 1 }} />
<Panel {...props} style={{ ...props.style, borderStyle: 'rounded', height: 10, paddingLeft: 1 }} />
```

When spreading `props` with default styles, place `{...props}` before `style` so callers can override:

```tsx
<Panel
    focusable
    title="My Panel"
    {...props}
    style={{ ...props.style, borderStyle: 'rounded', height: 10 }}>
```

**Exception:** Props that are NOT style props (`focusable`, `title`, `fg`, `bg` on `<text>`) remain as direct JSX props.
