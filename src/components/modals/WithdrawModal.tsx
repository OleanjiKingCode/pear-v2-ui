import { useState } from 'react'
import { X, ChevronDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/svgIcons'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

type EngineType = 'hyperliquid' | 'symm'
type NetworkType = 'arbitrum' | 'base' | 'hyperevm'
type AccountType = 'first' | 'second' | 'third' | null

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [selectedEngine, setSelectedEngine] = useState<EngineType>('hyperliquid')
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('arbitrum')
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
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="660px">
      <div className="p-13px space-y-13px">
            {/* Header */}
            <div className="flex items-center justify-between pb-5px border-b border-border-default">
              <h2 className="text-label-lg font-semibold text-text-primary">
                Withdraw Funds
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5 text-icon-subtle" />
              </button>
            </div>

            {/* Engine Type Tabs */}
            <div className="flex gap-5px">
              <button
                onClick={() => setSelectedEngine('hyperliquid')}
                className={`flex-1 px-11px py-5px h-[33px] rounded-lg text-label-sm font-medium transition-colors ${
                  selectedEngine === 'hyperliquid'
                    ? 'bg-brand-accent text-text-inverse'
                    : 'bg-btn-tertiary-active text-text-tertiary hover:bg-btn-tertiary-hover'
                }`}
              >
                HYPERLIQUID
              </button>
              <button
                onClick={() => setSelectedEngine('symm')}
                className={`flex-1 px-11px py-5px h-[33px] rounded-lg text-label-sm font-medium transition-colors ${
                  selectedEngine === 'symm'
                    ? 'bg-[#7f1d1d] text-text-inverse'
                    : 'bg-btn-tertiary-active text-text-tertiary hover:bg-btn-tertiary-hover'
                }`}
              >
                SYMM
              </button>
            </div>

            {/* SYMM Account Selection */}
            {selectedEngine === 'symm' && (
              <div className="space-y-7px">
                <h3 className="text-label-sm font-medium text-text-primary">
                  Select Account
                </h3>
                <div className="flex gap-7px">
                  <button
                    onClick={() => setSelectedAccount('first')}
                    className={`flex-1 flex items-center justify-between px-11px py-5px h-[33px] rounded-lg transition-colors ${
                      selectedAccount === 'first'
                        ? 'bg-btn-tertiary-hover border border-border-high'
                        : 'bg-btn-tertiary-active hover:bg-btn-tertiary-hover border border-transparent'
                    }`}
                  >
                    <span className="text-label-sm text-text-primary">
                      First Account
                    </span>
                    <CheckIcon checked={selectedAccount === 'first'} />
                  </button>
                  <button
                    onClick={() => setSelectedAccount('second')}
                    className={`flex-1 flex items-center justify-between px-11px py-5px h-[33px] rounded-lg transition-colors ${
                      selectedAccount === 'second'
                        ? 'bg-btn-tertiary-hover border border-border-high'
                        : 'bg-btn-tertiary-active hover:bg-btn-tertiary-hover border border-transparent'
                    }`}
                  >
                    <span className="text-label-sm text-text-primary">
                      Second Account
                    </span>
                    <CheckIcon checked={selectedAccount === 'second'} />
                  </button>
                  <button
                    onClick={() => setSelectedAccount('third')}
                    className={`flex-1 flex items-center justify-between px-11px py-5px h-[33px] rounded-lg transition-colors ${
                      selectedAccount === 'third'
                        ? 'bg-btn-tertiary-hover border border-border-high'
                        : 'bg-btn-tertiary-active hover:bg-btn-tertiary-hover border border-transparent'
                    }`}
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
                  className="flex items-center gap-5px px-11px py-5px h-[33px] rounded-lg bg-btn-tertiary-active hover:bg-btn-tertiary-hover transition-colors"
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
                  <div className="absolute top-full mt-2 left-0 min-w-[200px] bg-bg-overlay border border-border-default rounded-lg p-5px z-10">
                    <button
                      onClick={() => {
                        setSelectedNetwork('arbitrum')
                        setShowNetworkDropdown(false)
                      }}
                      className="w-full flex items-center justify-between p-5px rounded-lg hover:bg-btn-tertiary-hover transition-colors"
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
                      className="w-full flex items-center justify-between p-5px rounded-lg hover:bg-btn-tertiary-hover transition-colors"
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
                      className="w-full flex items-center justify-between p-5px rounded-lg hover:bg-btn-tertiary-hover transition-colors"
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
                <span className="text-brand-accent font-medium">
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
                className="w-full px-11px py-5px h-[42px] bg-bg-raised border border-border-default rounded-lg text-text-primary text-label-md focus:outline-none focus:border-border-high"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-accent text-label-sm font-medium hover:opacity-80 transition-opacity"
              >
                Max
              </button>
            </div>

            {/* Action Button */}
            {selectedEngine === 'hyperliquid' ? (
              <Button
                onClick={handleConfirm}
                className="w-full px-11px py-5px h-[42px] rounded-lg bg-[#6b7c3f] hover:bg-[#7a8f47] text-text-inverse text-label-md font-medium transition-colors"
              >
                Confirm
              </Button>
            ) : (
              <Button
                onClick={handleRequestWithdrawal}
                className="w-full px-11px py-5px h-[42px] rounded-lg bg-[#6b7c3f] hover:bg-[#7a8f47] text-text-inverse text-label-md font-medium transition-colors"
              >
                Request Withdrawal
              </Button>
            )}

            {/* Info Message */}
            <div className="flex gap-5px p-11px rounded-lg bg-bg-raised border border-border-subtle">
              <Info className="w-4 h-4 text-text-warning flex-shrink-0 mt-0.5" />
              <p className="text-label-sm text-text-secondary leading-relaxed">
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
    </BottomSheetModal>
  )
}

