import { useState } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface RestrictedRegionPopoverProps {
  children?: React.ReactNode
}

export function RestrictedRegionPopover({
  children,
}: RestrictedRegionPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleViewTerritories = () => {
    // Add logic to view restricted territories
    console.log('View restricted territories')
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children || (
          <div className="flex items-center justify-center gap-3px w-8 md:w-fit h-[32px] md:h-[33px] p-5px rounded-lg text-xs bg-state-warning text-text-warning cursor-pointer hover:opacity-90 transition-opacity">
            <MapPin className="w-3 h-3" />
            <span className=" hidden xl:flex">Restricted Region Detected</span>
            <ChevronDown
              className={`w-3 h-3 pl-2px hidden xl:flex  text-icon-warn transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-5px border border-border-default rounded-lg overflow-hidden w-[300px] mt-1"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
        }}
      >
        <div className="space-y-5px">
          <div className="flex items-center gap-3px pb-5px border-b border-border-subtle">
            <MapPin className="w-3 h-3 text-text-warning" />
            <h3 className="text-text-warning text-label-sm font-medium">
              Restricted Region Detected
            </h3>
          </div>

          {/* Content */}
          <p className="text-text-secondary text-label-sm">
            For a better trading experience please switch to a supported
            location.
          </p>

          {/* Action Button */}
          <Button
            onClick={handleViewTerritories}
            className="w-full text-label-sm px-11px py-5px h-[33px] bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled text-text-primary rounded-lg transition-colors"
          >
            <span className="text-label-sm  font-medium">
              {' '}
              View restricted territories
            </span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
