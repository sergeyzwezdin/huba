# React Component Props

## text

```tsx
<text
  fg="#FFFFFF"              // Foreground color
  bg="#000000"              // Background color
  selectable={true}
>
  Normal text with <span fg="red">inline color</span>
  <strong>Bold</strong>, <em>italic</em>, <u>underlined</u>
  <br />
  New line, <a href="https://example.com">link</a>
</text>
```

> Do NOT use `bold`, `italic`, `underline` as props on `<text>`. Use nested tags instead.

## box

```tsx
<box
  border borderStyle="rounded"  // single | double | rounded | bold
  borderColor="#FFFFFF"
  title="Title" titleAlignment="center"
  backgroundColor="#1a1a2e"
  flexDirection="row" gap={2}
  padding={2} paddingX={2} paddingY={1}
  margin={1} marginX={2} marginY={1}
  width={40} height={10} flexGrow={1}
  focusable focused={isFocused}
  onMouseDown={(e) => {}} onMouseUp={(e) => {}} onMouseMove={(e) => {}}
>
  {children}
</box>
```

## scrollbox

```tsx
<scrollbox
  focused             // Enable keyboard scrolling
  height={20}         // Required — constrains scroll area
  style={{
    scrollbarOptions: {
      showArrows: true,
      trackOptions: { foregroundColor: "#7aa2f7", backgroundColor: "#414868" },
    },
  }}
>
  {items.map((item, i) => <text key={i}>{item}</text>)}
</scrollbox>
```

## input

```tsx
<input
  value={value}
  onChange={(newValue) => setValue(newValue)}
  placeholder="Enter text..."
  focused
  width={30}
  backgroundColor="#1a1a1a"
  textColor="#FFFFFF"
  cursorColor="#00FF00"
  focusedBackgroundColor="#2a2a2a"
/>
```

## textarea

```tsx
<textarea
  value={text}
  onChange={(newText) => setText(newText)}
  placeholder="Enter multiple lines..."
  focused
  width={40} height={10}
  showLineNumbers
  wrapText
  language="typescript"  // Syntax highlighting
/>
```

## select

```tsx
<select
  options={[
    { name: "Option 1", description: "First option", value: "1" },
    { name: "Option 2", description: "Second option", value: "2" },
  ]}
  onSelect={(index, option) => performAction(option)}  // Enter pressed
  onChange={(index, option) => showPreview(option)}    // Arrow keys
  selectedIndex={0}
  focused
  height={8}
  showScrollIndicator
/>
```

## tab-select

```tsx
<tab-select
  options={[
    { name: "Home", description: "Dashboard" },
    { name: "Settings", description: "Configuration" },
  ]}
  onSelect={(index, option) => setActiveTab(index)}   // Enter pressed
  onChange={(index, option) => showTabPreview(option)} // Arrow keys
  tabWidth={20}
  focused
/>
```

## ascii-font

```tsx
<ascii-font
  text="TITLE"
  font="tiny"   // tiny | block | slick | shade
  color="#FFFFFF"
/>
```

## code

```tsx
<code code={sourceCode} language="typescript" showLineNumbers />
```

## line-number

```tsx
<line-number
  code={sourceCode}
  language="typescript"
  startLine={1}
  highlightedLines={[5, 10]}
  addedLines={[5, 6]} removedLines={[10]}
  diagnostics={[
    { line: 3, severity: "error", message: "Syntax error" },
    { line: 7, severity: "warning", message: "Unused variable" },
  ]}
/>
```

## diff

```tsx
<diff
  oldCode={originalCode}
  newCode={modifiedCode}
  language="typescript"
  mode="unified"        // unified | split
  showLineNumbers
  context={3}
/>
```
