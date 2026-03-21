import { existsSync, realpathSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const appRoot = resolve(__dirname, '..')
const repoRoot = resolve(appRoot, '../..')

const targetArg = process.argv[2]

type TargetConfig = {
    bunTarget: string
    outfile: string
}

const targets: Record<string, TargetConfig> = {
    'darwin-arm64': { bunTarget: 'bun-darwin-arm64', outfile: '.bin/hb-darwin-arm64' },
    'darwin-x64': { bunTarget: 'bun-darwin-x64', outfile: '.bin/hb-darwin-x64' },
    'linux-x64': { bunTarget: 'bun-linux-x64-modern', outfile: '.bin/hb-linux-x64' },
    'linux-arm64': { bunTarget: 'bun-linux-arm64', outfile: '.bin/hb-linux-arm64' },
    'windows-x64': { bunTarget: 'bun-windows-x64-modern', outfile: '.bin/hb-windows-x64.exe' },
}

function resolveWorkerPath(): string {
    const coreDir = dirname(fileURLToPath(import.meta.resolve('@opentui/core')))
    const workerPath = resolve(coreDir, 'parser.worker.js')
    if (!existsSync(workerPath)) {
        console.error(`OpenTUI parser worker not found at: ${workerPath}`)
        console.error('Run "bun install" to ensure @opentui/core is installed.')
        process.exit(1)
    }
    return workerPath
}

const workerSourcePath = resolveWorkerPath()
const workerRealPath = realpathSync(workerSourcePath)
const workerRelativePath = relative(realpathSync(repoRoot), workerRealPath).replaceAll('\\', '/')
const workerBunfsPath = `/$bunfs/root/${workerRelativePath}`

async function build(target?: string) {
    const config = target ? targets[target] : undefined

    if (target && !config) {
        console.error(`Unknown target: ${target}. Available: ${Object.keys(targets).join(', ')}`)
        process.exit(1)
    }

    const entrypoint = resolve(appRoot, 'index.tsx')
    const outfile = resolve(appRoot, config?.outfile ?? '.bin/hb')

    // biome-ignore lint/suspicious/noExplicitAny: Bun.build compile target type is complex
    const compile: any = { outfile }
    if (config) {
        compile.target = config.bunTarget
    }

    const result = await Bun.build({
        entrypoints: [entrypoint, workerSourcePath],
        root: repoRoot,
        compile,
        minify: true,
        define: {
            OTUI_TREE_SITTER_WORKER_PATH: JSON.stringify(workerBunfsPath),
        },
    })

    if (!result.success) {
        console.error('Build failed:')
        for (const log of result.logs) {
            console.error(log)
        }
        process.exit(1)
    }
}

await build(targetArg)
