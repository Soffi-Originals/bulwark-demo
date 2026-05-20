import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'

export const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'rounded-full font-medium select-none',
    'bg-surface-sunken text-fg border border-line',
  ],
  {
    variants: {
      size: {
        xs: 'size-5 text-[9px]',
        sm: 'size-6 text-[10px]',
        md: 'size-8 text-xs',
        lg: 'size-10 text-sm',
        xl: 'size-14 text-base',
      },
      status: {
        none: '',
        online:
          "after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2 after:rounded-full after:bg-success after:ring-2 after:ring-surface",
        away:
          "after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2 after:rounded-full after:bg-warning after:ring-2 after:ring-surface",
        offline:
          "after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2 after:rounded-full after:bg-fg-subtle after:ring-2 after:ring-surface",
        oncall:
          "after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-2 after:rounded-full after:bg-critical after:ring-2 after:ring-surface",
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'none',
    },
  }
)

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  name: string
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size, status, name, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(avatarVariants({ size, status }), className)}
      aria-label={name}
      title={name}
      {...props}
    >
      {initials(name)}
    </span>
  )
})
