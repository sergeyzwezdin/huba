# Input Components — Index

## Contents

| File | Components |
|------|-----------|
| [inputs-text.md](./inputs-text.md) | `input` (single-line), `textarea` (multi-line) |
| [inputs-select.md](./inputs-select.md) | `select` (list), `tab-select` (horizontal), focus management, form patterns |

## Quick Reference

```tsx
// Single-line text input
<input value={v} onChange={setV} placeholder="..." focused width={30} />

// Multi-line editor
<textarea value={v} onChange={setV} showLineNumbers focused width={40} height={10} />

// List selection — onSelect fires on Enter, onChange fires on arrow keys
<select options={[{ name, description, value }]} onSelect={fn} onChange={fn} focused height={8} />

// Horizontal tabs
<tab-select options={[{ name, description }]} onSelect={fn} tabWidth={20} focused />
```

**All inputs require `focused` to receive keyboard input.**
