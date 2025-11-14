import { useState } from 'react'
import { X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/svgIcons'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'
import { Tabs } from '@/components/ui/tabs'

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
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="480px">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between px-9px pt-9px pb-5px border-b border-border-default">
          <h2 className="text-label-md font-medium text-text-primary">
            Deposit
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
                  className={`flex w-full items-center p-4px h-[29px] gap-5px rounded-md transition-colors bg-btn-tertiary-active hover:bg-btn-tertiary-hover `}
                >
                  <span className="text-label-sm text-text-primary">
                    First Account
                  </span>
                  <CheckIcon checked={selectedAccount === 'first'} />
                </button>
                <button
                  onClick={() => setSelectedAccount('second')}
                  className={`flex w-full  items-center p-4px h-[29px] gap-5px rounded-md transition-colors 
                    bg-btn-tertiary-active hover:bg-btn-tertiary-hover `}
                >
                  <span className="text-label-sm text-text-primary">
                    Second Account
                  </span>
                  <CheckIcon checked={selectedAccount === 'second'} />
                </button>
                <button
                  onClick={() => setSelectedAccount('third')}
                  className={`flex w-full  items-center p-4px h-[29px] gap-5px rounded-md transition-colors 
                    bg-btn-tertiary-active hover:bg-btn-tertiary-hover `}
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
          <div className="space-y-5px">
            <div className="flex items-center justify-between">
              <h3 className="text-label-sm font-medium text-text-primary">
                Deposit Amount
              </h3>
              <div className="text-label-sm text-text-tertiary">
                Wallet Bal:{' '}
                <span className="text-text-inverse bg-btn-auxiliary-active rounded-md px-4px py-3px font-medium">
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
                className="w-full px-8px py-7px h-[46px] bg-input-base border border-border-default rounded-lg text-text-primary text-label-md focus:outline-none focus:border-border-high"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-button text-label-xs py-3px px-5px bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-md cursor-pointer font-medium hover:opacity-80 transition-opacity"
              >
                Max
              </button>
            </div>
          </div>

          {/* Deposit Button */}
          <Button
            onClick={handleDeposit}
            className="w-full px-11px py-5px h-[37px] rounded-lg bg-btn-primary-active hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse text-label-md font-medium transition-colors"
          >
            Deposit
          </Button>

          {/* Info Message (only for Hyperliquid) */}
          {selectedEngine === 'hyperliquid' && (
            <div className="flex gap-5px">
              <Info className="w-4 h-4 text-text-warning shrink-0 mt-0.5" />
              <p className="text-label-sm text-text-secondary">
                We recommend using a new address. This is to ensure that there
                are no position conflicts with any of your existing HyperCore
                positions.
              </p>
            </div>
          )}
        </div>
      </div>
    </BottomSheetModal>
  )
}
