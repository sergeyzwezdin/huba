export interface PlatformEntry {
    platform: string
    arch: string
    status: string
    supported: boolean
}

export const PLATFORMS: PlatformEntry[] = [
    { platform: 'macOS', arch: 'Apple Silicon (ARM64)', status: 'Supported', supported: true },
    { platform: 'macOS', arch: 'Intel (x86_64)', status: 'Supported', supported: true },
    { platform: 'Linux', arch: 'x86_64', status: 'Supported', supported: true },
    { platform: 'Linux', arch: 'ARM64', status: 'Supported', supported: true },
    { platform: 'Windows', arch: 'x64', status: 'Experimental', supported: false },
]
