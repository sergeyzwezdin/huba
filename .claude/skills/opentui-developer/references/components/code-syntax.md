# Code & Syntax Components

## Contents

- [Code Component](#code-component) — syntax-highlighted code blocks
- [Line Number Component](#line-number-component) — line numbers, diagnostics, diff marks
- [Markdown Component](#markdown-component) — markdown with code highlighting
- [Gotchas](#gotchas)

---

## Code Component

Display syntax-highlighted code blocks.

### Basic Usage

```tsx
// React
<code
  code={`function hello() {
  console.log("Hello, World!");
}`}
  language="typescript"
/>

// Core
const codeBlock = new CodeRenderable(renderer, {
  id: "code",
  code: sourceCode,
  language: "typescript",
})
```

### Supported Languages

OpenTUI uses Tree-sitter for syntax highlighting:
`typescript`, `javascript`, `python`, `rust`, `go`, `json`, `html`, `css`, `markdown`, `bash`

### Styling

```tsx
<code
  code={sourceCode}
  language="typescript"
  backgroundColor="#1a1a2e"
  showLineNumbers
/>
```

### onHighlight Callback

Intercept and modify syntax highlights before rendering:

```tsx
<code
  code={sourceCode}
  language="typescript"
  onHighlight={(highlights, context) => {
    // context: { content, filetype, syntaxStyle }
    // highlights: SimpleHighlight[] — [start, end, scope, metadata]
    return highlights.filter(h => h[2] !== "comment")
  }}
/>
```

Supports async callbacks. Return `undefined` to use original highlights.

---

## Line Number Component

Code display with line numbers, per-line highlighting, and diagnostic markers.

### Basic Usage

```tsx
// React
<line-number
  code={sourceCode}
  language="typescript"
/>

// Core
const codeView = new LineNumberRenderable(renderer, {
  id: "code-view",
  code: sourceCode,
  language: "typescript",
})
```

### Props

```tsx
<line-number
  code={sourceCode}
  language="typescript"
  startLine={1}                    // Starting line number offset
  showLineNumbers={true}           // Show gutter
  highlightedLines={[5, 10, 15]}   // Highlighted lines
  addedLines={[5, 6, 7]}           // Green background (diff added)
  removedLines={[10, 11]}          // Red background (diff removed)
  diagnostics={[
    { line: 3, severity: "error",   message: "Unexpected token" },
    { line: 7, severity: "warning", message: "Unused variable" },
    { line: 12, severity: "info",   message: "Consider using const" },
  ]}
/>
```

**Diagnostic severity:** `error` (red) | `warning` (yellow) | `info` (blue) | `hint` (gray)

---

## Markdown Component

Render markdown with syntax-highlighted code blocks.

### Basic Usage

```tsx
// React
<markdown
  content={markdownText}
  syntaxStyle={mySyntaxStyle}
/>

// Core
const md = new MarkdownRenderable(renderer, {
  id: "markdown",
  content: "# Hello\n\nThis is **markdown**.",
  syntaxStyle: mySyntaxStyle,
})
```

### Options

```tsx
<markdown
  content={markdownText}
  syntaxStyle={syntaxStyle}
  conceal={true}            // Hide markdown syntax characters
  streaming={true}          // Optimize for incremental LLM output
/>
```

### Streaming Mode

For real-time LLM output:

```tsx
const [content, setContent] = useState("")

useEffect(() => {
  llmStream.on("token", (token: string) => {
    setContent(c => c + token)
  })
}, [])

<markdown content={content} syntaxStyle={syntaxStyle} streaming={true} />
```

### Custom Node Rendering (Core)

```typescript
const md = new MarkdownRenderable(renderer, {
  id: "markdown",
  content: "# Custom",
  syntaxStyle,
  renderNode: (node, ctx, defaultRender) => {
    if (node.type === "heading") {
      return new TextRenderable(ctx, { content: `>> ${node.content} <<` })
    }
    return null // use default
  },
})
```

---

## Gotchas

```tsx
// No highlighting without language
<code code={text} />

// With highlighting
<code code={text} language="typescript" />
```

**Large files** — wrap in scrollbox:

```tsx
<scrollbox height={30}>
  <line-number code={largeFile} language="typescript" />
</scrollbox>
```

**Tree-sitter not loading** — check language is supported; verify grammars are installed; check `OTUI_TREE_SITTER_WORKER_PATH`.
