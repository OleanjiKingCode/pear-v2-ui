import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckIcon } from './ui/svgIcons'
import { Button } from './ui/button'
import {
  Copy,
  Power,
  AlertTriangle,
  Plus,
  ArrowRightLeft,
  X,
} from 'lucide-react'
import { CreateAccountModal } from './CreateAccountModal'
import { TransferModal } from './TransferModal'
import { DeleteAccountModal } from './DeleteAccountModal'
import { DepositModal } from './DepositModal'
import { WithdrawModal } from './WithdrawModal'

type WalletType = 'connected' | 'vault' | null
type NetworkType = 'hyperevm' | 'base' | 'abitrum' | null
type AccountType = 'first' | 'second' | null

interface WalletPopoverProps {
  children: React.ReactNode
  walletAddress: string
  hasWarning?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function WalletPopover({
  children,
  walletAddress,
  hasWarning = false,
  isOpen,
  onOpenChange,
}: WalletPopoverProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('connected')
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('base')
  const [selectedAccount, setSelectedAccount] = useState<AccountType>('first')
  const [availMargin] = useState('$32978.98')
  const [uPnL] = useState('$328.98')
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false)
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<{
    name: string
    type: 'first' | 'second'
  } | null>(null)

  const mockAccounts = [
    { id: 'first', name: 'First Account', balance: '10000.092' },
    { id: 'second', name: 'Second Account', balance: '10000.092' },
    { id: 'third', name: 'Third Account', balance: '10000.092' },
  ]

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  const handleOpenCreateAccount = () => {
    setIsCreateAccountOpen(true)
  }

  const handleOpenTransfer = () => {
    setIsTransferOpen(true)
  }

  const handleOpenDeleteAccount = (
    accountName: string,
    accountType: 'first' | 'second',
  ) => {
    setAccountToDelete({ name: accountName, type: accountType })
    setIsDeleteAccountOpen(true)
  }

  const handleConfirmDelete = () => {
    // Handle account deletion logic
    console.log('Deleting account:', accountToDelete)
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-5px bg-bg-overlay border border-border-default rounded-lg mt-1"
        style={{
          background: 'rgba(10, 10, 10, 0.90)',
        }}
        align="end"
      >
        <div className="space-y-5px">
          {/* Header */}
          <div className="flex items-center justify-between pb-5px border-b border-border-default">
            <span className="text-label-sm font-medium text-text-button">
              {walletAddress}
            </span>

            <div className="flex items-center gap-3px">
              <button
                onClick={handleCopyAddress}
                className="h-[33px] w-8 flex items-center justify-center    rounded-lg p-5px cursor-pointer bg-btn-tertiary-active hover:bg-btn-tertiary-hover"
              >
                <Copy className="w-3 h-3 text-icon-aux" />
              </button>
              <button className="h-[33px] rounded-lg flex items-center gap-3px p-5px cursor-pointer bg-btn-tertiary-active hover:bg-btn-tertiary-hover">
                <Power className="w-3 h-3 text-icon-warn" />
                <span className="text-label-sm font-medium text-text-warning">
                  Disconnect
                </span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5px w-full justify-between">
            <div className="space-y-3px rounded-lg p-5px bg-bg-raised w-full">
              <div className="text-label-sm font-medium text-text-disabled">
                Avl margin
              </div>
              <div className="text-label-sm font-medium text-text-primary">
                {availMargin}
              </div>
            </div>
            <div className="space-y-3px rounded-lg p-5px bg-bg-raised w-full">
              <div className="text-label-sm font-medium text-text-disabled">
                uPnL
              </div>
              <div
                className={`text-label-sm font-medium  ${uPnL.includes('-') ? 'text-text-loss' : 'text-text-profit'}`}
              >
                {uPnL}
              </div>
            </div>
          </div>

          {/* Hyperliquid Section */}

          <div className="space-y-5px rounded-lg p-5px bg-bg-raised w-full">
            <div className="text-label-sm font-medium  pb-5px border-b border-border-default">
              <span className="font-medium text-label-xs text-text-hl ">
                Hyperliquid
              </span>
            </div>

            <div className="space-y-5px">
              <button
                onClick={() => setSelectedWallet('connected')}
                className="w-full flex cursor-pointer items-center justify-between p-3px rounded-lg  transition-colors"
              >
                <span
                  className={`text-label-sm ${selectedWallet === 'connected' ? 'text-text-primary' : 'text-text-tertiary'}`}
                >
                  Connected wallet
                </span>
                <CheckIcon checked={selectedWallet === 'connected'} />
              </button>

              <button
                onClick={() => setSelectedWallet('vault')}
                className="w-full cursor-pointer  flex items-center justify-between p-3px rounded-lg transition-colors"
              >
                <span
                  className={`text-label-sm ${selectedWallet === 'vault' ? 'text-text-primary' : 'text-text-tertiary'}`}
                >
                  My vault wallet
                </span>
                <CheckIcon checked={selectedWallet === 'vault'} />
              </button>
            </div>
          </div>

          {/* SYMM Intent Section */}
          <div className="space-y-5px rounded-lg p-5px bg-bg-raised w-full">
            <div className="text-label-sm font-medium flex items-center justify-between pb-5px border-b border-border-default">
              <span className="font-medium text-label-xs text-text-symm ">
                SYMM Intent
              </span>
              <button
                onClick={handleOpenCreateAccount}
                className="flex items-center gap-3px text-label-sm text-brand-primary hover:opacity-70 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create Account
              </button>
            </div>

            <button
              onClick={() => setSelectedAccount('first')}
              className="w-full flex items-center justify-between p-3px rounded-lg hover:bg-bg-raised transition-colors"
            >
              <div className="flex items-center gap-5px">
                <span className="text-label-sm text-text-primary">
                  First Account
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenTransfer()
                  }}
                  className="p-1 hover:opacity-70 transition-opacity"
                >
                  <ArrowRightLeft className="w-3 h-3 text-icon-cta" />
                </button>
                {selectedAccount === 'first' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenDeleteAccount('ACCOUNT 01', 'first')
                    }}
                    className="p-1 hover:opacity-70 transition-opacity"
                  >
                    <X className="w-3 h-3 text-icon-warn" />
                  </button>
                )}
              </div>
              <CheckIcon checked={selectedAccount === 'first'} />
            </button>

            <button
              onClick={() => setSelectedAccount('second')}
              className="w-full flex items-center justify-between p-3px rounded-lg hover:bg-bg-raised transition-colors"
            >
              <div className="flex items-center gap-5px">
                <span className="text-label-sm text-text-primary">
                  Second Account
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenTransfer()
                  }}
                  className="p-1 hover:opacity-70 transition-opacity"
                >
                  <ArrowRightLeft className="w-3 h-3 text-icon-cta" />
                </button>
                {selectedAccount === 'second' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenDeleteAccount('ACCOUNT 02', 'second')
                    }}
                    className="p-1 hover:opacity-70 transition-opacity"
                  >
                    <X className="w-3 h-3 text-icon-warn" />
                  </button>
                )}
              </div>
              <CheckIcon checked={selectedAccount === 'second'} />
            </button>
          </div>

          {/* Select Network Section */}
          <div className="space-y-5px rounded-lg p-5px bg-bg-raised w-full">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-medium text-text-disabled">
                Select Network
              </span>
              {hasWarning && (
                <div className="flex items-center gap-3px text-label-sm text-state-warning">
                  <AlertTriangle className="w-3 h-3 text-icon-warn" />
                  <span>wrong network</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedNetwork('hyperevm')}
              className="w-full flex items-center justify-between p-3px rounded-lg hover:bg-bg-raised transition-colors"
            >
              <div className="flex items-center gap-5px">
                <img
                  src="/chains/hype.svg"
                  alt="HyperEVM Logo"
                  className="w-[14px] h-[14px]"
                />
                <span className="text-label-sm text-text-primary">
                  HyperEVM
                </span>
              </div>
              <CheckIcon checked={selectedNetwork === 'hyperevm'} />
            </button>

            <button
              onClick={() => setSelectedNetwork('base')}
              className="w-full flex items-center justify-between p-3px rounded-lg hover:bg-bg-raised transition-colors"
            >
              <div className="flex items-center gap-5px">
                <img
                  src="/chains/base.svg"
                  alt="Base Logo"
                  className="w-[14px] h-[14px]"
                />
                <span className="text-label-sm text-text-primary">
                  Base Mainnet
                </span>
              </div>
              <CheckIcon checked={selectedNetwork === 'base'} />
            </button>

            <button
              onClick={() => setSelectedNetwork('abitrum')}
              className="w-full flex items-center justify-between p-3px rounded-lg hover:bg-bg-raised transition-colors"
            >
              <div className="flex items-center gap-5px">
                <img
                  src="/chains/arb.svg"
                  alt="Arbitrum Logo"
                  className="w-[14px] h-[14px]"
                />
                <span className="text-label-sm text-text-primary">Abitrum</span>
              </div>
              <CheckIcon checked={selectedNetwork === 'abitrum'} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-7px">
            <Button
              onClick={() => setIsDepositOpen(true)}
              className="flex-1 px-11px py-5px h-[33px] text-label-sm! rounded-lg text-text-button border-border-default bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled transition-colors"
            >
              Deposit
            </Button>
            <Button
              onClick={() => setIsWithdrawOpen(true)}
              className="flex-1 px-11px py-5px h-[33px] rounded-lg text-label-sm! text-text-secondary border-border-default bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled transition-colors"
            >
              Withdraw
            </Button>
          </div>
        </div>
      </PopoverContent>

      {/* Modals */}
      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        engineType="symm"
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        accounts={mockAccounts}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
        accountName={accountToDelete?.name || ''}
        engineType="symm"
        onConfirmDelete={handleConfirmDelete}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </Popover>
  )
}
