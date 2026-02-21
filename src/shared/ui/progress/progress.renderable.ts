import {
    type BoxOptions,
    BoxRenderable,
    type OptimizedBuffer,
    parseColor,
    type RenderContext,
    type RGBA,
    TextAttributes,
} from '@opentui/core'
import { extend } from '@opentui/react'

export type ProgressItem = {
    title: string
    color: string | RGBA
    value: number
}

type ProgressRenderableOptions = BoxOptions & {
    items?: ProgressItem[]
    emptyColor?: string | RGBA
}

const TRANSPARENT = parseColor('transparent')

export class ProgressRenderable extends BoxRenderable {
    private _items: ProgressItem[] = []
    private _parsedColors: ReturnType<typeof parseColor>[] = []
    private _emptyColor: ReturnType<typeof parseColor> | null = null

    constructor(ctx: RenderContext, options: ProgressRenderableOptions) {
        const { items, emptyColor, ...boxOptions } = options
        super(ctx, { ...boxOptions, buffered: true })
        this._items = items ?? []
        this._parsedColors = this._items.map((item) => parseColor(item.color))
        this._emptyColor = emptyColor != null ? parseColor(emptyColor) : null
    }

    get items(): ProgressItem[] {
        return this._items
    }

    set items(value: ProgressItem[]) {
        this._items = value
        this._parsedColors = value.map((item) => parseColor(item.color))
        this.requestRender()
    }

    get emptyColor(): string | RGBA | undefined {
        return undefined
    }

    set emptyColor(value: string | RGBA | undefined) {
        this._emptyColor = value != null ? parseColor(value) : null
        this.requestRender()
    }

    protected override renderSelf(_buffer: OptimizedBuffer): void {
        if (!this.visible || !this.frameBuffer || !this.isDirty) return
        this.renderBar(this.frameBuffer)
    }

    private renderBar(fb: OptimizedBuffer): void {
        fb.clear(TRANSPARENT)

        const barWidth = this._widthValue
        if (barWidth <= 0 || this._items.length === 0) return

        const total = this._items.reduce((sum, item) => sum + item.value, 0)
        if (total === 0) {
            if (this._emptyColor) {
                fb.drawText('█'.repeat(barWidth), 0, 0, this._emptyColor, undefined, TextAttributes.DIM)
            }
            return
        }

        const widths = this.calculateWidths(barWidth, total)

        let x = 0
        for (let i = 0; i < this._items.length; i++) {
            const w = widths[i]
            if (w <= 0) continue
            fb.drawText('█'.repeat(w), x, 0, this._parsedColors[i], undefined, TextAttributes.DIM)
            x += w
        }
    }

    private calculateWidths(barWidth: number, total: number): number[] {
        const exact = this._items.map((item) => (item.value / total) * barWidth)
        const floored = exact.map((v) => Math.floor(v))
        let remainder = barWidth - floored.reduce((a, b) => a + b, 0)
        const remainders = exact.map((v, i) => ({ i, frac: v - floored[i] }))
        remainders.sort((a, b) => b.frac - a.frac)
        for (const { i } of remainders) {
            if (remainder <= 0) break
            floored[i]++
            remainder--
        }
        return floored
    }
}

declare module '@opentui/react' {
    interface OpenTUIComponents {
        'progress-bar': typeof ProgressRenderable
    }
}

extend({ 'progress-bar': ProgressRenderable })
