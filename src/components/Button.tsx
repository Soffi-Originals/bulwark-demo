import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium select-none',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-fg hover:bg-brand-hover active:bg-brand-hover',
        secondary:
          'bg-surface-raised text-fg border border-line-strong hover:bg-surface-sunken active:bg-surface-sunken',
        ghost: 'bg-transparent text-fg hover:bg-surface-sunken',
        outline:
          'bg-transparent text-fg border border-line hover:bg-surface-sunken',
        destructive:
          'bg-critical text-critical-fg hover:opacity-90 active:opacity-80',
        subtle:
          'bg-surface-sunken text-fg hover:bg-line-subtle active:bg-line',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-9 px-4 text-sm rounded-md',
        lg: 'h-11 px-5 text-base rounded-lg',
        icon: 'h-9 w-9 rounded-md',
        'icon-sm': 'h-8 w-8 rounded-md',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      block,
      loading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, block }), className)}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)
