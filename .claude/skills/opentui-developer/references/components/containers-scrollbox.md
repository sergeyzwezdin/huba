# ScrollBox Component

A scrollable container for content that exceeds the viewport.

## Contents

- [Basic Usage](#basic-usage)
- [Scrollbar Styling](#scrollbar-styling)
- [Scroll Position (Core)](#scroll-position-core)
- [Composition Patterns](#composition-patterns)
- [Nesting Containers](#nesting-containers)
- [Gotchas](#gotchas)

---

## Basic Usage

```tsx
// React — requires height
<scrollbox height={10}>
  {items.map((item, i) => (
    <text key={i}>{item}</text>
  ))}
</scrollbox>

// Core
const scrollbox = new ScrollBoxRenderable(renderer, { id: "list", height: 10 })
items.forEach(item => scrollbox.add(new TextRenderable(renderer, { content: item })))
```

Use arrow keys to scroll when `focused`:

```tsx
<scrollbox focused height={20}>
  {/* arrow keys scroll */}
</scrollbox>
```

---

## Scrollbar Styling

```tsx
<scrollbox
  style={{
    rootOptions:     { backgroundColor: "#24283b" },
    wrapperOptions:  { backgroundColor: "#1f2335" },
    viewportOptions: { backgroundColor: "#1a1b26" },
    contentOptions:  { backgroundColor: "#16161e" },
    scrollbarOptions: {
      showArrows: true,
      trackOptions: {
        foregroundColor: "#7aa2f7",
        backgroundColor: "#414868",
      },
    },
  }}
>
  {content}
</scrollbox>
```

---

## Scroll Position (Core)

```typescript
scrollbox.scrollTo(0)           // Scroll to top
scrollbox.scrollTo(100)         // Scroll to position
scrollbox.scrollBy(10)          // Scroll relative
scrollbox.scrollToBottom()      // Scroll to end
```

---

## Composition Patterns

### Card

```tsx
const Card: FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <box border borderStyle="rounded" padding={2} marginBottom={1}>
    {title && <text fg="#00FFFF"><strong>{title}</strong></text>}
    <box marginTop={title ? 1 : 0}>{children}</box>
  </box>
)
```

### Panel

```tsx
const Panel: FC<{ title?: string; children: React.ReactNode; width?: number }> = ({ title, children, width = 40 }) => (
  <box border borderStyle="double" width={width} backgroundColor="#1a1a2e">
    {title && (
      <box borderBottom padding={1} backgroundColor="#2a2a4e">
        <text><strong>{title}</strong></text>
      </box>
    )}
    <box padding={2}>{children}</box>
  </box>
)
```

### List Container

```tsx
const List: FC<{ items: unknown[]; renderItem: (item: unknown, i: number) => React.ReactNode }> = ({ items, renderItem }) => (
  <scrollbox height={15} focused>
    {items.map((item, i) => (
      <box key={i} padding={1} backgroundColor={i % 2 === 0 ? "#222" : "#333"}>
        {renderItem(item, i)}
      </box>
    ))}
  </scrollbox>
)
```

---

## Nesting Containers

```tsx
<box flexDirection="column" height="100%">
  <box height={3} border><text>Header</text></box>

  <box flexDirection="row" flexGrow={1}>
    <box width={20} border><text>Sidebar</text></box>
    <box flexGrow={1}>
      <scrollbox height="100%">
        {/* Scrollable main content */}
      </scrollbox>
    </box>
  </box>

  <box height={1}><text>Footer</text></box>
</box>
```

---

## Gotchas

```tsx
// WRONG - no height constraint
<scrollbox>{items}</scrollbox>

// CORRECT - always provide height
<scrollbox height={20}>{items}</scrollbox>
```

```tsx
// WRONG - parent has no size for percentage
<box><box width="50%">Won't work</box></box>

// CORRECT
<box width="100%"><box width="50%">Works</box></box>
```

```tsx
// WRONG - parent has no height for flexGrow
<box><box flexGrow={1}>Won't grow</box></box>

// CORRECT
<box height="100%"><box flexGrow={1}>Will grow</box></box>
```
