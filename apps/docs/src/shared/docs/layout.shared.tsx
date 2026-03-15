import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'

import { GITHUB_REPO_URL } from '@/shared/info'

export const baseOptions = (): BaseLayoutProps => ({
    nav: {
        title: (
            <>
                <Image src="/logo.svg" alt="Huba" width={20} height={16} />
                Huba
            </>
        ),
    },
    githubUrl: GITHUB_REPO_URL,
})
