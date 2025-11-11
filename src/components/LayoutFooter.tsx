import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { colors } from '@/lib/design-tokens'

type ConnectionStatus = 'none' | 'stable' | 'poor'

export function LayoutFooter() {
  const [connectionStatus] = useState<ConnectionStatus>('none')
  const [upnl] = useState('$0.00')
  const [avlMargin] = useState('$0.00')

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'stable':
        return colors.states.success
      case 'poor':
        return colors.text.warning
      case 'none':
      default:
        return colors.states.error
    }
  }

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'stable':
        return 'Stable Connection'
      case 'poor':
        return 'Poor Connection'
      case 'none':
      default:
        return 'No Connection'
    }
  }

  const getUpnlColor = () => {
    if (upnl.startsWith('-')) return colors.text.loss
    if (upnl === '$0.00') return colors.text.primary
    return colors.text.profit
  }

  const getConnectionTextColor = () => {
    switch (connectionStatus) {
      case 'stable':
        return colors.states.success
      case 'poor':
        return colors.text.warning
      case 'none':
      default:
        return colors.text.loss
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t p-9px bg-bg-base border-border-default">
      <div className="flex items-center gap-4">
        <button className="px-3 py-1.5 rounded text-xs font-medium bg-brand-secondary text-brand-primary">
          Withdraw Funds
        </button>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-text-secondary underline decoration-dotted">
            uPNL:
          </span>
          <span
            className="font-mono font-semibold"
            style={{ color: getUpnlColor() }}
          >
            {upnl}
          </span>
          <span className="text-text-secondary underline decoration-dotted">
            Avl margin:
          </span>
          <span className="font-mono font-semibold text-text-primary">
            {avlMargin}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded text-xs bg-bg-elevated">
          <TrendingUp className="w-4 h-4 text-brand-primary" />
          <span className="text-text-primary">Trade Signals</span>
          <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-brand-primary text-text-inverse">
            16
          </span>
        </button>

        <button className="p-1.5 rounded hover:opacity-80 transition-opacity bg-bg-elevated">
          <svg
            className="w-4 h-4 text-text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs hover:opacity-80 transition-opacity bg-bg-elevated text-text-primary">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Docs
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getConnectionColor() }}
          />
          <span style={{ color: getConnectionTextColor() }}>
            {getConnectionText()}
          </span>
        </div>
      </div>
    </footer>
  )
}
