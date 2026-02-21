# Layout Patterns — Index

## Contents

| File | Topic |
|------|-------|
| [patterns-app.md](./patterns-app.md) | Full-screen, header/footer, sidebar, grid, navigation tabs |
| [patterns-advanced.md](./patterns-advanced.md) | Modal/dialog, sticky footer, tooltips, equal columns, spacing utilities |

## Most Common Layouts

```tsx
// Header + Content + Footer
<box flexDirection="column" width="100%" height="100%">
  <box height={3} borderBottom><text>Header</text></box>
  <box flexGrow={1}><text>Content</text></box>
  <box height={1}><text>Status: Ready</text></box>
</box>

// Sidebar + Main
<box flexDirection="row" width="100%" height="100%">
  <box width={25} borderRight><text>Sidebar</text></box>
  <box flexGrow={1}><text>Main</text></box>
</box>

// Centered dialog
<box width="100%" height="100%" justifyContent="center" alignItems="center">
  <box width={50} height={15} border padding={2}><text>Dialog</text></box>
</box>
```
