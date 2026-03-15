'use client'

import { NotFound as NotFoundPage } from '@/pages/not-found'

import { AppProviders } from '@/app'

import './(landing)/globals.css'

const NotFound = () => (
    <AppProviders>
        <NotFoundPage />
    </AppProviders>
)

export default NotFound
