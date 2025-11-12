import React, { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      borderRadius = '100px',
      shimmerDuration = '3s',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            '--shimmer-color': shimmerColor,
            '--shimmer-size': shimmerSize,
            '--border-radius': borderRadius,
            '--shimmer-duration': shimmerDuration,
            '--background': background,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)]',
          'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect */}
        <div
          className={cn(
            'absolute inset-0 flex h-full w-full justify-center [background-repeat:no-repeat] [background-size:var(--shimmer-size)_100%] [mask-image:radial-gradient(circle,white,transparent)]',
            'animate-shimmer',
          )}
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0) 30%, ${shimmerColor} 50%, rgba(255,255,255,0) 70%)`,
          }}
        />
        {children}
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'
