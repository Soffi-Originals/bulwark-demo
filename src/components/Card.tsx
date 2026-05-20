import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'

export const cardVariants = cva(
  ['flex flex-col bg-surface text-fg', 'transition-colors'],
  {
    variants: {
      variant: {
        default: 'border border-line rounded-lg',
        raised: 'border border-line rounded-lg shadow-sm',
        sunken: 'bg-surface-sunken border border-line-subtle rounded-lg',
        critical:
          'border border-critical/50 bg-critical-subtle/40 rounded-lg',
        ghost: '',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-surface-sunken/60 active:bg-surface-sunken',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, padding, interactive, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, padding, interactive }),
        className
      )}
      {...props}
    />
  )
})

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1 pb-3', className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-sm font-semibold tracking-tight text-fg',
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-fg-muted', className)} {...props} />
  )
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-3', className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between pt-3 border-t border-line-subtle mt-3',
        className
      )}
      {...props}
    />
  )
}
