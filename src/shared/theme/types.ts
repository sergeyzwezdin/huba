import { RGBA } from '@opentui/core'
import { z } from 'zod'

export const rgbaSchema = z.string().transform((hex) => RGBA.fromHex(hex))

export const themeSchema = z.object({
    border: z.object({
        default: rgbaSchema,
        focused: rgbaSchema,
    }),
    status: z.object({
        blocked: z.object({ id: rgbaSchema, icon: rgbaSchema, title: rgbaSchema }),
        pending: z.object({ id: rgbaSchema, icon: rgbaSchema, title: rgbaSchema }),
        inProgress: z.object({ id: rgbaSchema, icon: rgbaSchema, title: rgbaSchema }),
        completed: z.object({ id: rgbaSchema, icon: rgbaSchema, title: rgbaSchema }),
    }),
    colors: z.object({
        primary: rgbaSchema,
        secondary: rgbaSchema,
        tertiary: rgbaSchema,
        date: rgbaSchema,
        hint: rgbaSchema,
        accent: rgbaSchema,
    }),
    surface: z.object({
        selection: rgbaSchema,
        scrollbarTrack: rgbaSchema,
        scrollbarThumb: rgbaSchema,
    }),
    progress: z.object({
        blocked: rgbaSchema,
        pending: rgbaSchema,
        inProgress: rgbaSchema,
        completed: rgbaSchema,
    }),
    markdown: z.object({
        heading: rgbaSchema,
        list: rgbaSchema,
        code: rgbaSchema,
        default: rgbaSchema,
    }),
})

export type Theme = z.infer<typeof themeSchema>
