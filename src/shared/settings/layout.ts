import { atom } from 'jotai'

export type Layout = 'horizontal' | 'vertical'

export const layoutAtom = atom<Layout>('horizontal')
