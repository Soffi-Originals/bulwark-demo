import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'

export const inputVariants = cva(
  [
    'flex w-full bg-surface text-fg placeholder:text-fg-subtle',
    'border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken',
  ],
  {
    variants: {
      state: {
        default: 'border-line',
        error: 'border-critical focus-visible:ring-critical/30 focus-visible:border-critical',
        success: 'border-success focus-visible:ring-success/30',
      },
      size: {
        sm: 'h-8 px-2.5 text-xs rounded-md',
        md: 'h-9 px-3 text-sm rounded-md',
        lg: 'h-11 px-4 text-base rounded-lg',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, state, size, leftIcon, ...props },
  ref
) {
  if (leftIcon) {
    return (
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-2.5 flex items-center text-fg-subtle">
          {leftIcon}
        </span>
        <input
          ref={ref}
          className={cn(
            inputVariants({ state, size }),
            'pl-8',
            className
          )}
          {...props}
        />
      </div>
    )
  }
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ state, size }), className)}
      {...props}
    />
  )
})
