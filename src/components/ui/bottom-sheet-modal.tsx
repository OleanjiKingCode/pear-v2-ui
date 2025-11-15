import { useEffect, useRef, useState, ReactNode, useCallback } from 'react'

interface BottomSheetModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

type SnapPoint = 'closed' | 'half' | 'full'

export function BottomSheetModal({
  isOpen,
  onClose,
  children,
  maxWidth = '660px',
}: BottomSheetModalProps) {
  const [snapPoint, setSnapPoint] = useState<SnapPoint>('half')
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSnapPoint('half')
      setTranslateY(0)
      document.body.style.overflow = 'hidden'
    } else {
      setSnapPoint('closed')
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const getSnapPointHeight = (point: SnapPoint): number => {
    if (typeof window === 'undefined') return 0
    const vh = window.innerHeight
    switch (point) {
      case 'half':
        return vh * 0.5
      case 'full':
        return vh * 0.8
      case 'closed':
        return 0
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    const isDragHandle = target.closest('[data-drag-handle]')
    const isScrollable = contentRef.current
    const isScrolledToTop = isScrollable ? isScrollable.scrollTop <= 5 : true

    // Allow dragging from drag handle or when scrolled to top
    if (isDragHandle || (isScrolledToTop && !isDragHandle)) {
      const touch = e.touches[0]
      setStartY(touch.clientY)
      setCurrentY(touch.clientY)
      // Don't set isDragging yet - wait for actual movement
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - startY

    // Check if user is trying to drag
    if (!isDragging && Math.abs(deltaY) > 5) {
      const target = e.target as HTMLElement
      const isDragHandle = target.closest('[data-drag-handle]')
      const isScrollable = contentRef.current
      const isScrolledToTop = isScrollable ? isScrollable.scrollTop <= 5 : true

      // Only start dragging if:
      // 1. Dragging from handle, OR
      // 2. At top of scroll and dragging down, OR
      // 3. Dragging up to expand when at half
      if (
        isDragHandle ||
        (isScrolledToTop && deltaY > 0) ||
        (isScrolledToTop && deltaY < 0 && snapPoint === 'half')
      ) {
        setIsDragging(true)
      } else {
        // Reset if not valid drag
        setStartY(0)
        return
      }
    }

    if (!isDragging) return

    setCurrentY(touch.clientY)

    // Prevent default scrolling when dragging
    if (Math.abs(deltaY) > 10) {
      e.preventDefault()
    }

    // Allow dragging down or up to next snap point
    if (deltaY > 0) {
      // Dragging down - add resistance when pulling beyond limits
      const resistance = deltaY > 100 ? 0.5 : 1
      setTranslateY(deltaY * resistance)
    } else if (deltaY < 0 && snapPoint === 'half') {
      // Dragging up from half to full
      setTranslateY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (!startY) {
      return
    }

    const deltaY = currentY - startY
    const velocity = Math.abs(deltaY)
    const wasDragging = isDragging

    setIsDragging(false)
    setStartY(0)
    setCurrentY(0)

    if (!wasDragging) {
      return
    }

    // Determine next snap point based on drag distance and velocity
    if (snapPoint === 'half') {
      if (deltaY > 150 || (velocity > 100 && deltaY > 50)) {
        // Dragged down significantly - close
        setSnapPoint('closed')
        setTimeout(() => onClose(), 200)
      } else if (deltaY < -100 || (velocity > 100 && deltaY < -30)) {
        // Dragged up - expand to full
        setSnapPoint('full')
      } else {
        // Snap back to half
        setSnapPoint('half')
      }
    } else if (snapPoint === 'full') {
      if (deltaY > 80 && deltaY < 200) {
        // Dragged down moderately - snap to half
        setSnapPoint('half')
      } else if (deltaY >= 200 || (velocity > 150 && deltaY > 80)) {
        // Dragged down significantly - close
        setSnapPoint('closed')
        setTimeout(() => onClose(), 200)
      } else {
        // Snap back to full
        setSnapPoint('full')
      }
    }

    setTranslateY(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const isDragHandle = target.closest('[data-drag-handle]')

    if (isDragHandle) {
      e.preventDefault()
      setStartY(e.clientY)
      setCurrentY(e.clientY)
      setIsDragging(true)
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !startY) return

      const deltaY = e.clientY - startY
      setCurrentY(e.clientY)

      // Allow dragging down or up to next snap point
      if (deltaY > 0) {
        const resistance = deltaY > 100 ? 0.5 : 1
        setTranslateY(deltaY * resistance)
      } else if (deltaY < 0 && snapPoint === 'half') {
        setTranslateY(deltaY)
      }
    },
    [isDragging, startY, snapPoint],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !startY) return

    const deltaY = currentY - startY
    const velocity = Math.abs(deltaY)

    setIsDragging(false)
    setStartY(0)
    setCurrentY(0)

    if (snapPoint === 'half') {
      if (deltaY > 150 || (velocity > 100 && deltaY > 50)) {
        setSnapPoint('closed')
        setTimeout(() => onClose(), 200)
      } else if (deltaY < -100 || (velocity > 100 && deltaY < -30)) {
        setSnapPoint('full')
      } else {
        setSnapPoint('half')
      }
    } else if (snapPoint === 'full') {
      if (deltaY > 80 && deltaY < 200) {
        setSnapPoint('half')
      } else if (deltaY >= 200 || (velocity > 150 && deltaY > 80)) {
        setSnapPoint('closed')
        setTimeout(() => onClose(), 200)
      } else {
        setSnapPoint('full')
      }
    }

    setTranslateY(0)
  }, [isDragging, startY, currentY, snapPoint, onClose])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  if (!isOpen && snapPoint === 'closed') return null

  const currentHeight = getSnapPointHeight(snapPoint)
  const heightStyle = isDragging
    ? `calc(${currentHeight}px - ${translateY}px)`
    : `${currentHeight}px`

  // Calculate backdrop opacity based on height
  const backdropOpacity = snapPoint === 'closed' ? 0 : isOpen ? 0.5 : 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black z-50 transition-opacity duration-300"
        onClick={onClose}
        style={{
          opacity: backdropOpacity,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Desktop Modal (md and up) */}
      <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center pointer-events-none px-4">
        <div
          className="w-full bg-bg-overlay border border-border-default rounded-2xl pointer-events-auto shadow-xl overflow-hidden"
          style={{
            maxWidth,
            animation: isOpen
              ? 'fadeIn 0.2s ease-out'
              : 'fadeOut 0.2s ease-out',
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile Bottom Sheet (below md) */}
      <div
        ref={sheetRef}
        className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-full z-50 bg-bg-overlay border-t border-border-default rounded-t-2xl pointer-events-auto flex flex-col shadow-2xl"
        style={{
          height: heightStyle,
          transform: snapPoint === 'closed' ? 'translateY(100%)' : undefined,
          transition: isDragging
            ? 'none'
            : snapPoint === 'closed'
              ? 'transform 0.3s ease-out'
              : 'height 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          willChange: 'height, transform',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        <div
          ref={dragHandleRef}
          data-drag-handle
          className="flex justify-center items-center py-3 cursor-grab active:cursor-grabbing shrink-0 touch-none"
        >
          <div className="w-12 h-1.5 bg-border-default rounded-full opacity-60" />
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
