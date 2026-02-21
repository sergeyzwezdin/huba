import {
    type KeyEvent,
    type MouseEvent,
    type OptimizedBuffer,
    parseColor,
    type RenderContext,
    type SelectOption,
    SelectRenderable,
    SelectRenderableEvents,
    type SelectRenderableOptions,
    TextAttributes,
} from '@opentui/core'
import { extend } from '@opentui/react'

import type { Theme } from '@/shared/theme'
import { claude } from '@/shared/theme'

import type { TaskSelectOption, TaskStatus } from './types'

type ExperimentalSelectRenderableOptions = Omit<SelectRenderableOptions, 'options'> & {
    options?: TaskSelectOption[]
    showDate?: boolean
    showId?: boolean
    showSelection?: boolean
    maxLines?: number
    theme?: Theme
    selectedId?: string
    optionsById?: Record<string, TaskSelectOption>
    indexById?: Record<string, number>
    maxIdLen?: number
    onSelect?: (id: string) => void
}

const TRANSPARENT = parseColor('transparent')

const DATE_PADDING_RIGHT = 1

const STATUS_ICON: Record<TaskStatus, string> = {
    pending: '◻',
    blocked: '◻',
    in_progress: '◼',
    completed: '✔',
}

const STATUS_TITLE_ATTR: Record<TaskStatus, number> = {
    pending: 0,
    blocked: TextAttributes.DIM,
    in_progress: TextAttributes.BOLD,
    completed: TextAttributes.STRIKETHROUGH,
}

export class TaskSelectRenderable extends SelectRenderable {
    private static normalizeOption = (opt: TaskSelectOption): SelectOption => ({
        name: '',
        description: '',
        value: opt,
    })

    private static buildColors(t: Theme) {
        return {
            selection: parseColor(t.surface.selection),
            scrollbarThumb: parseColor(t.surface.scrollbarThumb),
            date: parseColor(t.colors.date),
            id: {
                pending: parseColor(t.status.pending.id),
                blocked: parseColor(t.status.blocked.id),
                in_progress: parseColor(t.status.inProgress.id),
                completed: parseColor(t.status.completed.id),
            } as Record<TaskStatus, ReturnType<typeof parseColor>>,
            icon: {
                pending: parseColor(t.status.pending.icon),
                blocked: parseColor(t.status.blocked.icon),
                in_progress: parseColor(t.status.inProgress.icon),
                completed: parseColor(t.status.completed.icon),
            } as Record<TaskStatus, ReturnType<typeof parseColor>>,
            title: {
                pending: parseColor(t.status.pending.title),
                blocked: parseColor(t.status.blocked.title),
                in_progress: parseColor(t.status.inProgress.title),
                completed: parseColor(t.status.completed.title),
            } as Record<TaskStatus, ReturnType<typeof parseColor>>,
        }
    }

    private _showDate: boolean
    private _showId: boolean
    private _showSelection: boolean
    private _scrollIndicator: boolean
    private _maxLines: number
    private _theme: Theme
    private _dateTimer: ReturnType<typeof setInterval> | null = null
    private _onSelect: ((id: string) => void) | undefined
    private _selectedId: string | undefined = undefined
    private _controlledIndex = 0
    private _optionsById: Record<string, TaskSelectOption> = {}
    private _indexById: Record<string, number> = {}
    private _maxIdLen = 0
    private _colors!: ReturnType<typeof TaskSelectRenderable.buildColors>
    private _lastScrollOffset = 0
    private _lastCumLines: number[] = []
    private _lastVisibleCount = 0

    constructor(ctx: RenderContext, options: ExperimentalSelectRenderableOptions) {
        super(ctx, {
            ...options,
            options: options.options?.map(TaskSelectRenderable.normalizeOption),
            showDescription: false,
            showScrollIndicator: false,
        })
        this.focusable = false
        this._showDate = options.showDate ?? false
        this._showId = options.showId ?? true
        this._showSelection = options.showSelection ?? true
        this._scrollIndicator = options.showScrollIndicator ?? false
        this._maxLines = Math.max(1, options.maxLines ?? 2)
        this._theme = options.theme ?? claude
        this._colors = TaskSelectRenderable.buildColors(this._theme)
        this._dateTimer = setInterval(() => this.requestRender(), 60_000)
        this._onSelect = options.onSelect
        this._selectedId = options.selectedId
        this._optionsById = options.optionsById ?? {}
        this._indexById = options.indexById ?? {}
        this._maxIdLen = options.maxIdLen ?? 0
        this.on(SelectRenderableEvents.SELECTION_CHANGED, (_index: number, option: SelectOption) => {
            const task = option?.value as TaskSelectOption | undefined
            if (task) {
                this._onSelect?.(task.id)
                this._syncIndexToId()
            }
        })
    }

    override destroy(): void {
        if (this._dateTimer !== null) {
            clearInterval(this._dateTimer)
            this._dateTimer = null
        }
        super.destroy()
    }

    get optionsById(): Record<string, TaskSelectOption> {
        return this._optionsById
    }

    set optionsById(value: Record<string, TaskSelectOption>) {
        this._optionsById = value
    }

    get indexById(): Record<string, number> {
        return this._indexById
    }

    set indexById(value: Record<string, number>) {
        this._indexById = value
        this._syncIndexToId()
    }

    get maxIdLen(): number {
        return this._maxIdLen
    }

    set maxIdLen(value: number) {
        this._maxIdLen = value
        this.requestRender()
    }

    get selectedId(): string | undefined {
        return this._selectedId
    }

    set selectedId(id: string | undefined) {
        if (this._selectedId === id) return
        this._selectedId = id
        this._syncIndexToId()
        this.requestRender()
    }

    private _syncIndexToId(): void {
        const idx =
            this._selectedId !== undefined && this._selectedId !== '' ? (this._indexById[this._selectedId] ?? -1) : -1
        const target = idx >= 0 ? idx : this._controlledIndex
        if (idx >= 0) this._controlledIndex = idx
        if (target !== this.getSelectedIndex()) {
            super.selectedIndex = target
            this.requestRender()
        }
    }

    override get showScrollIndicator(): boolean {
        return this._scrollIndicator
    }

    override set showScrollIndicator(value: boolean) {
        this._scrollIndicator = value
        this.requestRender()
    }

    override get options(): SelectOption[] {
        return super.options
    }

    override set options(options: SelectOption[]) {
        super.options = options.map((opt) =>
            'id' in opt ? TaskSelectRenderable.normalizeOption(opt as unknown as TaskSelectOption) : opt,
        )
        this._syncIndexToId()
    }

    get showDate(): boolean {
        return this._showDate
    }

    set showDate(value: boolean) {
        this._showDate = value
        this.requestRender()
    }

    get showId(): boolean {
        return this._showId
    }

    set showId(value: boolean) {
        this._showId = value
        this.requestRender()
    }

    get showSelection(): boolean {
        return this._showSelection
    }

    set showSelection(value: boolean) {
        this._showSelection = value
        this.requestRender()
    }

    get maxLines(): number {
        return this._maxLines
    }

    set maxLines(value: number) {
        this._maxLines = Math.max(1, value)
        this.requestRender()
    }

    get theme(): Theme {
        return this._theme
    }

    set theme(value: Theme) {
        this._theme = value
        this._colors = TaskSelectRenderable.buildColors(value)
        this.requestRender()
    }

    override get selectedIndex(): number {
        return this.getSelectedIndex()
    }

    override set selectedIndex(value: number) {
        super.selectedIndex = value
        this.requestRender()
        const task = this.options[this.getSelectedIndex()]?.value as TaskSelectOption | undefined
        if (task) this._onSelect?.(task.id)
    }

    get onSelect(): ((id: string) => void) | undefined {
        return this._onSelect
    }

    set onSelect(value: ((id: string) => void) | undefined) {
        this._onSelect = value
    }

    override handleKeyPress(key: KeyEvent): boolean {
        const opts = this.options
        switch (key.name) {
            case 'pagedown':
                if (opts.length === 0) return false
                this.selectedIndex = Math.min(
                    this.getSelectedIndex() + Math.max(1, this._lastVisibleCount - 1),
                    opts.length - 1,
                )
                return true
            case 'pageup':
                this.selectedIndex = Math.max(this.getSelectedIndex() - Math.max(1, this._lastVisibleCount - 1), 0)
                return true
            case 'home':
                if (opts.length === 0) return false
                this.selectedIndex = 0
                return true
            case 'end':
                if (opts.length === 0) return false
                this.selectedIndex = opts.length - 1
                return true
        }
        return super.handleKeyPress(key)
    }

    protected override renderSelf(_buffer: OptimizedBuffer, _deltaTime: number): void {
        if (!this.visible || !this.frameBuffer || !this.isDirty) return
        this.renderItems(this.frameBuffer)
    }

    private renderItems(fb: OptimizedBuffer): void {
        const opts = this.options

        fb.clear(TRANSPARENT)

        if (opts.length === 0 || this._heightValue === 0) return

        const selectedIndex = Math.min(this.getSelectedIndex(), opts.length - 1)
        const hasValidSelection =
            this._selectedId !== undefined && this._selectedId !== '' && this._selectedId in this._optionsById
        const maxLines = this._heightValue

        const showDate = this._showDate && this._widthValue >= 50
        const showId = this._showId && this._widthValue >= 40
        const maxDateLen = showDate
            ? opts.reduce((max, opt) => {
                  const task = opt.value as TaskSelectOption | undefined
                  if (!task?.date) return max
                  return Math.max(max, this.formatDate(task.date).length)
              }, 0)
            : 0
        const timeReserved = showDate ? maxDateLen + DATE_PADDING_RIGHT + 1 : 0

        const maxIdLen = this._maxIdLen

        const iconX = showId ? 1 + maxIdLen + 1 : 0
        const subjectX = iconX + 2
        const lineWidth = Math.max(0, this._widthValue - subjectX - timeReserved)

        // Build wrapped lines and cumulative heights in one pass — reused in render loop
        const wrappedLines: string[][] = new Array(opts.length)
        const cumLines = new Array<number>(opts.length + 1)
        cumLines[0] = 0
        for (let j = 0; j < opts.length; j++) {
            const title = (opts[j].value as TaskSelectOption | undefined)?.title ?? opts[j].name ?? ''
            wrappedLines[j] = this.wordWrap(title, lineWidth, this._maxLines)
            cumLines[j + 1] = cumLines[j] + wrappedLines[j].length
        }
        const totalLines = cumLines[opts.length]

        // Compute scroll offset in line-space so selected item stays visible
        let scrollOffset = 0
        if (totalLines > maxLines) {
            const selH = wrappedLines[selectedIndex].length
            const targetY = Math.floor((maxLines - selH) / 2)
            const desiredStart = Math.max(0, Math.min(cumLines[selectedIndex] - targetY, totalLines - maxLines))
            scrollOffset = opts.findIndex((_, j) => cumLines[j] >= desiredStart)
            if (scrollOffset < 0) scrollOffset = 0
        }

        let y = 0
        let i = 0

        while (y < maxLines && scrollOffset + i < opts.length) {
            const actualIndex = scrollOffset + i
            const opt = opts[actualIndex]
            const task = opt.value as TaskSelectOption | undefined
            const isSelected = actualIndex === selectedIndex
            const lines = wrappedLines[actualIndex]
            const itemLines = lines.length

            if (y + itemLines > maxLines) break

            if (isSelected && this._showSelection && hasValidSelection) {
                fb.fillRect(0, y, this._widthValue, itemLines, this._colors.selection)
            }

            if (!task) {
                for (let l = 0; l < lines.length; l++) {
                    fb.drawText(lines[l], subjectX, y + l, this._colors.id.pending)
                }
                y += itemLines
                i++
                continue
            }

            if (showId)
                this.renderColumnId(fb, y, `#${(task.id ?? String(actualIndex + 1)).padStart(maxIdLen, '0')} `, task)
            this.renderColumnState(fb, iconX, y, task)
            this.renderColumnTitle(fb, subjectX, y, lines, task)
            if (showDate) this.renderColumnDate(fb, y, task.date)

            y += itemLines
            i++
        }

        this._lastScrollOffset = scrollOffset
        this._lastCumLines = cumLines
        this._lastVisibleCount = i

        if (this._scrollIndicator && totalLines > maxLines) {
            const scrollPercent = selectedIndex / Math.max(1, opts.length - 1)
            const indicatorY = Math.floor(scrollPercent * (maxLines - 1))
            fb.drawText('\u2588', this._widthValue - 1, indicatorY, this._colors.scrollbarThumb)
        }
    }

    private renderColumnId = (fb: OptimizedBuffer, y: number, idText: string, task: TaskSelectOption): void => {
        fb.drawText(idText, 0, y, this._colors.id[task.status], undefined, TextAttributes.DIM)
    }

    private renderColumnState = (fb: OptimizedBuffer, x: number, y: number, task: TaskSelectOption): void => {
        fb.drawText(STATUS_ICON[task.status], x, y, this._colors.icon[task.status])
    }

    private renderColumnTitle = (
        fb: OptimizedBuffer,
        x: number,
        y: number,
        lines: string[],
        task: TaskSelectOption,
    ): void => {
        const color = this._colors.title[task.status]
        const attr = STATUS_TITLE_ATTR[task.status]
        for (let l = 0; l < lines.length; l++) {
            fb.drawText(lines[l], x, y + l, color, undefined, attr)
        }
    }

    private renderColumnDate = (fb: OptimizedBuffer, y: number, date: Date): void => {
        const dateStr = this.formatDate(date)
        const dateX = this._widthValue - DATE_PADDING_RIGHT - dateStr.length
        fb.drawText(dateStr, dateX, y, this._colors.date, undefined, TextAttributes.DIM)
    }

    protected override onMouseEvent(event: MouseEvent): void {
        if (event.type === 'scroll' && event.scroll) {
            if (event.scroll.direction === 'up') {
                this.moveUp(event.scroll.delta)
            } else if (event.scroll.direction === 'down') {
                this.moveDown(event.scroll.delta)
            }
            return
        }
        if (event.type === 'down' && this._lastCumLines.length > 0) {
            const opts = this.options
            const localY = event.y - this.y
            let y = 0
            for (let i = 0; this._lastScrollOffset + i < opts.length; i++) {
                const actualIndex = this._lastScrollOffset + i
                const itemHeight = this._lastCumLines[actualIndex + 1] - this._lastCumLines[actualIndex]
                if (localY >= y && localY < y + itemHeight) {
                    this.selectedIndex = actualIndex
                    break
                }
                y += itemHeight
                if (y >= this._heightValue) break
            }
            return
        }
        super.onMouseEvent(event)
    }

    private formatDate = (date: Date): string => {
        const diffMin = Math.floor((Date.now() - date.getTime()) / 60_000)
        if (diffMin < 1) return 'now'
        if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? 's' : ''}`

        const diffHr = Math.floor(diffMin / 60)
        if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''}`

        const diffDays = Math.floor(diffHr / 24)
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''}`

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    private wordWrap = (text: string, width: number, maxLines: number): string[] => {
        if (width <= 0 || maxLines <= 0) return [text]

        const lines: string[] = []
        let remaining = text

        while (remaining.length > 0 && lines.length < maxLines) {
            if (remaining.length <= width) {
                lines.push(remaining)
                break
            }

            const isLastLine = lines.length === maxLines - 1
            if (isLastLine) {
                lines.push(`${remaining.slice(0, width - 1).trimEnd()}…`)
                break
            }

            const breakAt = remaining.lastIndexOf(' ', width - 1)
            const line = breakAt > 0 ? remaining.slice(0, breakAt) : remaining.slice(0, width)
            remaining = breakAt > 0 ? remaining.slice(breakAt + 1) : remaining.slice(width)
            lines.push(line)
        }

        return lines
    }
}

declare module '@opentui/react' {
    interface OpenTUIComponents {
        'task-select': typeof TaskSelectRenderable
    }
}

extend({ 'task-select': TaskSelectRenderable })
