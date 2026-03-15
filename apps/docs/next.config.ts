import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    reactCompiler: true,
    images: {
        unoptimized: true,
    },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
