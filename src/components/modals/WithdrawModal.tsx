import { useState } from 'react'
import { X, ChevronDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/svgIcons'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'
import { Tabs } from '@/components/ui/tabs'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

type EngineType = 'hyperliquid' | 'symm'
type NetworkType = 'arbitrum' | 'base' | 'hyperevm'
type AccountType = 'first' | 'second' | 'third' | null

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [selectedEngine, setSelectedEngine] =
    useState<EngineType>('hyperliquid')
  const [selectedNetwork, setSelectedNetwork] =
    useState<NetworkType>('arbitrum')
  const [selectedAccount, setSelectedAccount] = useState<AccountType>('first')
  const [amount, setAmount] = useState('')
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false)
  const [availBalance] = useState('10000.092')

  if (!isOpen) return null

  const handleMaxClick = () => {
    setAmount(availBalance)
  }

  const handleConfirm = () => {
    // Handle withdrawal logic
    console.log('Withdraw:', { selectedEngine, selectedNetwork, amount })
    onClose()
  }

  const handleRequestWithdrawal = () => {
    // Handle SYMM withdrawal request
    console.log('Request Withdrawal:', {
      selectedEngine,
      selectedAccount,
      selectedNetwork,
      amount,
    })
    onClose()
  }

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="480px">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between px-9px pt-9px pb-5px border-b border-border-default">
          <h2 className="text-label-md font-semibold text-text-primary">
            Withdraw Funds
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-5 h-5 text-icon-subtle" />
          </button>
        </div>
        <div className="p-9px space-y-7px">
          {/* Engine Type Tabs */}
          <Tabs
            options={[
              {
                value: 'hyperliquid',
                label: 'HYPERLIQUID',
                backgroundColor: 'var(--bg-hl)',
                textColor: 'var(--text-hl)',
              },
              {
                value: 'symm',
                label: 'SYMM',
                backgroundColor: 'var(--bg-symm)',
                textColor: 'var(--text-symm)',
              },
            ]}
            value={selectedEngine}
            onChange={(value) => setSelectedEngine(value as EngineType)}
          />

          {/* SYMM Account Selection */}
          {selectedEngine === 'symm' && (
            <div className="space-y-5px">
              <h3 className="text-label-sm font-medium text-text-primary pb-5px border-b border-border-default">
                Select Account
              </h3>
              <div className="flex gap-5px">
                <button
                  onClick={() => setSelectedAccount('first')}
                  className="flex w-full items-center p-4px h-[29px] gap-5px rounded-md transition-colors bg-btn-tertiary-active hover:bg-btn-tertiary-hover"
                >
                  <span className="text-label-sm text-text-primary">
                    First Account
                  </span>
                  <CheckIcon checked={selectedAccount === 'first'} />
                </button>
                <button
                  onClick={() => setSelectedAccount('second')}
                  className="flex w-full items-center p-4px h-[29px] gap-5px rounded-md transition-colors bg-btn-tertiary-active hover:bg-btn-tertiary-hover"
                >
                  <span className="text-label-sm text-text-primary">
                    Second Account
                  </span>
                  <CheckIcon checked={selectedAccount === 'second'} />
                </button>
                <button
                  onClick={() => setSelectedAccount('third')}
                  className="flex w-full items-center p-4px h-[29px] gap-5px rounded-md transition-colors bg-btn-tertiary-active hover:bg-btn-tertiary-hover"
                >
                  <span className="text-label-sm text-text-primary">
                    Third Account
                  </span>
                  <CheckIcon checked={selectedAccount === 'third'} />
                </button>
              </div>
            </div>
          )}

          {/* Network Selection (Hyperliquid only shows, SYMM shows too) */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                className="flex items-center gap-5px px-8px py-4px h-[29px] rounded-md bg-btn-tertiary-active hover:bg-btn-tertiary-hover transition-colors"
              >
                {selectedNetwork === 'arbitrum' && (
                  <>
                    <img
                      src="/chains/arb.svg"
                      alt="Arbitrum"
                      className="w-[14px] h-[14px]"
                    />
                    <span className="text-label-sm text-text-primary">
                      Arbitrum
                    </span>
                  </>
                )}
                {selectedNetwork === 'base' && (
                  <>
                    <img
                      src="/chains/base.svg"
                      alt="Base"
                      className="w-[14px] h-[14px]"
                    />
                    <span className="text-label-sm text-text-primary">
                      Base
                    </span>
                  </>
                )}
                {selectedNetwork === 'hyperevm' && (
                  <>
                    <img
                      src="/chains/hype.svg"
                      alt="HyperEVM"
                      className="w-[14px] h-[14px]"
                    />
                    <span className="text-label-sm text-text-primary">
                      HyperEVM
                    </span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-icon-subtle" />
              </button>

              {/* Network Dropdown */}
              {showNetworkDropdown && (
                <div className="absolute top-full mt-2 left-0 min-w-[200px] bg-bg-overlay border border-border-default rounded-md p-5px z-10 shadow-lg">
                  <button
                    onClick={() => {
                      setSelectedNetwork('arbitrum')
                      setShowNetworkDropdown(false)
                    }}
                    className="w-full flex items-center justify-between px-5px py-4px rounded-md hover:bg-btn-tertiary-hover transition-colors"
                  >
                    <div className="flex items-center gap-5px">
                      <img
                        src="/chains/arb.svg"
                        alt="Arbitrum"
                        className="w-[14px] h-[14px]"
                      />
                      <span className="text-label-sm text-text-primary">
                        Arbitrum
                      </span>
                    </div>
                    <CheckIcon checked={selectedNetwork === 'arbitrum'} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNetwork('base')
                      setShowNetworkDropdown(false)
                    }}
                    className="w-full flex items-center justify-between px-5px py-4px rounded-md hover:bg-btn-tertiary-hover transition-colors"
                  >
                    <div className="flex items-center gap-5px">
                      <img
                        src="/chains/base.svg"
                        alt="Base"
                        className="w-[14px] h-[14px]"
                      />
                      <span className="text-label-sm text-text-primary">
                        Base
                      </span>
                    </div>
                    <CheckIcon checked={selectedNetwork === 'base'} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNetwork('hyperevm')
                      setShowNetworkDropdown(false)
                    }}
                    className="w-full flex items-center justify-between px-5px py-4px rounded-md hover:bg-btn-tertiary-hover transition-colors"
                  >
                    <div className="flex items-center gap-5px">
                      <img
                        src="/chains/hype.svg"
                        alt="HyperEVM"
                        className="w-[14px] h-[14px]"
                      />
                      <span className="text-label-sm text-text-primary">
                        HyperEVM
                      </span>
                    </div>
                    <CheckIcon checked={selectedNetwork === 'hyperevm'} />
                  </button>
                </div>
              )}
            </div>

            <div className="text-label-sm text-text-tertiary">
              Avb Bal:{' '}
              <span className="text-text-inverse bg-btn-auxiliary-active rounded-md px-4px py-3px font-medium">
                {availBalance} USDC
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0 USDC"
              className="w-full px-8px py-7px h-[46px] bg-input-base border border-border-default rounded-lg text-text-primary text-label-md focus:outline-none focus:border-border-high"
            />
            <button
              onClick={handleMaxClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-button text-label-xs py-3px px-5px bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-md cursor-pointer font-medium hover:opacity-80 transition-opacity"
            >
              Max
            </button>
          </div>

          {/* Action Button */}
          {selectedEngine === 'hyperliquid' ? (
            <Button
              onClick={handleConfirm}
              className="w-full px-11px py-5px h-[37px] rounded-lg bg-btn-primary-active hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse text-label-md font-medium transition-colors"
            >
              Confirm
            </Button>
          ) : (
            <Button
              onClick={handleRequestWithdrawal}
              className="w-full px-11px py-5px h-[37px] rounded-lg bg-btn-primary-active hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse text-label-md font-medium transition-colors"
            >
              Request Withdrawal
            </Button>
          )}

          {/* Info Message */}
          <div className="flex gap-5px">
            <Info className="w-4 h-4 text-text-warning shrink-0 mt-0.5" />
            <p className="text-label-sm text-text-secondary">
              {selectedEngine === 'hyperliquid' ? (
                <>
                  USDC will be withdrawn over the{' '}
                  {selectedNetwork === 'arbitrum'
                    ? 'Arbitrum'
                    : selectedNetwork === 'base'
                      ? 'Base'
                      : 'HyperEVM'}{' '}
                  network to your address connected. A 1$ fee will be deducted
                  from the USDC withdrawn. Withdrawals should arrive within 5
                  minutes.
                </>
              ) : (
                <>
                  New withdrawals are subject to a 12-hour lockup period where
                  collateral is deallocated. You need to manually withdraw your
                  funds after the lockup period.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </BottomSheetModal>
  )
}
