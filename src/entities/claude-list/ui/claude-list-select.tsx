import { forwardRef } from 'react'

import { type OptimizedBuffer, parseColor, type RenderContext, TextAttributes } from '@opentui/core'
import { type ExtendedComponentProps, extend } from '@opentui/react'

import { useTheme } from '@/shared/settings'
import type { Theme } from '@/shared/theme'
import { BaseSelectRenderable, type BaseSelectRenderableOptions, useListData } from '@/shared/ui/select'

export type ClaudeListSelectOption = {
    id: string
    name: string
    createdAt: Date
    tasksCount: number
    instance?: string
}

type ClaudeListSelectRenderableOptions = BaseSelectRenderableOptions<ClaudeListSelectOption>

const DATE_PADDING_RIGHT = 1

export class ClaudeListSelectRenderable extends BaseSelectRenderable<ClaudeListSelectOption> {
    private static buildColors(t: Theme) {
        return {
            id: parseColor(t.colors.primary),
            date: parseColor(t.colors.date),
            count: parseColor(t.colors.hint),
            instance: parseColor(t.colors.hint),
        }
    }

    private _colors!: ReturnType<typeof ClaudeListSelectRenderable.buildColors>

    private _showDateComputed = false
    private _dateReserved = 0
    private _instanceReserved = 0
    private _countReserved = 0
    private _idWidth = 0

    constructor(ctx: RenderContext, options: ClaudeListSelectRenderableOptions) {
        super(ctx, { ...options, showDate: options.showDate ?? true })
        this._colors = ClaudeListSelectRenderable.buildColors(this.theme)
    }

    protected onThemeChanged(theme: Theme): void {
        this._colors = ClaudeListSelectRenderable.buildColors(theme)
    }

    protected prepareLayout(items: ClaudeListSelectOption[], width: number): number[] {
        const showDate = this.showDate && width >= 30
        const maxDateLen = showDate
            ? items.reduce((max, item) => {
                  if (!item.createdAt) return max
                  return Math.max(max, this.formatDate(item.createdAt).length)
              }, 0)
            : 0
        this._dateReserved = showDate ? maxDateLen + DATE_PADDING_RIGHT + 1 : 0

        const maxInstanceLen = items.reduce((max, item) => Math.max(max, item.instance?.length ?? 0), 0)
        this._instanceReserved = maxInstanceLen > 0 ? maxInstanceLen + 2 : 0

        const maxCountLen = items.reduce((max, item) => Math.max(max, String(item.tasksCount).length), 0)
        this._countReserved = maxCountLen + 2

        this._idWidth = Math.max(0, width - this._instanceReserved - this._countReserved - this._dateReserved)
        this._showDateComputed = showDate

        return items.map(() => 1)
    }

    protected renderItem(
        fb: OptimizedBuffer,
        item: ClaudeListSelectOption,
        _index: number,
        y: number,
        _width: number,
    ): void {
        const idText = item.name.length > this._idWidth ? `${item.name.slice(0, this._idWidth - 1)}…` : item.name
        fb.drawText(idText, 0, y, this._colors.id)

        if (this._instanceReserved > 0 && item.instance) {
            const instanceX = this._idWidth + 1
            fb.drawText(item.instance, instanceX, y, this._colors.instance, undefined, TextAttributes.DIM)
        }

        const countStr = String(item.tasksCount)
        const countX = this._idWidth + this._instanceReserved + this._countReserved - 1 - countStr.length
        fb.drawText(countStr, countX, y, this._colors.count, undefined, TextAttributes.DIM)

        if (this._showDateComputed && item.createdAt) {
            const dateStr = this.formatDate(item.createdAt)
            const dateX = this._widthValue - DATE_PADDING_RIGHT - dateStr.length
            fb.drawText(dateStr, dateX, y, this._colors.date, undefined, TextAttributes.DIM)
        }
    }
}

declare module '@opentui/react' {
    interface OpenTUIComponents {
        'claude-list-select': typeof ClaudeListSelectRenderable
    }
}

extend({ 'claude-list-select': ClaudeListSelectRenderable })

type ClaudeListSelectProps = Omit<
    ExtendedComponentProps<typeof ClaudeListSelectRenderable>,
    'theme' | 'selectedId' | 'optionsById' | 'indexById'
> & {
    focused?: boolean
    selectedItem?: string
}

export const ClaudeListSelect = forwardRef<ClaudeListSelectRenderable, ClaudeListSelectProps>((props, ref) => {
    const { selectedItem, options, ...rest } = props

    const { theme } = useTheme()
    const { optionsById, indexById } = useListData(options)

    return (
        <claude-list-select
            ref={ref}
            {...rest}
            options={options}
            optionsById={optionsById}
            indexById={indexById}
            selectedId={selectedItem}
            theme={theme}
        />
    )
})
