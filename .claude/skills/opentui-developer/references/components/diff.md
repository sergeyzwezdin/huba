# Diff Component

Unified or split diff viewer with syntax highlighting.

## Contents

- [Basic Usage](#basic-usage)
- [Display Modes](#display-modes)
- [Props](#props)
- [Styling](#styling)
- [Use Case: Code Review](#use-case-code-review)

---

## Basic Usage

```tsx
// React
<diff
  oldCode={originalCode}
  newCode={modifiedCode}
  language="typescript"
/>

// Core
const diffView = new DiffRenderable(renderer, {
  id: "diff",
  oldCode: originalCode,
  newCode: modifiedCode,
  language: "typescript",
})
```

---

## Display Modes

```tsx
// Unified diff (default) — single column, +/- markers
<diff oldCode={old} newCode={newCode} mode="unified" />

// Split/side-by-side — two columns
<diff oldCode={old} newCode={newCode} mode="split" />
```

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `oldCode` | `string` | Original (left/before) content |
| `newCode` | `string` | Modified (right/after) content |
| `language` | `string` | Syntax highlighting language |
| `mode` | `"unified" \| "split"` | Display mode (default: `"unified"`) |
| `showLineNumbers` | `boolean` | Show line numbers |
| `context` | `number` | Lines of context around changes (default: 3) |

---

## Styling

```tsx
<diff
  oldCode={old}
  newCode={newCode}
  addedLineColor="#2d4f2d"         // Background for added lines
  removedLineColor="#4f2d2d"       // Background for removed lines
  unchangedLineColor="transparent"
/>
```

---

## Use Case: Code Review

```tsx
const CodeReview: FC<{ oldCode: string; newCode: string }> = ({ oldCode, newCode }) => {
  return (
    <box flexDirection="column" height="100%">
      <box height={1} backgroundColor="#333">
        <text>Changes in src/utils.ts</text>
      </box>
      <diff
        oldCode={oldCode}
        newCode={newCode}
        language="typescript"
        mode="split"
        showLineNumbers
      />
    </box>
  )
}
```
