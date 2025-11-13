import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  ArrowSplit,
  ClosedTradeIcon,
  DepositNotifIcon,
  OpenedTradeIcon,
  SlIcon,
  TpIcon,
  WithdrawNotifIcon,
} from './ui/svgIcons'

interface NotificationsPopoverProps {
  children: React.ReactNode
}

type NotificationFilter = 'All' | 'Read' | 'Unread' | 'TP/SL'
type NotificationType =
  | 'stop-loss'
  | 'take-profit'
  | 'transfer'
  | 'deposit'
  | 'withdraw'
  | 'opened-trade'
  | 'closed-trade'
type NotificationStatus = 'read' | 'unread'

interface Notification {
  id: string
  type: NotificationType
  title: string
  platform: string
  timestamp: string
  date: string
  status: NotificationStatus
  hasIndicator?: boolean
  indicatorColor?: 'green' | 'red' | 'blue'
}

export function NotificationsPopover({ children }: NotificationsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('All')

  // Get platform text color class
  const getPlatformColorClass = (platform: string) => {
    const platformLower = platform.toLowerCase()
    if (platformLower === 'hyperliquid') return 'text-engine-hl'
    if (platformLower === 'symm') return 'text-engine-symm'
    return 'text-text-cta'
  }

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'stop-loss',
      title: 'Stop Loss hit BTC/HYPE',
      platform: 'SYMM',
      timestamp: '1h',
      date: 'on 09/11/2025',
      status: 'unread',
      hasIndicator: true,
      indicatorColor: 'green',
    },
    {
      id: '2',
      type: 'take-profit',
      title: 'Take Profit hit BTC/HYPE',
      platform: 'SYMM',
      timestamp: '1h',
      date: 'on 09/11/2025',
      status: 'unread',
      hasIndicator: true,
      indicatorColor: 'blue',
    },
    {
      id: '3',
      type: 'transfer',
      title: '$100000 Transfered',
      platform: 'SYMM',
      timestamp: '1h',
      date: 'on 09/11/2025',
      status: 'unread',
    },
    {
      id: '4',
      type: 'deposit',
      title: '$100000 Deposited',
      platform: 'Hyperliquid',
      timestamp: '1h',
      date: 'on 09/11/2025',
      status: 'unread',
      hasIndicator: true,
      indicatorColor: 'green',
    },
    {
      id: '5',
      type: 'withdraw',
      title: '$100000 Withdrawan',
      platform: 'Hyperliquid',
      timestamp: '1h',
      date: 'on 19/11/2025',
      status: 'unread',
      hasIndicator: true,
      indicatorColor: 'green',
    },
    {
      id: '6',
      type: 'withdraw',
      title: '$100000 Withdrawan',
      platform: 'Hyperliquid',
      timestamp: '1h',
      date: 'on 19/11/2025',
      status: 'unread',
      hasIndicator: true,
      indicatorColor: 'green',
    },
  ]

  const getNotificationIcon = (type: NotificationType) => {
    const iconClasses = 'w-6 h-6 rounded-lg flex items-center justify-center'

    switch (type) {
      case 'stop-loss':
        return (
          <div
            className={`${iconClasses} bg-state-short-default hover:bg-state-short-hover`}
          >
            {SlIcon}
          </div>
        )
      case 'take-profit':
        return (
          <div
            className={`${iconClasses} bg-state-long-default hover:bg-state-long-hover`}
          >
            {TpIcon}
          </div>
        )
      case 'transfer':
        return (
          <div
            className={`${iconClasses} bg-state-long-default hover:bg-state-long-hover`}
          >
            {ArrowSplit}
          </div>
        )
      case 'deposit':
        return (
          <div
            className={`${iconClasses} bg-state-long-default hover:bg-state-long-hover`}
          >
            {DepositNotifIcon}
          </div>
        )
      case 'withdraw':
        return (
          <div
            className={`${iconClasses} bg-state-short-default hover:bg-state-short-hover`}
          >
            {WithdrawNotifIcon}
          </div>
        )
      case 'opened-trade':
        return (
          <div
            className={`${iconClasses} bg-btn-secondary-active hover:bg-btn-secondary-hover`}
          >
            {OpenedTradeIcon}
          </div>
        )
      case 'closed-trade':
        return (
          <div
            className={`${iconClasses} bg-btn-secondary-active hover:bg-btn-secondary-hover`}
          >
            {ClosedTradeIcon}
          </div>
        )
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Read') return notification.status === 'read'
    if (activeFilter === 'Unread') return notification.status === 'unread'
    if (activeFilter === 'TP/SL')
      return (
        notification.type === 'take-profit' || notification.type === 'stop-loss'
      )
    return true
  })

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 bg-bg-subtle border border-border-default rounded-lg overflow-hidden w-[300px] mt-1"
      >
        <div className="flex flex-col p-5px space-y-4">
          <div className="space-y-2">
            <h2 className="text-text-secondary text-label-md font-medium">
              Notifications
            </h2>

            <div className="flex gap-2">
              {(['All', 'Read', 'Unread', 'TP/SL'] as NotificationFilter[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`py-3px px-5px rounded-lg text-label-sm font-medium transition-colors cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-btn-secondary-active hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled text-text-button'
                        : 'bg-transparent text-text-tertiary hover:bg-btn-tertiary-hover'
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[230px] overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className="flex items-center  gap-2 rounded-lg justify-between transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-5px">
                          <p className="text-text-primary text-label-sm font-medium truncate max-w-[200px]">
                            {notification.title}
                          </p>
                          <span
                            className={`${getPlatformColorClass(notification.platform)} text-label-sm font-medium shrink-0`}
                          >
                            {notification.platform}
                          </span>
                        </div>
                        <p className="text-text-disabled text-label-sm mt-0.5">
                          {notification.date}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp and Indicator */}
                    <div className="flex flex-col items-center gap-[3px] shrink-0">
                      <span className="text-text-tertiary text-label-sm">
                        {notification.timestamp}
                      </span>
                      {notification.hasIndicator && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-brand-primary`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  {index < filteredNotifications.length - 1 && (
                    <div className="border-t border-border-subtle mt-3" />
                  )}
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-text-tertiary text-sm">No notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
