import { useState } from 'react'
import { X, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/svgIcons'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  accounts: Array<{ id: string; name: string; balance: string }>
}

export function TransferModal({
  isOpen,
  onClose,
  accounts,
}: TransferModalProps) {
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || '')
  const [toAccount, setToAccount] = useState(accounts[1]?.id || '')
  const [amount, setAmount] = useState('')

  if (!isOpen) return null

  const fromAccountData = accounts.find((acc) => acc.id === fromAccount)
  const toAccountData = accounts.find((acc) => acc.id === toAccount)

  const handleMaxClick = () => {
    if (fromAccountData) {
      setAmount(fromAccountData.balance)
    }
  }

  const handleConfirmTransfer = () => {
    // Handle transfer logic
    onClose()
  }

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="660px">
      <div className="p-13px space-y-13px">
            {/* Header */}
            <div className="flex items-center justify-between pb-5px border-b border-border-default">
              <div className="flex items-center gap-7px">
                <ArrowRightLeft className="w-5 h-5 text-brand-primary" />
                <h2 className="text-label-lg font-semibold text-text-primary">
                  Transfer
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5 text-icon-subtle" />
              </button>
            </div>

            {/* From Section */}
            <div className="space-y-7px">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-semibold text-text-primary">
                  From
                </span>
                <div className="px-11px py-5px rounded-lg bg-brand-accent text-text-inverse">
                  <span className="text-label-sm font-medium">
                    Avb Bal: {fromAccountData?.balance || '0'} USDC
                  </span>
                </div>
              </div>

              <div className="flex gap-7px">
                {accounts.map((account) => (
                  <button
                    key={`from-${account.id}`}
                    onClick={() => setFromAccount(account.id)}
                    className="flex items-center gap-7px px-13px py-7px rounded-lg bg-btn-tertiary-active hover:bg-btn-tertiary-hover transition-colors"
                  >
                    <span className="text-label-sm text-text-primary">
                      {account.name}
                    </span>
                    <CheckIcon checked={fromAccount === account.id} />
                  </button>
                ))}
              </div>
            </div>

            {/* To Section */}
            <div className="space-y-7px">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-semibold text-text-primary">
                  To
                </span>
                <div className="px-11px py-5px rounded-lg bg-brand-accent text-text-inverse">
                  <span className="text-label-sm font-medium">
                    Avb Bal: {toAccountData?.balance || '0'} USDC
                  </span>
                </div>
              </div>

              <div className="flex gap-7px">
                {accounts.map((account) => (
                  <button
                    key={`to-${account.id}`}
                    onClick={() => setToAccount(account.id)}
                    disabled={account.id === fromAccount}
                    className="flex items-center gap-7px px-13px py-7px rounded-lg bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-label-sm text-text-primary">
                      {account.name}
                    </span>
                    <CheckIcon checked={toAccount === account.id} />
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Section */}
            <div className="space-y-7px">
              <span className="text-label-md font-semibold text-text-primary">
                Amount
              </span>

              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0 USDC"
                  className="w-full px-13px py-11px bg-input-base border border-border-default rounded-lg text-label-md text-text-primary placeholder:text-text-disabled outline-none focus:border-border-high transition-colors"
                />
                <button
                  onClick={handleMaxClick}
                  className="absolute right-13px top-1/2 -translate-y-1/2 px-7px py-3px rounded bg-brand-primary hover:opacity-80 transition-opacity"
                >
                  <span className="text-label-sm font-medium text-text-inverse">
                    Max
                  </span>
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-5px">
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-tertiary">
                  Allowed to transfer
                </span>
                <span className="text-label-md font-medium text-text-primary">
                  0.00 USDC
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-tertiary">
                  Available Margin
                </span>
                <span className="text-label-md font-medium text-text-primary">
                  0.00 USDC
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-tertiary">
                  Total Account Value
                </span>
                <span className="text-label-md font-medium text-text-primary">
                  0.00 USDC
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmTransfer}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full px-11px py-11px h-[48px] rounded-lg bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled text-text-button text-label-md font-semibold transition-colors"
            >
              Confirm Transfer
            </Button>
      </div>
    </BottomSheetModal>
  )
}

