# React Patterns — Forms

## Controlled Inputs

```tsx
const LoginForm: FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [focusField, setFocusField] = useState<"username" | "password">("username")

  useKeyboard((key) => {
    if (key.name === "tab") setFocusField(f => f === "username" ? "password" : "username")
    if (key.name === "enter") handleLogin()
  })

  return (
    <box flexDirection="column" gap={1} border padding={2}>
      <box flexDirection="row" gap={1}>
        <text>Username:</text>
        <input value={username} onChange={setUsername} focused={focusField === "username"} width={20} />
      </box>
      <box flexDirection="row" gap={1}>
        <text>Password:</text>
        <input value={password} onChange={setPassword} focused={focusField === "password"} width={20} />
      </box>
    </box>
  )
}
```

## Form Validation

```tsx
const ValidatedForm: FC = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleChange = (value: string) => {
    setEmail(value)
    setError(!value.includes("@") ? "Invalid email address" : "")
  }

  return (
    <box flexDirection="column" gap={1}>
      <input value={email} onChange={handleChange} placeholder="Email" focused />
      {error && <text fg="red">{error}</text>}
    </box>
  )
}
```

## Search with Results

```tsx
const SearchableList: FC<{ items: string[] }> = ({ items }) => {
  const [query, setQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(true)

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  useKeyboard((key) => {
    if (key.name === "tab") setIsSearchFocused(f => !f)
  })

  return (
    <box flexDirection="column">
      <input value={query} onChange={setQuery} placeholder="Search..." focused={isSearchFocused} />
      <select
        options={filtered.map(item => ({ name: item }))}
        focused={!isSearchFocused}
        height={10}
        onSelect={(index, option) => handleSelect(option)}
        onChange={(index, option) => showPreview(option)}
      />
    </box>
  )
}
```

## Ref-based Focus

```tsx
const AutoFocusInput: FC = () => {
  const inputRef = useRef<{ focus: () => void } | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} placeholder="Auto-focused" />
}
```
