import { type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

interface RecommendationCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}

export function RecommendationCard({
  title,
  description,
  className,
  ...props
}: RecommendationCardProps) {
  return (
    <div
      className={cn(
        'relative flex items-start gap-3 rounded-lg p-4 overflow-hidden',
        className
      )}
      style={{
        background:
          'linear-gradient(135deg, hsl(15 80% 90%) 0%, hsl(220 60% 90%) 100%)',
      }}
      {...props}
    >
      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Title row with bloom icon */}
        <div className="flex items-start gap-2">
          {/* Bloom / flower icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path
              d="M8 1C8 1 9.5 3 8 5C6.5 3 8 1 8 1Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M8 11C8 11 9.5 13 8 15C6.5 13 8 11 8 11Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M1 8C1 8 3 9.5 5 8C3 6.5 1 8 1 8Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M11 8C11 8 13 9.5 15 8C13 6.5 11 8 11 8Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M2.93 2.93C2.93 2.93 4.05 5.19 2.93 6.31C1.81 5.19 2.93 2.93 2.93 2.93Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M9.69 9.69C9.69 9.69 10.81 11.95 9.69 13.07C8.57 11.95 9.69 9.69 9.69 9.69Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M13.07 2.93C13.07 2.93 10.81 4.05 9.69 2.93C10.81 1.81 13.07 2.93 13.07 2.93Z"
              fill="hsl(0 60% 32%)"
            />
            <path
              d="M6.31 9.69C6.31 9.69 4.05 10.81 2.93 9.69C4.05 8.57 6.31 9.69 6.31 9.69Z"
              fill="hsl(0 60% 32%)"
            />
            <circle cx="8" cy="8" r="2" fill="hsl(0 60% 32%)" />
          </svg>

          <p
            className="text-xs font-semibold leading-snug"
            style={{ color: 'hsl(0 60% 32%)' }}
          >
            {title}
          </p>
        </div>

        {/* Body text */}
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'hsl(10 40% 40%)' }}
        >
          {description}
        </p>
      </div>

      {/* Right arrow */}
      <div
        className="shrink-0 self-center"
        style={{ color: 'hsl(220 40% 55%)' }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3 1L9 6L3 11V1Z" />
        </svg>
      </div>
    </div>
  )
}
