import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/earn')({
  component: EarnPage,
})

function EarnPage() {
  return (
    <div className="relative">
      {/* Gradient Background */}
      <div
        className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-10"
        style={{
          background:
            'linear-gradient(180deg, #A2DB5C 0%, rgba(10, 10, 10, 0.00) 100%)',
          height: '250px',
        }}
      />

      {/* Main Content */}
      <div
        className="relative px-4 lg:px-8 pt-[13px] pb-8"
        style={{
          maxWidth: '1232px',
          maxHeight: '639px',
          margin: '0 auto',
        }}
      >
        <div className="mx-auto">
          <h1 className="text-4xl font-semibold text-text-primary mb-6">
            Earn
          </h1>
          <p className="text-text-secondary">
            Earning opportunities and rewards will be displayed here.
          </p>
        </div>
      </div>
    </div>
  )
}
