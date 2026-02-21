# Animation — Easing Functions

Pass the easing name as the `ease` property in `timeline.add()`.

## Linear

| Name | Behavior |
|------|----------|
| `linear` | Constant speed |

## Quad (Power of 2)

| Name | Behavior |
|------|----------|
| `easeInQuad` | Slow start, fast end |
| `easeOutQuad` | Fast start, slow end *(most natural for UI)* |
| `easeInOutQuad` | Slow start and end |

## Cubic (Power of 3)

| Name | Behavior |
|------|----------|
| `easeInCubic` | Slower start |
| `easeOutCubic` | Slower end |
| `easeInOutCubic` | Slower start and end |

## Quart (Power of 4)

| Name | Behavior |
|------|----------|
| `easeInQuart` | Very slow start |
| `easeOutQuart` | Very slow end |
| `easeInOutQuart` | Very slow start and end |

## Expo (Exponential)

| Name | Behavior |
|------|----------|
| `easeInExpo` | Exponential acceleration |
| `easeOutExpo` | Exponential deceleration |
| `easeInOutExpo` | Both |

## Back (Overshoot)

| Name | Behavior |
|------|----------|
| `easeInBack` | Pull back before moving |
| `easeOutBack` | Overshoot, then settle |
| `easeInOutBack` | Both |

## Elastic

| Name | Behavior |
|------|----------|
| `easeInElastic` | Elastic windup at start |
| `easeOutElastic` | Elastic bounce at end |
| `easeInOutElastic` | Both |

## Bounce

| Name | Behavior |
|------|----------|
| `easeInBounce` | Bounce at start |
| `easeOutBounce` | Bounce at end |
| `easeInOutBounce` | Both |

## Choosing an Easing

- **UI transitions** → `easeOutQuad` or `easeOutCubic`
- **Progress indicators** → `linear`
- **Entrance animations** → `easeOutBack` (subtle overshoot)
- **Emphasis/attention** → `easeOutElastic` or `easeOutBounce`
