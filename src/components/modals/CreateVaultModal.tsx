import { useState } from 'react'
import { X, Upload, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BottomSheetModal } from '@/components/ui/bottom-sheet-modal'

interface CreateVaultModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateVaultModal({ isOpen, onClose }: CreateVaultModalProps) {
  const [vaultName, setVaultName] = useState('')
  const [vaultDescription, setVaultDescription] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [vaultImage, setVaultImage] = useState<string | null>(null)
  const [walletBalance] = useState('10000.092')

  const maxNameLength = 32

  if (!isOpen) return null

  const handleMaxName = () => {
    // This would set to max character length
    setVaultName('A'.repeat(maxNameLength))
  }

  const handleMaxDeposit = () => {
    setDepositAmount(walletBalance)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVaultImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setVaultImage(null)
  }

  const handleCreateVault = () => {
    // Handle vault creation logic
    console.log('Create vault:', {
      vaultName,
      vaultDescription,
      depositAmount,
      vaultImage,
    })
    onClose()
  }

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-9px pt-9px pb-5px border-b border-border-default shrink-0">
          <h2 className="text-text-md font-medium text-text-primary">
            Create Your Vault
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-5 h-5 text-icon-subtle" />
          </button>
        </div>

        <div className="flex-1  p-4 space-y-4">
          <div className=" space-y-7px">
            {/* Upload vault image */}
            <div className="space-y-5px">
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-secondary">
                  Upload vault image
                </span>
                <span className="text-label-sm text-text-disabled">
                  64px x 64px png/jpg image
                </span>
              </div>

              <div className="flex items-center gap-9px justify-between">
                {/* Image Preview/Upload Area */}
                <label className="w-12 h-12 rounded-2xl bg-btn-secondary-disabled flex items-center justify-center cursor-pointer transition-colors">
                  {vaultImage ? (
                    <img
                      src={vaultImage}
                      alt="Vault"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <svg
                      className="w-3 h-3 text-icon-subtle"
                      fill="none"
                      stroke="#FAFAF9"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-5px">
                  {/* Upload Button */}
                  <button
                    onClick={() => {
                      const input = document.querySelector(
                        'input[type="file"]',
                      ) as HTMLInputElement
                      input?.click()
                    }}
                    className="p-5px w-8 h-8 flex items-center justify-center bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-lg transition-colors"
                  >
                    <Upload className="w-3 h-3 text-brand-primary" />
                  </button>

                  {/* Remove Button */}
                  {/* {vaultImage && ( */}
                  <button
                    onClick={handleRemoveImage}
                    className="p-5px w-8 h-8 flex items-center justify-center bg-state-warning hover:bg-state-warning-hover rounded-lg transition-colors"
                  >
                    <X className="w-3 h-3 text-icon-warn" />
                  </button>
                  {/* )} */}
                </div>
              </div>
            </div>

            {/* Enter vault name */}
            <div className="space-y-5px">
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-primary">
                  Enter vault name
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={vaultName}
                  onChange={(e) =>
                    setVaultName(e.target.value.slice(0, maxNameLength))
                  }
                  placeholder="INPUT"
                  maxLength={maxNameLength}
                  className="w-full px-7px py-6px bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary placeholder:text-text-disabled outline-none focus:border-border-high transition-colors"
                />

                <button
                  onClick={handleMaxName}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-button text-label-xs py-3px px-5px bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-md cursor-pointer font-medium hover:opacity-80 transition-opacity"
                >
                  Max
                </button>
              </div>
            </div>

            {/* About Vault */}
            <div className="space-y-5px">
              <span className="text-label-sm text-text-primary">
                About Vault
              </span>
              <textarea
                value={vaultDescription}
                onChange={(e) => setVaultDescription(e.target.value)}
                placeholder="Describe your trading strategies, etc..."
                rows={5}
                className="w-full p-7px bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary placeholder:text-text-disabled outline-none focus:border-border-high transition-colors resize-none"
              />
            </div>

            {/* Deposit Amount */}
            <div className="space-y-5px">
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-primary">
                  Deposit Amount
                </span>
                <div className="text-label-sm text-text-tertiary">
                  Avb Bal:{' '}
                  <span className="text-text-inverse text-label-xs bg-btn-auxiliary-active rounded-md px-4px py-3px font-medium">
                    {walletBalance} USDC
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00 USDC"
                  className="w-full px-7px py-6px bg-input-base border border-border-default rounded-lg text-label-md text-text-primary placeholder:text-text-disabled outline-none focus:border-border-high transition-colors"
                />

                <button
                  onClick={handleMaxDeposit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-button text-label-xs py-3px px-5px bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-md cursor-pointer font-medium hover:opacity-80 transition-opacity"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Warning Message */}
            <div className="flex gap-5px">
              <Info className="w-3 h-3 text-text-warning shrink-0" />
              <p className="text-label-sm text-text-tertiary">
                A minimum deposit of 100 USDC is required. Leaders must maintain
                at least a 5% contribution to the vault in order to withdraw.
              </p>
            </div>
          </div>

          <div className=" space-y-5px">
            {/* Create Vault Button */}
            <Button
              onClick={handleCreateVault}
              disabled={
                !vaultName || !depositAmount || parseFloat(depositAmount) < 100
              }
              className="w-full px-11px py-9px h-[46px] rounded-lg bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse text-label-md font-medium transition-colors"
            >
              Create Vault
            </Button>

            {/* Immutability Warning */}
            <div className="flex gap-5px bg-state-warning-hover rounded-lg p-5px ">
              <Info className="w-3 h-3 text-text-warning shrink-0 mt-0.5" />
              <p className="text-label-sm text-text-warning">
                Name, Image & Vault description cannot be changed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BottomSheetModal>
  )
}
