import { X } from 'lucide-react'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface InvestmentsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock transaction data
const mockTransactions = [
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Huf Vault',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Agent Pear - Senior',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Hufs bet wa...',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Agent Pear - Junior',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Ytsejam',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Agent Pear - Senior',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Agent Pear - Junior',
  },
]

export function InvestmentsModal({ isOpen, onClose }: InvestmentsModalProps) {
  const isWalletConnected = true
  const hasTransactionHistory = mockTransactions.length > 0

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="1000px">
      <div className="flex flex-col md:h-[499px] ">
        <div className="relative shrink-0 ">
          <div
            className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-10"
            style={{
              background:
                'linear-gradient(180deg, #A2DB5C 0%, rgba(162, 219, 92, 0.00) 100%)',
              height: '100px',
            }}
          />

          <div className="flex items-start justify-between p-9px border-b border-border-default overflow-hidden">
            <h2 className="text-label-md font-semibold text-text-primary">
              My Investments
            </h2>

            <button
              onClick={onClose}
              className="p-1 w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <X className="w-5 h-5 text-icon-subtle" />
            </button>
          </div>

          {/* Total Investment */}
          <div className="px-9px pt-9px pb-9px flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-9px">
            <div className="flex items-center gap-5px">
              <span className="text-heading-h6 md:text-heading-h4 font-medium text-text-primary">
                $342,096.87
              </span>
              <img src="/tokens/usdc.svg" alt="USDC Logo" className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-13px">
              <div className="space-y-5px">
                <div className="text-text-tertiary text-label-sm">
                  Total PnL
                </div>
                <div className="font-semibold text-text-primary text-label-lg">
                  $42,096.87
                </div>
              </div>
              <div className="space-y-5px">
                <div className="text-text-tertiary text-label-sm">
                  Unrealized PnL
                </div>
                <div className="font-semibold text-text-primary text-label-lg">
                  $42,096.87
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="flex flex-col px-9px pb-9px flex-1 overflow-hidden">
          {isWalletConnected && hasTransactionHistory ? (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:flex lg:flex-col overflow-hidden flex-1">
                <div className="shrink-0 border-b border-border-default">
                  <div className="grid grid-cols-4 gap-4 pb-9px">
                    <div className="text-left text-label-sm font-medium text-text-tertiary">
                      Date
                    </div>
                    <div className="text-left text-label-sm font-medium text-text-tertiary">
                      Transfer
                    </div>
                    <div className="text-right text-label-sm font-medium text-text-tertiary">
                      Amount
                    </div>
                    <div className="text-right text-label-sm font-medium text-text-tertiary">
                      Vault
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden pt-9px bg-bg-overlay [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-bg-overlay [&::-webkit-scrollbar-thumb]:bg-border-default [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-text-disabled">
                  <div className="flex flex-col gap-3">
                    {mockTransactions.map((tx, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-4 hover:bg-bg-raised transition-colors py-1 px-1 -mx-1 rounded"
                      >
                        <div className="text-label-sm text-text-tertiary">
                          {tx.date}
                        </div>
                        <div className="text-label-sm text-text-secondary">
                          {tx.type}
                        </div>
                        <div className="text-right font-mono text-label-sm text-text-secondary">
                          {tx.amount}
                        </div>
                        <div className="text-right text-label-sm">
                          <span
                            className="truncate text-text-secondary"
                            style={
                              tx.vault.includes('Agent Pear')
                                ? {
                                    background:
                                      'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                  }
                                : { color: 'var(--text-secondary)' }
                            }
                          >
                            {tx.vault.includes('Agent Pear')
                              ? 'Agent Pear'
                              : tx.vault}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Table */}
              <div className="lg:hidden flex flex-col overflow-hidden flex-1">
                <div className="shrink-0 border-b border-border-default">
                  <div className="grid grid-cols-3 gap-4 pb-9px">
                    <div className="text-left text-label-sm font-medium text-text-tertiary">
                      Transfer
                    </div>
                    <div className="text-center text-label-sm font-medium text-text-tertiary">
                      Amount
                    </div>
                    <div className="text-right text-label-sm font-medium text-text-tertiary">
                      Vault
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden pt-9px bg-bg-overlay [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-bg-overlay [&::-webkit-scrollbar-thumb]:bg-border-default [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-text-disabled">
                  <div className="flex flex-col gap-3">
                    {mockTransactions.map((tx, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 hover:bg-bg-raised transition-colors py-1 px-1 -mx-1 rounded"
                      >
                        <div className="text-label-sm text-text-secondary">
                          {tx.type}
                        </div>
                        <div className="text-center font-mono text-label-sm text-text-secondary">
                          {tx.amount}
                        </div>
                        <div className="text-right text-label-sm">
                          <span
                            className="truncate text-text-secondary"
                            style={
                              tx.vault.includes('Agent Pear')
                                ? {
                                    background:
                                      'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                  }
                                : { color: 'var(--text-secondary)' }
                            }
                          >
                            {tx.vault.includes('Agent Pear')
                              ? 'Agent Pear'
                              : tx.vault}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full p-13px text-label-sm text-center text-text-secondary">
              No History Yet
            </div>
          )}
        </div>
      </div>
    </BottomSheetModal>
  )
}
