---
name: opentui
description: Comprehensive OpenTUI skill for building terminal user interfaces. Covers the core imperative API and React reconciler. Use for any TUI development task including components, layout, keyboard handling, animations, and testing.
metadata:
   references: core, react
---

# OpenTUI Platform Skill

## How to Read This Skill

Each domain has a `REFERENCE.md` index that maps sub-files to topics. Start with the index, then load only what's needed.

| Domain | Entry Point | When to Use |
|--------|-------------|-------------|
| Core | `./references/core/REFERENCE.md` | Imperative API, low-level control |
| React | `./references/react/REFERENCE.md` | Declarative UI, hooks, JSX |
| Layout | `./references/layout/REFERENCE.md` | Flexbox layout, positioning |
| Components | `./references/components/REFERENCE.md` | Component-by-category reference |
| Keyboard | `./references/keyboard/REFERENCE.md` | Key events, shortcuts, clipboard |
| Animation | `./references/animation/REFERENCE.md` | Timeline animations |
| Testing | `./references/testing/REFERENCE.md` | Snapshot and interaction testing |

## Quick Decision Trees

### "I need to display content"

```
Display content?
├─ Plain or styled text              -> components/text-basic.md
├─ ASCII art banner/title            -> components/text-extras.md
├─ Container with borders/background -> components/containers-box.md
├─ Scrollable content area           -> components/containers-scrollbox.md
├─ Code with syntax highlighting     -> components/code-syntax.md
├─ Diff viewer (unified/split)       -> components/diff.md
└─ Markdown content (streaming)      -> components/code-syntax.md (markdown)
```

### "I need user input"

```
User input?
├─ Single-line text field          -> components/inputs-text.md
├─ Multi-line text editor          -> components/inputs-text.md (textarea)
├─ Select from a list (built-in)   -> components/inputs-select.md
├─ Custom-rendered list/select     -> components/inputs-select.md (BaseSelectRenderable)
├─ Tab-based selection             -> components/inputs-select.md (tab-select)
└─ Custom keyboard handling        -> keyboard/REFERENCE.md
```

### "I need layout/positioning"

```
Layout?
├─ Flexbox rows/columns     -> layout/REFERENCE.md + layout/flex.md
├─ Absolute positioning     -> layout/positioning.md
├─ Responsive to terminal   -> layout/patterns-app.md
├─ Centering content        -> layout/patterns-advanced.md
└─ Common app layouts       -> layout/patterns-app.md
```

### "I need animations"

```
Animations?
├─ Timeline with easing     -> animation/timeline.md + animation/easing.md
└─ Common patterns          -> animation/patterns.md
```

### "I need keyboard handling"

```
Keyboard?
├─ Key names and events     -> keyboard/keys.md
├─ Navigation patterns      -> keyboard/patterns.md
├─ Paste / clipboard        -> keyboard/clipboard.md
└─ Focus management         -> core/patterns-focus.md
```

### "I need theming or settings"

```
Theming/Settings?
├─ Define and implement a theme     -> react/patterns-theming.md
├─ Consume theme in a component     -> react/patterns-theming.md
├─ rgbToHex for imperative APIs     -> react/patterns-theming.md
├─ App-wide settings atoms          -> react/patterns-settings.md
└─ Keyboard shortcuts for settings  -> react/patterns-settings.md
```

### "I need notifications or feedback"

```
Notifications?
└─ Toast messages (info/success/error/warning) -> react/patterns-toast.md
```

### "I need to test my TUI"

```
Testing?
├─ Setup and basic tests    -> testing/setup.md
├─ React component tests    -> testing/react-testing.md
└─ Key simulation, focus    -> testing/interaction.md
```

### "I need to debug/troubleshoot"

```
Troubleshooting?
├─ Terminal cleanup, crashes    -> core/gotchas.md
├─ React-specific issues        -> react/gotchas.md
├─ Layout misalignment          -> layout/REFERENCE.md
├─ Input/focus issues           -> keyboard/REFERENCE.md
└─ Flaky tests                  -> testing/REFERENCE.md
```

## Resources

**Repository**: https://github.com/anomalyco/opentui
**Core Docs**: https://github.com/anomalyco/opentui/tree/main/packages/core/docs
**Examples**: https://github.com/anomalyco/opentui/tree/main/packages/core/src/examples
