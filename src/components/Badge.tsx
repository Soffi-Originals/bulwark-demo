import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'

export const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
    'border',
  ],
  {
    variants: {
      variant: {
        neutral:
          'bg-surface-sunken text-fg-muted border-line',
        sev1: 'bg-critical text-critical-fg border-critical',
        sev2: 'bg-critical-subtle text-critical border-critical/40',
        sev3: 'bg-warning-subtle text-warning border-warning/40',
        sev4: 'bg-info-subtle text-info border-info/40',
        info: 'bg-info-subtle text-info border-info/40',
        success: 'bg-success-subtle text-success border-success/40',
        warning: 'bg-warning-subtle text-warning border-warning/40',
        critical: 'bg-critical-subtle text-critical border-critical/40',
        outline: 'bg-transparent text-fg-muted border-line',
        brand: 'bg-brand/10 text-brand border-brand/30',
      },
      size: {
        sm: 'text-[10px] leading-none px-1.5 py-0.5 rounded-sm uppercase tracking-wider',
        md: 'text-xs leading-none px-2 py-1 rounded-md',
        lg: 'text-sm leading-none px-2.5 py-1.5 rounded-md',
      },
      pulse: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        pulse: true,
        variant: 'sev1',
        class:
          "relative after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:ring-2 after:ring-critical/60 after:animate-ping",
      },
    ],
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      pulse: false,
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, pulse, leftIcon, children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, pulse }), className)}
      {...props}
    >
      {leftIcon}
      {children}
    </span>
  )
})
