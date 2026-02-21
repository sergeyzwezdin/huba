# Select Input Components

## Contents

- [Select (list)](#select-list)
- [Tab Select (horizontal)](#tab-select-horizontal)
- [Focus Management](#focus-management)
- [Form Patterns](#form-patterns)

List selection and horizontal tab components for OpenTUI.

---

## Select (list)

### Basic Usage

```tsx
// React
<select
  options={[
    { name: "Option A", description: "First option", value: "a" },
    { name: "Option B", description: "Second option", value: "b" },
    { name: "Option C", description: "Third option", value: "c" },
  ]}
  onSelect={(index, option) => console.log("Selected:", option.value)}
  focused
  height={8}
/>

// Core
const select = new SelectRenderable(renderer, {
  id: "picker",
  options: [
    { name: "Option A", description: "...", value: "a" },
  ],
  onSelect: (index, option) => {},
  focused: true,
  height: 8,
})
```

### Options Format

Each option **must** have all three fields:

```typescript
type SelectOption = {
  name: string         // Displayed label
  description: string  // Subtitle / secondary text
  value: unknown       // Returned on selection
}
```

### Events

| Event | When it fires |
|-------|--------------|
| `onSelect` | Enter pressed — confirmed selection |
| `onChange` | Arrow key navigation — preview only |

```tsx
<select
  options={options}
  onSelect={(i, opt) => submitForm(opt)}    // Enter: confirmed
  onChange={(i, opt) => setPreview(opt)}    // Arrow: preview
  focused
/>
```

> **Common mistake**: Using `onChange` to submit. It fires on every arrow key press.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `SelectOption[]` | Items to display |
| `onSelect` | `(i, opt) => void` | Fires on Enter |
| `onChange` | `(i, opt) => void` | Fires on navigation |
| `focused` | `boolean` | Must be `true` to receive input |
| `height` | `number` | Visible row count |
| `selectedIndex` | `number` | Controlled selection |

### Keyboard

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate options |
| `Enter` | Confirm selection (`onSelect`) |
| `Page Up/Down` | Scroll by page |
| `Home` / `End` | Jump to first/last |

---

## Tab Select (horizontal)

### Basic Usage

```tsx
// React
<tab-select
  options={[
    { name: "Files",    description: "File browser" },
    { name: "Search",   description: "Search results" },
    { name: "Settings", description: "App settings" },
  ]}
  onSelect={(index, option) => setActiveTab(index)}
  tabWidth={20}
  focused
/>

// Core
const tabs = new TabSelectRenderable(renderer, {
  id: "tabs",
  options: [{ name: "Tab 1", description: "" }],
  onSelect: (index, option) => {},
  tabWidth: 20,
  focused: true,
})
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `{ name, description }[]` | Tab labels |
| `onSelect` | `(i, opt) => void` | Fires when tab activated |
| `tabWidth` | `number` | Fixed width per tab |
| `focused` | `boolean` | Required for keyboard input |
| `selectedIndex` | `number` | Controlled tab |

### Keyboard

| Key | Action |
|-----|--------|
| `←` / `→` | Navigate tabs |
| `Enter` | Select tab |

---

## Focus Management

Switch focus between multiple inputs with a shared state variable:

```tsx
type FocusedField = "username" | "password" | "submit"

const LoginForm: FC = () => {
  const [focused, setFocused] = useState<FocusedField>("username")

  useKeyboard((key) => {
    if (key.name === "tab") {
      setFocused(f =>
        f === "username" ? "password" :
        f === "password" ? "submit" : "username"
      )
    }
  })

  return (
    <box flexDirection="column" gap={1}>
      <input
        value={username}
        onChange={setUsername}
        focused={focused === "username"}
        placeholder="Username"
        width={24}
      />
      <input
        value={password}
        onChange={setPassword}
        focused={focused === "password"}
        placeholder="Password"
        password
        width={24}
      />
    </box>
  )
}
```

---

## Form Patterns

### Search with Results

```tsx
const Search: FC = () => {
  const [query, setQuery] = useState("")
  const [activePanel, setActivePanel] = useState<"input" | "results">("input")
  const results = useSearch(query)

  useKeyboard((key) => {
    if (key.name === "return" && activePanel === "input") {
      setActivePanel("results")
    }
    if (key.name === "escape") {
      setActivePanel("input")
    }
  })

  return (
    <box flexDirection="column">
      <input
        value={query}
        onChange={setQuery}
        placeholder="Search..."
        focused={activePanel === "input"}
        width={40}
      />
      {results.length > 0 && (
        <select
          options={results.map(r => ({ name: r.title, description: r.path, value: r }))}
          onSelect={(_, item) => openItem(item.value)}
          focused={activePanel === "results"}
          height={8}
        />
      )}
    </box>
  )
}
```
