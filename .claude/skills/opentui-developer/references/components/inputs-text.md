# Text Input Components

## Contents

- [Input (single-line)](#input-single-line)
- [Textarea (multi-line)](#textarea-multi-line)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Gotchas](#gotchas)

Single-line and multi-line text entry for OpenTUI.

---

## Input (single-line)

### Basic Usage

```tsx
// React
<input
  value={text}
  onChange={setText}
  placeholder="Type here..."
  focused
  width={30}
/>

// Core
const input = new InputRenderable(renderer, {
  id: "name",
  value: "",
  placeholder: "Type here...",
  focused: true,
  width: 30,
  onChange: (value) => console.log(value),
})
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current text |
| `onChange` | `(v: string) => void` | Fires on every keystroke |
| `onSubmit` | `(v: string) => void` | Fires on Enter |
| `placeholder` | `string` | Hint text when empty |
| `focused` | `boolean` | Must be `true` to receive input |
| `width` | `number` | Field width |
| `password` | `boolean` | Mask input with `*` |
| `disabled` | `boolean` | Prevents input |
| `maxLength` | `number` | Character limit |

### Cursor Styles

```tsx
<input
  value={text}
  onChange={setText}
  focused
  cursorColor="#00FF00"
  cursorBlink={true}
/>
```

### Password Input

```tsx
<input
  value={password}
  onChange={setPassword}
  placeholder="Password..."
  password            // Displays *** instead of text
  focused
  width={20}
/>
```

---

## Textarea (multi-line)

### Basic Usage

```tsx
// React
<textarea
  value={text}
  onChange={setText}
  focused
  width={40}
  height={10}
/>

// Core
const textarea = new TextareaRenderable(renderer, {
  id: "editor",
  value: "",
  focused: true,
  width: 40,
  height: 10,
  onChange: (value) => console.log(value),
})
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current text (may contain newlines) |
| `onChange` | `(v: string) => void` | Fires on every change |
| `focused` | `boolean` | Must be `true` to receive input |
| `width` | `number` | Editor width |
| `height` | `number` | Visible lines |
| `showLineNumbers` | `boolean` | Show line numbers gutter |
| `language` | `string` | Enable syntax highlighting |
| `placeholder` | `string` | Hint text when empty |
| `readOnly` | `boolean` | View-only mode |

### With Syntax Highlighting

```tsx
<textarea
  value={code}
  onChange={setCode}
  language="typescript"
  showLineNumbers
  focused
  width={60}
  height={20}
/>
```

### Scrolling

Textarea scrolls automatically when content exceeds `height`. Use `focused` for keyboard scrolling.

---

## Keyboard Shortcuts

### Input

| Key | Action |
|-----|--------|
| Any character | Insert at cursor |
| `←` / `→` | Move cursor |
| `Home` / `End` | Jump to line start/end |
| `Backspace` | Delete left |
| `Delete` | Delete right |
| `Enter` | Trigger `onSubmit` |

### Textarea

| Key | Action |
|-----|--------|
| `↑` / `↓` | Move line |
| `←` / `→` | Move character |
| `Enter` | New line |
| `Tab` | Insert tab / indent |
| `Ctrl+A` | Select all |

---

## Gotchas

```tsx
// WRONG - No keyboard input without focused
<input value={v} onChange={setV} />

// CORRECT
<input value={v} onChange={setV} focused />
```

```tsx
// Textarea needs both width AND height
<textarea value={v} onChange={setV} width={40} height={10} focused />
```
