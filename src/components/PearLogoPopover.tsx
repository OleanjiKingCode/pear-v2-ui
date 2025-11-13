import { Check } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface PearLogoPopoverProps {
  children: React.ReactNode
  selectedVersion: PearVersion
  onVersionChange: (version: PearVersion) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export type PearVersion = 'Legacy' | 'Degen Trader' | 'Pear Pro'

export function PearLogoPopover({
  children,
  selectedVersion,
  onVersionChange,
  isOpen,
  onOpenChange,
}: PearLogoPopoverProps) {
  const versions: { name: PearVersion }[] = [
    { name: 'Legacy' },
    { name: 'Degen Trader' },
    { name: 'Pear Pro' },
  ]

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-3px! border border-border-default bg-bg-subtle rounded-lg overflow-hidden w-[110px] mt-1"
      >
        <div className="space-y-3px">
          {versions.map((version) => (
            <div key={version.name}>
              <button
                onClick={() => {
                  onVersionChange(version.name)
                  onOpenChange(false)
                }}
                className="w-full flex items-center justify-between rounded-md cursor-pointer p-3px hover:bg-bg-overlay transition-colors"
              >
                <span className="text-text-primary text-label-sm font-medium flex items-center gap-2px">
                  {version.name === 'Pear Pro' ? (
                    <>
                      <span>Pear</span>
                      <span className="pl-2px text-xs text-text-button">
                        Pro
                      </span>
                    </>
                  ) : (
                    version.name
                  )}
                </span>

                {selectedVersion === version.name && (
                  <Check className="w-2 h-2 text-icon-cta shrink-0" />
                )}
              </button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
