# Code & Diff Components — Index

## Contents

| File | Components |
|------|-----------|
| [code-syntax.md](./code-syntax.md) | `code`, `line-number`, `markdown` — syntax highlighting, diagnostics, streaming |
| [diff.md](./diff.md) | `diff` — unified/split diff viewer |

## Quick Reference

```tsx
// Syntax-highlighted block
<code code={src} language="typescript" showLineNumbers />

// With line marks + diagnostics
<line-number code={src} language="typescript"
  highlightedLines={[5]} diagnostics={[{ line: 3, severity: "error", message: "Err" }]} />

// Unified diff
<diff oldCode={old} newCode={new} language="typescript" mode="unified" showLineNumbers />

// Markdown with code highlighting
<markdown content={markdownText} syntaxStyle={style} streaming={true} />
```

## Use Cases

| Scenario | Components |
|----------|-----------|
| View source file | `<line-number>` in `<scrollbox>` |
| Show compile errors | `<line-number diagnostics={...}>` |
| Code review | `<diff mode="split">` |
| LLM output | `<markdown streaming={true}>` |
| Code editor | `<textarea language="typescript" showLineNumbers>` |
