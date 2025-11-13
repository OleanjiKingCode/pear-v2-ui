import { Link } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface MorePopoverProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MorePopover({
  children,
  isOpen,
  onOpenChange,
}: MorePopoverProps) {
  const moreItems = [
    { name: 'Education', path: '/education', external: false },
    { name: 'Docs', path: '/pear-docs', external: true },
    { name: 'Analytics', path: '/analytics', external: true },
  ]

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-3px! border border-border-default bg-bg-subtle rounded-lg overflow-hidden w-[120px] mt-1"
      >
        <div className="space-y-3px">
          {moreItems.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onOpenChange(false)}
                  className="w-full flex items-center justify-between rounded-md cursor-pointer p-3px hover:bg-bg-overlay transition-colors"
                >
                  <span className="text-label-sm font-medium text-text-tertiary">
                    {item.name}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-icon-subtle" />
                </a>
              )
            }

            return (
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
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
