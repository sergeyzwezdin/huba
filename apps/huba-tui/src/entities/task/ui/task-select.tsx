import { forwardRef, useMemo } from 'react'

import { type OptimizedBuffer, parseColor, type RenderContext, TextAttributes } from '@opentui/core'
import { type ExtendedComponentProps, extend } from '@opentui/react'

import { useTheme } from '@/shared/settings'
import type { Theme } from '@/shared/theme'
import { BaseSelectRenderable, type BaseSelectRenderableOptions, useListData } from '@/shared/ui/select'

export type TaskStatus = 'pending' | 'blocked' | 'in_progress' | 'completed'

export type TaskSelectOption = {
    id: string
    title: string
    status: TaskStatus
    date: Date
}

type TaskSelectRenderableOptions = BaseSelectRenderableOptions<TaskSelectOption> & {
    showId?: boolean
    maxLines?: number
    maxIdLen?: number
}

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

export class TaskSelectRenderable extends BaseSelectRenderable<TaskSelectOption> {
    private static buildColors(t: Theme) {
        return {
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

    private _showId: boolean
    private _maxLines: number
    private _maxIdLen = 0
    private _colors!: ReturnType<typeof TaskSelectRenderable.buildColors>

    // Layout state cached by prepareLayout
    private _showDateComputed = false
    private _showIdComputed = false
    private _iconX = 0
    private _subjectX = 0
    private _wrappedLines: string[][] = []

    constructor(ctx: RenderContext, options: TaskSelectRenderableOptions) {
        super(ctx, options)
        this._showId = options.showId ?? true
        this._maxLines = Math.max(1, options.maxLines ?? 2)
        this._maxIdLen = options.maxIdLen ?? 0
        this._colors = TaskSelectRenderable.buildColors(this.theme)
    }

    // ── TaskSelect-specific properties ──────────────────────────────────

    get maxIdLen(): number {
        return this._maxIdLen
    }

    set maxIdLen(value: number) {
        this._maxIdLen = value
        this.requestRender()
    }

    get showId(): boolean {
        return this._showId
    }

    set showId(value: boolean) {
        this._showId = value
        this.requestRender()
    }

    get maxLines(): number {
        return this._maxLines
    }

    set maxLines(value: number) {
        this._maxLines = Math.max(1, value)
        this.requestRender()
    }

    // ── Abstract implementations ────────────────────────────────────────

    protected onThemeChanged(theme: Theme): void {
        this._colors = TaskSelectRenderable.buildColors(theme)
    }

    protected prepareLayout(items: TaskSelectOption[], width: number): number[] {
        const showDate = this.showDate && width >= 50
        const showId = this._showId && width >= 40
        const maxDateLen = showDate
            ? items.reduce((max, item) => {
                  if (!item.date) return max
                  return Math.max(max, this.formatDate(item.date).length)
              }, 0)
            : 0
        const timeReserved = showDate ? maxDateLen + DATE_PADDING_RIGHT + 1 : 0
        const maxIdLen = this._maxIdLen
        const iconX = showId ? 1 + maxIdLen + 1 : 0
        const subjectX = iconX + 2
        const lineWidth = Math.max(0, width - subjectX - timeReserved)

        this._showDateComputed = showDate
        this._showIdComputed = showId
        this._iconX = iconX
        this._subjectX = subjectX

        this._wrappedLines = items.map((item) => this.wordWrap(item.title ?? '', lineWidth, this._maxLines))
        return this._wrappedLines.map((lines) => lines.length)
    }

    protected renderItem(fb: OptimizedBuffer, item: TaskSelectOption, index: number, y: number, _width: number): void {
        const lines = this._wrappedLines[index]

        if (this._showIdComputed) {
            const idText = `#${(item.id ?? String(index + 1)).padStart(this._maxIdLen, '0')} `
            fb.drawText(idText, 0, y, this._colors.id[item.status], undefined, TextAttributes.DIM)
        }

        fb.drawText(STATUS_ICON[item.status], this._iconX, y, this._colors.icon[item.status])

        const color = this._colors.title[item.status]
        const attr = STATUS_TITLE_ATTR[item.status]
        for (let l = 0; l < lines.length; l++) {
            fb.drawText(lines[l], this._subjectX, y + l, color, undefined, attr)
        }

        if (this._showDateComputed) {
            const dateStr = this.formatDate(item.date)
            const dateX = this._widthValue - DATE_PADDING_RIGHT - dateStr.length
            fb.drawText(dateStr, dateX, y, this._colors.date, undefined, TextAttributes.DIM)
        }
    }
}

declare module '@opentui/react' {
    interface OpenTUIComponents {
        'task-select': typeof TaskSelectRenderable
    }
}

extend({ 'task-select': TaskSelectRenderable })

type TaskSelectProps = Omit<
    ExtendedComponentProps<typeof TaskSelectRenderable>,
    'theme' | 'selectedId' | 'optionsById' | 'indexById' | 'maxIdLen'
> & {
    focused?: boolean
    selectedItem?: string
}

export const TaskSelect = forwardRef<TaskSelectRenderable, TaskSelectProps>((props, ref) => {
    const { selectedItem, options, ...rest } = props

    const { theme } = useTheme()
    const { optionsById, indexById } = useListData(options)

    const maxIdLen = useMemo(() => (options ?? []).reduce((max, opt) => Math.max(max, opt.id.length), 0), [options])

    return (
        <task-select
            ref={ref}
            {...rest}
            options={options}
            optionsById={optionsById}
            indexById={indexById}
            maxIdLen={maxIdLen}
            selectedId={selectedItem}
            theme={theme}
        />
    )
})
