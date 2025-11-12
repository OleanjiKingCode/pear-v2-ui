import { useState } from 'react'
import { Bell, Settings, Menu, ChevronDown, MapPin } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface LayoutHeaderProps {
  onMenuClick?: () => void
}

export function LayoutHeader({ onMenuClick }: LayoutHeaderProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedNetwork] = useState<'arbitrum' | 'base'>('base')
  const [notificationCount] = useState(4)
  const [walletAddress] = useState('0xd4eb...53fc')
  const [hasWarning] = useState(false)
  const [isRestrictedRegion] = useState(false)
  return (
    <nav className="border-b bg-bg-raised border-border-default">
      <div className="flex items-center justify-between p-5px">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center gap-10px">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/pear.svg" alt="Pear Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-text-primary">PEAR</span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10px">
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/trade">Trade</NavLink>
            <NavLink to="/vaults">Vaults</NavLink>
            <NavLink to="/agent-pear" highlight>
              Agent Pear
            </NavLink>
            <NavLink to="/markets">Markets</NavLink>
            <div className="flex items-center gap-3px">
              <NavLink to="/earn">Earn</NavLink>
              <ChevronDown className="w-3 h-3 text-text-secondary" />
            </div>
            <div className="flex items-center gap-3px">
              <NavLink to="/">More</NavLink>
              <ChevronDown className="w-3 h-3 text-text-secondary" />
            </div>
          </div>

          {/* Restricted Region Badge */}

          {/* Hypear Point Badge */}
          {!isRestrictedRegion && (
            <div className="hidden md:flex px-3 py-1 rounded-full text-xs bg-bg-elevated text-brand-accent">
              Hypear Point 2
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5px">
          {isRestrictedRegion && (
            <div className="hidden md:flex items-center gap-3px p-5px rounded-lg text-xs bg-state-warning text-text-warning">
              <MapPin className="w-3 h-3" />
              Restricted Region Detected
              <ChevronDown className="w-3 h-3 pl-2px" />
            </div>
          )}

          {isWalletConnected && (
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex px-11px py-5px rounded-lg text-text-button border-border-default bg-brand-secondary"
            >
              Deposit
            </Button>
          )}

          {!isWalletConnected ? (
            <Button
              size="sm"
              className="hidden md:inline-flex px-11px py-5px rounded-lg bg-brand-primary text-text-inverse"
              onClick={() => setIsWalletConnected(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            /* Wallet Address (when connected) */
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:opacity-80 transition-opacity bg-bg-elevated">
              {/* Network Icon */}
              {selectedNetwork === 'base' ? (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
              ) : selectedNetwork === 'arbitrum' ? (
                <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                  </svg>
                </div>
              ) : null}

              {/* Warning Icon (if warning state) */}
              {hasWarning && (
                <svg
                  className="w-4 h-4 text-text-warning"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <span className="text-sm font-mono text-text-primary">
                {walletAddress}
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </div>
          )}

          <button className="relative p-5px rounded-lg hover:opacity-80 transition-opacity bg-btn-tertiary-active">
            <Bell className="w-4 h-4 text-icon-active" />
            {notificationCount > 0 && (
              <>
                <div className="absolute top-0 right-1 px-3px py-2px rounded-full bg-icon-warn flex items-center justify-center">
                  <span className="text-(length:--font-size-body-3xs) font-normal text-text-inverse">
                    {notificationCount}
                  </span>
                </div>
              </>
            )}
          </button>

          <button className="p-5px rounded-lg hover:opacity-80 transition-opacity bg-btn-tertiary-active">
            <Settings className="w-4 h-4 text-icon-active" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-btn-tertiary-active"
            onClick={onMenuClick}
          >
            <Menu className="w-4 h-4 text-icon-active" />
          </button>
        </div>
      </div>
    </nav>
  )
}

// Nav Link Component
function NavLink({
  children,
  to,
  highlight = false,
}: {
  children: React.ReactNode
  to: string
  highlight?: boolean
}) {
  const gradientStyle = {
    background: 'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  return (
    <Link
      to={to}
      activeOptions={{ exact: to === '/' }}
      className="rounded-lg text-sm font-medium transition-all"
    >
      {({ isActive }) => (
        <span
          className={
            highlight
              ? ''
              : isActive
                ? 'text-text-primary'
                : 'text-text-tertiary'
          }
          style={highlight ? gradientStyle : undefined}
        >
          {children}
        </span>
      )}
    </Link>
  )
}
