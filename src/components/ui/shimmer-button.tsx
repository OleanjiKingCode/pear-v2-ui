import React, { ComponentPropsWithoutRef, CSSProperties } from 'react'

import { cn } from '@/lib/utils'

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
  spread?: string
}

// Inline styles to ensure keyframes are always available in production
const shimmerStyles = `
  @keyframes spin-around {
    0% {
      transform: translateZ(0) rotate(0);
    }
    100% {
      transform: translateZ(0) rotate(360deg);
    }
  }

  @keyframes shimmer-slide {
    to {
      transform: translate(calc(100cqw - 100%), 0);
    }
  }
`

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      spread = '170deg',
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
        <button
          style={
            {
              '--spread': spread,
              '--shimmer-color': shimmerColor,
              '--radius': borderRadius,
              '--speed': shimmerDuration,
              '--cut': shimmerSize,
              '--bg': background,
            } as CSSProperties
          }
          className={cn(
            'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)]  px-2 py-1.5 whitespace-nowrap [background:var(--bg)] hover:[background:#1a3830]',
            'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
            className,
          )}
          ref={ref}
          {...props}
        >
          {/* spark container */}
          <div
            className={cn(
              '-z-30 blur-[2px]',
              '[container-type:size] absolute inset-0 overflow-visible',
            )}
          >
            {/* spark */}
            <div
              className="absolute inset-0 [aspect-ratio:1] h-[100cqh] [border-radius:0] [mask:none] w-[70cqw]"
              style={{
                animation:
                  'shimmer-slide var(--speed) linear infinite alternate',
              }}
            >
              {/* spark before */}
              <div
                className="absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"
                style={{
                  animation:
                    'spin-around calc(var(--speed) * 2) infinite linear',
                }}
              />
            </div>
          </div>
          {children}

          {/* backdrop */}
          <div
            className={cn(
              'absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)] group-hover:[background:#1a3830] ',
            )}
          />
        </button>
      </>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'
