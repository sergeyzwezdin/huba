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
} from '@opentui/core'

import type { Theme } from '@/shared/theme'
import { claude } from '@/shared/theme'

import type { BaseSelectOption } from './types'

export type BaseSelectRenderableOptions<T extends BaseSelectOption> = Omit<SelectRenderableOptions, 'options'> & {
    options?: T[]
    showDate?: boolean
    showSelection?: boolean
    theme?: Theme
    selectedId?: string
    optionsById?: Record<string, T>
    indexById?: Record<string, number>
    onSelect?: (id: string) => void
}

const TRANSPARENT = parseColor('transparent')

/**
 * Abstract base class for custom select lists.
 *
 * Provides common scrolling, keyboard navigation (pgup/pgdn/home/end),
 * mouse handling, selection highlight, and date formatting.
 *
 * Subclasses implement four abstract methods to define item-specific
 * rendering and measurement.
 */
export abstract class BaseSelectRenderable<T extends BaseSelectOption> extends SelectRenderable {
    private _showDate: boolean
    private _showSelection: boolean
    private _scrollIndicator: boolean
    private _theme: Theme
    private _dateTimer: ReturnType<typeof setInterval> | null = null
    private _onSelect: ((id: string) => void) | undefined
    private _selectedId: string | undefined = undefined
    private _controlledIndex = 0
    private _optionsById: Record<string, T> = {}
    private _indexById: Record<string, number> = {}
    private _selectionColor: ReturnType<typeof parseColor>
    private _scrollbarThumbColor: ReturnType<typeof parseColor>
    private _lastScrollOffset = 0
    private _lastCumLines: number[] = []
    private _lastVisibleCount = 0

    /** Rebuild subclass-specific parsed colors when the theme changes */
    protected abstract onThemeChanged(theme: Theme): void

    /**
     * Prepare layout state and return item heights.
     * Called once per render before any renderItem calls.
     * @returns Array of line-heights, one per item
     */
    protected abstract prepareLayout(items: T[], width: number): number[]

    /** Render a single item's content at position y */
    protected abstract renderItem(fb: OptimizedBuffer, item: T, index: number, y: number, width: number): void

    private toSelectOption(item: T): SelectOption {
        return { name: item.id, description: '', value: item }
    }

    constructor(ctx: RenderContext, options: BaseSelectRenderableOptions<T>) {
        const { options: items, ...rest } = options
        super(ctx, {
            ...rest,
            options: [],
            showDescription: false,
            showScrollIndicator: false,
        })
        this.focusable = false
        this._showDate = options.showDate ?? false
        this._showSelection = options.showSelection ?? true
        this._scrollIndicator = options.showScrollIndicator ?? true
        this._theme = options.theme ?? claude
        this._selectionColor = parseColor(this._theme.surface.selection)
        this._scrollbarThumbColor = parseColor(this._theme.surface.scrollbarThumb)
        this._dateTimer = setInterval(() => this.requestRender(), 60_000)
        this._onSelect = options.onSelect
        this._selectedId = options.selectedId
        this._optionsById = options.optionsById ?? {}
        this._indexById = options.indexById ?? {}
        if (items?.length) {
            super.options = items.map((opt) => this.toSelectOption(opt))
        }
        this.on(SelectRenderableEvents.SELECTION_CHANGED, (_index: number, option: SelectOption) => {
            const item = option?.value as T | undefined
            if (item) {
                this._onSelect?.(item.id)
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

    // ── Property accessors ──────────────────────────────────────────────

    get optionsById(): Record<string, T> {
        return this._optionsById
    }

    set optionsById(value: Record<string, T>) {
        this._optionsById = value
    }

    get indexById(): Record<string, number> {
        return this._indexById
    }

    set indexById(value: Record<string, number>) {
        this._indexById = value
        this._syncIndexToId()
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

    override get options(): SelectOption[] {
        return super.options
    }

    override set options(options: SelectOption[]) {
        super.options = options.map((opt) => ('id' in opt ? this.toSelectOption(opt as unknown as T) : opt))
        this._syncIndexToId()
    }

    get showDate(): boolean {
        return this._showDate
    }

    set showDate(value: boolean) {
        this._showDate = value
        this.requestRender()
    }

    get showSelection(): boolean {
        return this._showSelection
    }

    set showSelection(value: boolean) {
        this._showSelection = value
        this.requestRender()
    }

    override get showScrollIndicator(): boolean {
        return this._scrollIndicator
    }

    override set showScrollIndicator(value: boolean) {
        this._scrollIndicator = value
        this.requestRender()
    }

    get theme(): Theme {
        return this._theme
    }

    set theme(value: Theme) {
        this._theme = value
        this._selectionColor = parseColor(value.surface.selection)
        this._scrollbarThumbColor = parseColor(value.surface.scrollbarThumb)
        this.onThemeChanged(value)
        this.requestRender()
    }

    override get selectedIndex(): number {
        return this.getSelectedIndex()
    }

    override set selectedIndex(value: number) {
        super.selectedIndex = value
        this.requestRender()
        const item = this.options[this.getSelectedIndex()]?.value as T | undefined
        if (item) this._onSelect?.(item.id)
    }

    get onSelect(): ((id: string) => void) | undefined {
        return this._onSelect
    }

    set onSelect(value: ((id: string) => void) | undefined) {
        this._onSelect = value
    }

    // ── Keyboard / mouse ────────────────────────────────────────────────

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

    // ── Rendering ───────────────────────────────────────────────────────

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

        const items = opts.map((opt) => opt.value as T)
        const itemHeights = this.prepareLayout(items, this._widthValue)

        const cumLines = new Array<number>(opts.length + 1)
        cumLines[0] = 0
        for (let j = 0; j < opts.length; j++) {
            cumLines[j + 1] = cumLines[j] + itemHeights[j]
        }
        const totalLines = cumLines[opts.length]

        let scrollOffset = 0
        if (totalLines > maxLines) {
            const selH = itemHeights[selectedIndex]
            const targetY = Math.floor((maxLines - selH) / 2)
            const desiredStart = Math.max(0, Math.min(cumLines[selectedIndex] - targetY, totalLines - maxLines))
            scrollOffset = opts.findIndex((_, j) => cumLines[j] >= desiredStart)
            if (scrollOffset < 0) scrollOffset = 0
        }

        let y = 0
        let i = 0

        while (y < maxLines && scrollOffset + i < opts.length) {
            const actualIndex = scrollOffset + i
            const item = opts[actualIndex].value as T
            const isSelected = actualIndex === selectedIndex
            const itemHeight = itemHeights[actualIndex]

            if (y + itemHeight > maxLines) break

            if (isSelected && this._showSelection && hasValidSelection) {
                fb.fillRect(0, y, this._widthValue, itemHeight, this._selectionColor)
            }

            this.renderItem(fb, item, actualIndex, y, this._widthValue)

            y += itemHeight
            i++
        }

        this._lastScrollOffset = scrollOffset
        this._lastCumLines = cumLines
        this._lastVisibleCount = i

        if (this._scrollIndicator && totalLines > maxLines) {
            const scrollPercent = selectedIndex / Math.max(1, opts.length - 1)
            const indicatorY = Math.floor(scrollPercent * (maxLines - 1))
            fb.drawText('\u2588', this._widthValue - 1, indicatorY, this._scrollbarThumbColor)
        }
    }

    // ── Sync ────────────────────────────────────────────────────────────

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

    // ── Utilities ───────────────────────────────────────────────────────

    protected formatDate = (date: Date): string => {
        const diffMin = Math.floor((Date.now() - date.getTime()) / 60_000)
        if (diffMin < 1) return 'now'
        if (diffMin < 60) return `${diffMin}m`

        const diffHr = Math.floor(diffMin / 60)
        if (diffHr < 24) return `${diffHr}h`

        const diffDays = Math.floor(diffHr / 24)
        if (diffDays < 7) return `${diffDays}d`

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    protected wordWrap = (text: string, width: number, maxLines: number): string[] => {
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
