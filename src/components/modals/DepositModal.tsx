import { useState } from 'react'
import { X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/svgIcons'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
}

type EngineType = 'hyperliquid' | 'symm'
type AccountType = 'first' | 'second' | 'third' | null

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [selectedEngine, setSelectedEngine] = useState<EngineType>('symm')
  const [selectedAccount, setSelectedAccount] = useState<AccountType>('first')
  const [amount, setAmount] = useState('')
  const [walletBalance] = useState('10000.092')

  if (!isOpen) return null

  const handleMaxClick = () => {
    setAmount(walletBalance)
  }

  const handleDeposit = () => {
    // Handle deposit logic
    console.log('Deposit:', { selectedEngine, selectedAccount, amount })
    onClose()
  }

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="660px">
      <div className="p-13px space-y-13px">
            {/* Header */}
            <div className="flex items-center justify-between pb-5px border-b border-border-default">
              <h2 className="text-label-lg font-semibold text-text-primary">
                Deposit
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

            {/* Deposit Amount Section */}
            <div className="space-y-7px">
              <div className="flex items-center justify-between">
                <h3 className="text-label-sm font-medium text-text-primary">
                  Deposit Amount
                </h3>
                <div className="text-label-sm text-text-tertiary">
                  Wallet Bal:{' '}
                  <span className="text-brand-accent font-medium">
                    {walletBalance} USDC
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
            </div>

            {/* Deposit Button */}
            <Button
              onClick={handleDeposit}
              className="w-full px-11px py-5px h-[42px] rounded-lg bg-[#6b7c3f] hover:bg-[#7a8f47] text-text-inverse text-label-md font-medium transition-colors"
            >
              Deposit
            </Button>

            {/* Info Message (only for Hyperliquid) */}
            {selectedEngine === 'hyperliquid' && (
              <div className="flex gap-5px p-11px rounded-lg bg-bg-raised border border-border-subtle">
                <Info className="w-4 h-4 text-text-warning flex-shrink-0 mt-0.5" />
                <p className="text-label-sm text-text-secondary leading-relaxed">
                  We recommend using a new address. This is to ensure that there
                  are no position conflicts with any of your existing HyperCore
                  positions.
                </p>
              </div>
            )}
      </div>
    </BottomSheetModal>
  )
}

