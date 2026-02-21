# Animation — Timeline

## Timeline Options

```typescript
const timeline = useTimeline({
  duration: 2000,         // Total duration in ms
  loop: false,            // Loop the timeline
  autoplay: true,         // Start automatically (default: true)
  onComplete: () => {},   // Called when timeline completes
  onPause: () => {},      // Called when timeline pauses
})

// Core
const timeline = new Timeline({ duration: 2000, loop: false, autoplay: true })
engine.addTimeline(timeline)
```

## Timeline Methods

```typescript
timeline.play()           // Start or resume
timeline.pause()          // Pause
timeline.restart()        // Restart from beginning
timeline.progress         // Current progress (0–1)
timeline.duration         // Total duration in ms
```

## Animation Properties

```typescript
timeline.add(
  { value: 0 },           // Target object with initial value(s)
  {
    value: 100,           // Final value
    duration: 1000,       // Animation duration in ms
    ease: "linear",       // Easing function (see easing.md)
    delay: 0,             // Delay before starting (ms)
    onUpdate: (anim) => {
      const current = anim.targets[0].value  // Access current value each frame
      setState(Math.round(current))          // Always round for character positioning
    },
    onComplete: () => {   // Called when this animation finishes
      console.log("Done!")
    },
  },
  0                       // Start time in the timeline (optional, default: 0)
)
```

## Multiple Properties

Animate multiple properties in one call:

```typescript
timeline.add(
  { x: 0, opacity: 0 },
  {
    x: 50,
    opacity: 1,
    duration: 1000,
    ease: "easeOutQuad",
    onUpdate: (anim) => {
      box.setLeft(Math.round(anim.targets[0].x))
      // opacity handled separately if needed
    },
  }
)
```
