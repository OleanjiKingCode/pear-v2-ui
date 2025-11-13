import { useState } from 'react'
import { Settings, Menu, ChevronDown, Zap } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { NotificationIcon } from '@/components/ui/svgIcons'
import { SettingsPopover } from '@/components/popovers/SettingsPopover'
import { NotificationsPopover } from '@/components/popovers/NotificationsPopover'
import { WalletPopover } from '@/components/popovers/WalletPopover'
import { RestrictedRegionPopover } from '@/components/popovers/RestrictedRegionPopover'
import { PearLogoPopover, type PearVersion } from '@/components/popovers/PearLogoPopover'
import { EarnPopover } from '@/components/popovers/EarnPopover'
import { MorePopover } from '@/components/popovers/MorePopover'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { DepositModal } from '@/components/modals/DepositModal'
import { NavigationDrawer } from './NavigationDrawer'

interface LayoutHeaderProps {
  onMenuClick?: () => void
}

export function LayoutHeader({ onMenuClick }: LayoutHeaderProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedNetwork] = useState<'arbitrum' | 'base'>('base')
  const [notificationCount] = useState(5)
  const [walletAddress] = useState('0xd4eb...53fc')
  const [hasWarning] = useState(false)
  const [isRestrictedRegion] = useState(false)
  const [isWalletPopoverOpen, setIsWalletPopoverOpen] = useState(false)
  const [pearVersion, setPearVersion] = useState<PearVersion>('Legacy')
  const [isPearPopoverOpen, setIsPearPopoverOpen] = useState(false)
  const [isEarnPopoverOpen, setIsEarnPopoverOpen] = useState(false)
  const [isMorePopoverOpen, setIsMorePopoverOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
      <nav className="border-b bg-bg-raised border-border-default">
        <div className="flex items-center justify-between p-5px">
          <div className="flex items-center gap-10px">
            <PearLogoPopover
              selectedVersion={pearVersion}
              onVersionChange={setPearVersion}
              isOpen={isPearPopoverOpen}
              onOpenChange={setIsPearPopoverOpen}
            >
              <Link to="/" className="flex items-center gap-5px">
                <div className="flex items-center space-x-3px">
                  <img src="/pear.svg" alt="Pear Logo" className="w-8 h-8" />
                  <span className="font-semibold text-lg text-text-primary">
                    PEAR
                  </span>
                  {pearVersion === 'Pear Pro' && (
                    <span className="font-bold text-xs text-text-button">
                      Pro
                    </span>
                  )}
                  {pearVersion === 'Degen Trader' && (
                    <Zap className="w-3 h-3 text-icon-cta fill-brand-primary" />
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-text-secondary transition-transform ${isPearPopoverOpen ? 'rotate-180' : ''}`}
                />
              </Link>
            </PearLogoPopover>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10px">
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/trade">Trade</NavLink>
              <NavLink to="/vaults">Vaults</NavLink>
              <NavLink to="/agent-pear" highlight>
                Agent Pear
              </NavLink>
              <NavLink to="/markets">Markets</NavLink>

              <EarnPopover
                isOpen={isEarnPopoverOpen}
                onOpenChange={setIsEarnPopoverOpen}
              >
                <button className="flex items-center gap-3px rounded-lg text-label-sm font-medium transition-all text-text-tertiary hover:text-text-primary">
                  <span>Earn</span>
                  <ChevronDown
                    className={`w-3 h-3 text-text-secondary transition-transform ${isEarnPopoverOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </EarnPopover>

              <MorePopover
                isOpen={isMorePopoverOpen}
                onOpenChange={setIsMorePopoverOpen}
              >
                <button className="flex items-center gap-3px rounded-lg text-label-sm font-medium transition-all text-text-tertiary hover:text-text-primary">
                  <span>More</span>
                  <ChevronDown
                    className={`w-3 h-3 text-text-secondary transition-transform ${isMorePopoverOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </MorePopover>

              <Link to="/">
                <ShimmerButton
                  className=" hidden md:flex px-2 py-1.5  hover:bg-[#153029]!"
                  shimmerColor="#14B8A6"
                  background="#0f221d"
                  shimmerDuration="1s"
                >
                  <span className="text-[#14B8A6] text-[10px] font-semibold whitespace-nowrap">
                    Hypear Point 2
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5px">
            {<RestrictedRegionPopover />}

            <Button
              onClick={() => setIsDepositOpen(true)}
              className="hidden xl:inline-flex px-11px py-5px h-[33px] rounded-lg text-text-button border-border-default bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled transition-colors"
            >
              <span className="text-label-sm"> Deposit</span>
            </Button>

            {!isWalletConnected ? (
              <Button
                className="cursor-pointer px-11px py-5px h-[33px] rounded-lg bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse transition-colors"
                onClick={() => setIsWalletConnected(true)}
              >
                <span className="text-label-sm">Connect Wallet</span>
              </Button>
            ) : (
              /* Wallet Address (when connected) */
              <WalletPopover
                walletAddress={walletAddress}
                hasWarning={hasWarning}
                isOpen={isWalletPopoverOpen}
                onOpenChange={setIsWalletPopoverOpen}
              >
                <div className="flex items-center gap-2 px-7px py-5px  rounded-lg cursor-pointer  bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled ">
                  {hasWarning ? (
                    <img
                      src="/chains/wrong.svg"
                      alt="Wrong Logo"
                      className="w-[14px] h-[14px]"
                    />
                  ) : (
                    <>
                      {selectedNetwork === 'base' ? (
                        <img
                          src="/chains/base.svg"
                          alt="Base Logo"
                          className="w-[14px] h-[14px]"
                        />
                      ) : selectedNetwork === 'arbitrum' ? (
                        <img
                          src="/chains/arb.svg"
                          alt="Arb Logo"
                          className="w-[14px] h-[14px]"
                        />
                      ) : (
                        <img
                          src="/chains/hype.svg"
                          alt="Hype Logo"
                          className="w-[14px] h-[14px]"
                        />
                      )}
                    </>
                  )}

                  <span className="text-label-sm text-text-primary font-medium">
                    {walletAddress}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-icon-subtle transition-transform ${isWalletPopoverOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </WalletPopover>
            )}

            <NotificationsPopover>
              <button className="relative p-5px w-[33px] h-[33px] flex items-center justify-center rounded-lg transition-opacity bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled">
                {NotificationIcon}
                {notificationCount > 0 && (
                  <div className="absolute top-1 right-1 px-3px py-2px h-3 w-[14px] rounded-full bg-icon-warn flex items-center justify-center">
                    <span className="text-(length:--font-size-body-3xs) font-normal text-text-inverse">
                      {notificationCount}
                    </span>
                  </div>
                )}
              </button>
            </NotificationsPopover>

            <SettingsPopover>
              <button className="p-5px w-[33px] h-[33px] hidden  lg:flex items-center justify-center rounded-lg transition-opacity bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled">
                <Settings className="w-4 h-4 text-icon-active" />
              </button>
            </SettingsPopover>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-btn-tertiary-active"
              onClick={() => {
                setIsDrawerOpen(true)
                onMenuClick?.()
              }}
            >
              <Menu className="w-4 h-4 text-icon-active" />
            </button>
          </div>
        </div>
      </nav>

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        pearVersion={pearVersion}
      />
    </>
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
      className="rounded-lg text-label-sm font-medium transition-all"
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
