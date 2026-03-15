#!/usr/bin/env node

const { execFileSync } = require('node:child_process')
const path = require('node:path')

const PLATFORMS = {
    'darwin-arm64': '@sergeyzwezdin/huba-cli-darwin-arm64',
    'darwin-x64': '@sergeyzwezdin/huba-cli-darwin-x64',
    'linux-x64': '@sergeyzwezdin/huba-cli-linux-x64',
    'linux-arm64': '@sergeyzwezdin/huba-cli-linux-arm64',
    'win32-x64': '@sergeyzwezdin/huba-cli-windows-x64',
}

const platformKey = `${process.platform}-${process.arch}`
const pkg = PLATFORMS[platformKey]

if (!pkg) {
    console.error(
        `huba: unsupported platform ${process.platform}-${process.arch}\n` +
            `Supported: ${Object.keys(PLATFORMS).join(', ')}`,
    )
    process.exit(1)
}

let binaryPath
try {
    const ext = process.platform === 'win32' ? '.exe' : ''
    const pkgDir = path.dirname(require.resolve(`${pkg}/package.json`))
    binaryPath = path.join(pkgDir, 'bin', `hb${ext}`)
} catch {
    console.error(
        `huba: platform package ${pkg} is not installed.\nTry reinstalling: npm install -g @sergeyzwezdin/huba`,
    )
    process.exit(1)
}

try {
    execFileSync(binaryPath, process.argv.slice(2), { stdio: 'inherit' })
} catch (error) {
    if (error.status !== undefined) {
        process.exit(error.status)
    }
    throw error
}
