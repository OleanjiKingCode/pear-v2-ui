import { X, AlertTriangle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  accountName: string
  engineType: 'hyperliquid' | 'symm'
  onConfirmDelete: () => void
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  accountName,
  engineType,
  onConfirmDelete,
}: DeleteAccountModalProps) {
  if (!isOpen) return null

  const engineLabel = engineType === 'hyperliquid' ? 'Hyperliquid' : 'SYMM Intent'
  const engineColor = engineType === 'hyperliquid' ? '#2dd4bf' : '#fda4af'

  const handleDelete = () => {
    onConfirmDelete()
    onClose()
  }

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="500px">
      <div className="p-13px space-y-13px">
            {/* Header */}
            <div className="flex items-center justify-between pb-5px border-b border-border-default">
              <div className="flex items-center gap-7px">
                <Trash2 className="w-5 h-5 text-icon-warn" />
                <h2 className="text-label-lg font-semibold text-text-primary">
                  Delete Account on {engineType === 'symm' ? 'SYMM' : 'Hyperliquid'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5 text-icon-subtle" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-13px">
              {/* Warning Icon */}
              <div className="flex justify-center pt-13px">
                <div className="w-16 h-16 rounded-full bg-state-warning flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-icon-warn" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-heading-h6 font-semibold text-text-primary text-center">
                Delete Account Confirmation
              </h3>

              {/* Description */}
              <p className="text-label-md text-text-secondary text-center">
                Are you sure you want to delete this account?
              </p>

              {/* Account Info */}
              <div className="space-y-7px p-11px rounded-lg bg-bg-raised border border-border-default">
                <div className="pb-5px border-b border-border-default">
                  <span
                    className="text-label-sm font-medium"
                    style={{ color: engineColor }}
                  >
                    {engineLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Account
                  </span>
                  <span className="text-label-md font-semibold text-text-primary">
                    {accountName}
                  </span>
                </div>
              </div>

              {/* Warning Message */}
              <div className="flex gap-7px p-11px rounded-lg bg-state-warning border border-border-warning">
                <AlertTriangle className="w-5 h-5 text-icon-warn flex-shrink-0 mt-1" />
                <p className="text-label-sm text-text-secondary">
                  Once this account is deleted, it will be hidden from your list
                  and cannot be undone.
                </p>
              </div>

              {/* Delete Button */}
              <Button
                onClick={handleDelete}
                className="w-full px-11px py-11px h-[48px] rounded-lg bg-state-error hover:opacity-80 text-text-inverse text-label-md font-semibold transition-opacity"
              >
                Delete Account
              </Button>
            </div>
      </div>
    </BottomSheetModal>
  )
}

