import type { ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/cn'

const buttonVariants = cva(
    'inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'btn-primary rounded-full text-sm',
                glow: 'btn-glow rounded-full text-sm',
                link: 'text-sm text-subtle transition-colors hover:text-foreground',
            },
            size: {
                default: 'py-2.5 px-7',
                sm: 'py-1.5 px-4',
            },
        },
        compoundVariants: [{ variant: 'link', className: '!p-0' }],
        defaultVariants: {
            variant: 'glow',
            size: 'default',
        },
    },
)

type ButtonProps = ComponentPropsWithoutRef<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }
