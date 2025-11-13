import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

interface CreateAccountModalProps {
  isOpen: boolean
  onClose: () => void
  engineType: 'hyperliquid' | 'symm'
}

type StepType = 'name' | 'terms' | 'create' | 'success'

export function CreateAccountModal({
  isOpen,
  onClose,
  engineType,
}: CreateAccountModalProps) {
  const [step, setStep] = useState<StepType>('name')
  const [accountName, setAccountName] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [createdAccountName, setCreatedAccountName] = useState('')

  if (!isOpen) return null

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value)
    setIsAvailable(false)
    
    if (e.target.value.length >= 3) {
      setIsChecking(true)
      // Simulate checking availability
      setTimeout(() => {
        setIsChecking(false)
        setIsAvailable(true)
      }, 1000)
    }
  }

  const handleConfirmName = () => {
    if (isAvailable) {
      setStep('terms')
    }
  }

  const handleAcceptTerms = () => {
    setStep('create')
  }

  const handleCreateAccount = () => {
    // Generate random account name
    const randomName = Math.random().toString(36).substring(2, 9).toUpperCase()
    setCreatedAccountName(randomName)
    setStep('success')
  }

  const handleStartTrading = () => {
    onClose()
    // Reset state
    setTimeout(() => {
      setStep('name')
      setAccountName('')
      setIsChecking(false)
      setIsAvailable(false)
      setAgreedToTerms(false)
      setCreatedAccountName('')
    }, 300)
  }

  const engineLabel = engineType === 'hyperliquid' ? 'Hyperliquid' : 'SYMM Intent'
  const engineColor = engineType === 'hyperliquid' ? '#2dd4bf' : '#fda4af'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-[400px] bg-bg-overlay border border-border-default rounded-lg pointer-events-auto mx-13px">
          <div className="p-13px space-y-13px">
            {/* Header */}
            <div className="flex items-center justify-between pb-5px border-b border-border-default">
              <h2 className="text-label-md font-semibold text-text-primary">
                Create Account
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5 text-icon-subtle" />
              </button>
            </div>

            {/* Engine Type */}
            <div className="pb-5px border-b border-border-default">
              <span
                className="text-label-sm font-medium"
                style={{ color: engineColor }}
              >
                {engineLabel}
              </span>
            </div>

            {step === 'name' && (
              <>
                {/* Connected Wallet */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Connected Wallet
                  </span>
                  <span className="text-label-sm text-text-primary font-medium">
                    0xd4e...b234C
                  </span>
                </div>

                {/* Account Name Input */}
                <div className="space-y-5px">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-text-tertiary">
                      Account Name
                    </span>
                    {isChecking ? (
                      <span className="text-label-sm text-text-warning">
                        Checking...
                      </span>
                    ) : isAvailable ? (
                      <span className="text-label-sm text-text-profit">
                        Available
                      </span>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    value={accountName}
                    onChange={handleNameChange}
                    placeholder="name"
                    className="w-full px-11px py-7px bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary placeholder:text-text-disabled outline-none focus:border-border-high transition-colors"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-7px">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-label-sm text-text-tertiary">
                    I confirm that I have read and I agree to the{' '}
                    <span className="text-brand-primary cursor-pointer hover:opacity-70">
                      Terms of Service
                    </span>
                  </span>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleConfirmName}
                  disabled={!isAvailable || !agreedToTerms}
                  className="w-full px-11px py-7px h-[40px] rounded-lg bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled text-text-button transition-colors"
                >
                  Confirm Account
                </Button>

                {/* Steps */}
                <div className="text-label-sm text-text-disabled text-center">
                  Confirm name &gt; Sign & Accept Terms.. &gt; Create Account
                </div>
              </>
            )}

            {step === 'terms' && (
              <>
                {/* Connected Wallet */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Connected Wallet
                  </span>
                  <span className="text-label-sm text-text-primary font-medium">
                    0xd4e...b234C
                  </span>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Account Name
                  </span>
                  <span className="text-label-sm text-text-profit">
                    Available
                  </span>
                </div>
                <input
                  type="text"
                  value={accountName}
                  readOnly
                  className="w-full px-11px py-7px bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary outline-none"
                />

                {/* Terms Checkbox */}
                <div className="flex items-start gap-7px">
                  <input type="checkbox" checked readOnly className="mt-1" />
                  <span className="text-label-sm text-text-tertiary">
                    I confirm that I have read and I agree to the{' '}
                    <span className="text-brand-primary">Terms of Service</span>
                  </span>
                </div>

                {/* Accept Terms Button */}
                <Button
                  onClick={handleAcceptTerms}
                  className="w-full px-11px py-7px h-[40px] rounded-lg bg-brand-secondary hover:bg-btn-secondary-hover text-text-button transition-colors"
                >
                  Sign & Accept Terms of Service
                </Button>

                {/* Steps */}
                <div className="text-label-sm text-text-disabled text-center">
                  Confirm name &gt; Sign & Accept Terms.. &gt; Create Account
                </div>
              </>
            )}

            {step === 'create' && (
              <>
                {/* Connected Wallet */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Connected Wallet
                  </span>
                  <span className="text-label-sm text-text-primary font-medium">
                    0xd4e...b234C
                  </span>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    Account Name
                  </span>
                  <span className="text-label-sm text-text-profit">
                    Available
                  </span>
                </div>
                <input
                  type="text"
                  value={accountName}
                  readOnly
                  className="w-full px-11px py-7px bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary outline-none"
                />

                {/* Terms Checkbox */}
                <div className="flex items-start gap-7px">
                  <input type="checkbox" checked readOnly className="mt-1" />
                  <span className="text-label-sm text-text-tertiary">
                    I confirm that I have read and I agree to the{' '}
                    <span className="text-brand-primary">Terms of Service</span>
                  </span>
                </div>

                {/* Create Account Button */}
                <Button
                  onClick={handleCreateAccount}
                  className="w-full px-11px py-7px h-[40px] rounded-lg bg-brand-secondary hover:bg-btn-secondary-hover text-text-button transition-colors"
                >
                  Create Account
                </Button>

                {/* Steps */}
                <div className="text-label-sm text-text-disabled text-center">
                  Confirm name &gt; Sign & Accept Terms.. &gt;{' '}
                  <span className="text-text-primary">Create Account</span>
                </div>
              </>
            )}

            {step === 'success' && (
              <>
                {/* New Account Created */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm text-text-tertiary">
                    New Account Created
                  </span>
                  <span className="text-label-md text-text-primary font-semibold">
                    {createdAccountName}
                  </span>
                </div>

                {/* Start Trading Button */}
                <Button
                  onClick={handleStartTrading}
                  className="w-full px-11px py-7px h-[40px] rounded-lg bg-brand-secondary hover:bg-btn-secondary-hover text-text-button transition-colors"
                >
                  Start Trading
                </Button>

                {/* Steps */}
                <div className="text-label-sm text-text-disabled text-center">
                  Confirm name &gt; Sign & Accept Terms.. &gt; Create Account
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

