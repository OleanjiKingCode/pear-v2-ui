import { Link } from '@tanstack/react-router'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface EarnPopoverProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function EarnPopover({
  children,
  isOpen,
  onOpenChange,
}: EarnPopoverProps) {
  const earnItems = [
    { name: 'Staking', path: '/staking' },
    { name: 'Referral', path: '/referral' },
  ]

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-3px! border border-border-default bg-bg-subtle rounded-lg overflow-hidden w-[110px] mt-1"
      >
        <div className="space-y-3px">
          {earnItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => onOpenChange(false)}
              activeOptions={{ exact: item.path === '/' }}
              className="w-full flex items-center rounded-md cursor-pointer p-3px hover:bg-bg-overlay transition-colors"
            >
              {({ isActive }) => (
                <span
                  className={`text-label-sm font-medium ${
                    isActive ? 'text-text-primary' : 'text-text-tertiary'
                  }`}
                >
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
