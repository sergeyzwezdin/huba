# React: Performance & Error Handling

## Performance

**Profile before optimizing.** Measure actual bottlenecks first.

### Composition Over Memo

Split components to isolate frequently updating parts, pass stable children:

```typescript
// BAD: creates new object on every render
<TaskList config={{ showCompleted: true }} />

// GOOD: stable reference
const CONFIG = { showCompleted: true };
<TaskList config={CONFIG} />

// GOOD: composition isolates re-renders
const ExpensiveList = ({ children }) => {
  // expensive logic
  return <>{children}</>;
};
<ExpensiveList>
  <FrequentlyUpdatingComponent />
</ExpensiveList>
```

### When to Use `React.memo`

Only after profiling shows unnecessary re-renders:
- Expensive components that receive stable props
- List items in large lists
- Not needed for most components — composition is usually better

## Error Handling

- Error boundaries for component tree errors
- TanStack Query `error` state for async errors
- Validate user input before state updates
- Graceful degradation — show error UI, don't crash

```typescript
const { data, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
  retry: 3,
});

if (error) {
  return <ErrorMessage message="Failed to load tasks" />;
}
```

## Code Quality

- Prefer early returns over nested conditionals
- Extract magic numbers/strings to named constants
- Descriptive variable names (no single letters except loop indices)
