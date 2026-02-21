import {
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
    onSelect?: (option: TaskSelectOption) => void
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

    private _showDate: boolean
    private _showId: boolean
    private _showSelection: boolean
    private _scrollIndicator: boolean
    private _maxLines: number
    private _theme: Theme
    private _dateTimer: ReturnType<typeof setInterval> | null = null
    private _onSelect: ((option: TaskSelectOption) => void) | undefined

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
        this._dateTimer = setInterval(() => this.requestRender(), 60_000)
        this._onSelect = options.onSelect
        this.on(SelectRenderableEvents.SELECTION_CHANGED, (_index: number, option: SelectOption) => {
            const task = option?.value as TaskSelectOption | undefined
            if (task) this._onSelect?.(task)
        })
    }

    override destroy(): void {
        if (this._dateTimer !== null) {
            clearInterval(this._dateTimer)
            this._dateTimer = null
        }
        super.destroy()
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
        this.requestRender()
    }

    override get selectedIndex(): number {
        return this.getSelectedIndex()
    }

    override set selectedIndex(value: number) {
        super.selectedIndex = value
        this.requestRender()
        const task = this.options[this.getSelectedIndex()]?.value as TaskSelectOption | undefined
        if (task) this._onSelect?.(task)
    }

    get onSelect(): ((option: TaskSelectOption) => void) | undefined {
        return this._onSelect
    }

    set onSelect(value: ((option: TaskSelectOption) => void) | undefined) {
        this._onSelect = value
    }

    protected override renderSelf(_buffer: OptimizedBuffer, _deltaTime: number): void {
        if (!this.visible || !this.frameBuffer || !this.isDirty) return
        this.renderItems(this.frameBuffer)
    }

    private renderItems(fb: OptimizedBuffer): void {
        const t = this._theme
        const opts = this.options

        fb.clear(TRANSPARENT)

        if (opts.length === 0 || this._heightValue === 0) return

        const selectedIndex = Math.min(this.getSelectedIndex(), opts.length - 1)
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

        const maxIdLen = opts.reduce((max, opt, idx) => {
            const id = (opt.value as TaskSelectOption | undefined)?.id ?? String(idx + 1)
            return Math.max(max, id.length)
        }, 0)

        const iconX = showId ? 1 + maxIdLen + 1 : 0
        const subjectX = iconX + 2
        const lineWidth = Math.max(0, this._widthValue - subjectX - timeReserved)

        const getItemHeight = (opt: SelectOption): number =>
            this.wordWrap(
                (opt.value as TaskSelectOption | undefined)?.title ?? opt.name ?? '',
                lineWidth,
                this._maxLines,
            ).length

        // Build cumulative line offsets
        const cumLines = new Array<number>(opts.length + 1)
        cumLines[0] = 0
        for (let j = 0; j < opts.length; j++) cumLines[j + 1] = cumLines[j] + getItemHeight(opts[j])
        const totalLines = cumLines[opts.length]

        // Compute scroll offset in line-space so selected item stays visible
        let scrollOffset = 0
        if (totalLines > maxLines) {
            const selH = getItemHeight(opts[selectedIndex])
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

            const subject = task?.title ?? opt.name ?? ''
            const lines = this.wordWrap(subject, lineWidth, this._maxLines)
            const itemLines = lines.length

            if (y + itemLines > maxLines) break

            if (isSelected && this._showSelection) {
                fb.fillRect(0, y, this._widthValue, itemLines, parseColor(t.surface.selection))
            }

            if (!task) {
                for (let l = 0; l < lines.length; l++) {
                    fb.drawText(lines[l], subjectX, y + l, parseColor(t.status.pending.id))
                }
                y += itemLines
                i++
                continue
            }

            if (showId)
                this.renderColumnId(fb, y, `#${(task.id ?? String(actualIndex + 1)).padStart(maxIdLen, '0')} `, task, t)
            this.renderColumnState(fb, iconX, y, task, t)
            this.renderColumnTitle(fb, subjectX, y, lines, task, t)
            if (showDate) this.renderColumnDate(fb, y, task.date, t)

            y += itemLines
            i++
        }

        if (this._scrollIndicator && totalLines > maxLines) {
            const scrollPercent = selectedIndex / Math.max(1, opts.length - 1)
            const indicatorY = Math.floor(scrollPercent * (maxLines - 1))
            fb.drawText('\u2588', this._widthValue - 1, indicatorY, parseColor(t.surface.scrollbarThumb))
        }
    }

    private renderColumnId = (
        fb: OptimizedBuffer,
        y: number,
        idText: string,
        task: TaskSelectOption,
        t: Theme,
    ): void => {
        const colors = {
            pending: t.status.pending.id,
            blocked: t.status.blocked.id,
            in_progress: t.status.inProgress.id,
            completed: t.status.completed.id,
        } as const
        fb.drawText(idText, 0, y, parseColor(colors[task.status]), undefined, TextAttributes.DIM)
    }

    private renderColumnState = (fb: OptimizedBuffer, x: number, y: number, task: TaskSelectOption, t: Theme): void => {
        const colors = {
            pending: t.status.pending.icon,
            blocked: t.status.blocked.icon,
            in_progress: t.status.inProgress.icon,
            completed: t.status.completed.icon,
        } as const
        fb.drawText(STATUS_ICON[task.status], x, y, parseColor(colors[task.status]))
    }

    private renderColumnTitle = (
        fb: OptimizedBuffer,
        x: number,
        y: number,
        lines: string[],
        task: TaskSelectOption,
        t: Theme,
    ): void => {
        const colors = {
            pending: t.status.pending.title,
            blocked: t.status.blocked.title,
            in_progress: t.status.inProgress.title,
            completed: t.status.completed.title,
        } as const
        const color = parseColor(colors[task.status])
        const attr = STATUS_TITLE_ATTR[task.status]
        for (let l = 0; l < lines.length; l++) {
            fb.drawText(lines[l], x, y + l, color, undefined, attr)
        }
    }

    private renderColumnDate = (fb: OptimizedBuffer, y: number, date: Date, t: Theme): void => {
        const dateStr = this.formatDate(date)
        const dateX = this._widthValue - DATE_PADDING_RIGHT - dateStr.length
        fb.drawText(dateStr, dateX, y, parseColor(t.colors.date), undefined, TextAttributes.DIM)
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
