# Layout — Flexbox

## Flex Container Properties

### flexDirection

```tsx
<box flexDirection="row">       {/* Children left→right (default) */}
<box flexDirection="column">    {/* Children top→bottom */}
<box flexDirection="row-reverse">    {/* Right→left */}
<box flexDirection="column-reverse"> {/* Bottom→top */}
```

### justifyContent (main axis alignment)

```tsx
<box flexDirection="row" width={40} justifyContent="flex-start">   {/* Left */}
<box flexDirection="row" width={40} justifyContent="flex-end">     {/* Right */}
<box flexDirection="row" width={40} justifyContent="center">       {/* Center */}
<box flexDirection="row" width={40} justifyContent="space-between">{/* First/last at edges, rest distributed */}
<box flexDirection="row" width={40} justifyContent="space-around"> {/* Equal space around each */}
<box flexDirection="row" width={40} justifyContent="space-evenly"> {/* Equal space between all */}
```

### alignItems (cross axis alignment)

```tsx
<box flexDirection="row" height={10} alignItems="flex-start"> {/* Top */}
<box flexDirection="row" height={10} alignItems="flex-end">   {/* Bottom */}
<box flexDirection="row" height={10} alignItems="center">     {/* Vertically centered */}
<box flexDirection="row" height={10} alignItems="stretch">    {/* Fill height */}
<box flexDirection="row" height={10} alignItems="baseline">   {/* Text baseline */}
```

### flexWrap

```tsx
<box flexDirection="row" flexWrap="nowrap" width={20}>  {/* Overflow (default) */}
<box flexDirection="row" flexWrap="wrap" width={20}>    {/* Wrap to next row */}
<box flexDirection="row" flexWrap="wrap-reverse" width={20}> {/* Wrap upward */}
```

### gap

```tsx
<box flexDirection="row" gap={2}>
  <text>A</text>  {/* A  B  C (2 spaces between) */}
  <text>B</text>
  <text>C</text>
</box>
```

## Flex Item Properties

### flexGrow — how much to grow

```tsx
<box flexDirection="row" width={30}>
  <box flexGrow={1}><text>1/4</text></box>   {/* 7.5 */}
  <box flexGrow={2}><text>2/4</text></box>   {/* 15 */}
  <box flexGrow={1}><text>1/4</text></box>   {/* 7.5 */}
</box>
```

### flexShrink — how much to shrink

```tsx
<box flexDirection="row" width={20}>
  <box width={15} flexShrink={1}><text>Shrinks</text></box>
  <box width={15} flexShrink={0}><text>Fixed</text></box>
</box>
```

### flexBasis — initial size before grow/shrink

```tsx
<box flexDirection="row">
  <box flexBasis={20} flexGrow={1}>Starts at 20, can grow</box>
  <box flexBasis="50%">Half of parent</box>
</box>
```

### alignSelf — override parent's alignItems

```tsx
<box flexDirection="row" height={10} alignItems="center">
  <text>Centered</text>
  <text alignSelf="flex-start">Top</text>
  <text alignSelf="flex-end">Bottom</text>
</box>
```
