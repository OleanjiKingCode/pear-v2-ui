import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio')({
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <div className="relative">
      {/* Main Content */}
      <div
        className="page-container relative pt-[13px] pb-8"
        style={{
          maxHeight: '639px',
        }}
      >
        <div className="mx-auto">
          <h1 className="text-4xl font-semibold text-text-primary mb-6">
            Portfolio
          </h1>
          <p className="text-text-secondary">
            Your portfolio overview will be displayed here.
          </p>
        </div>
      </div>
    </div>
  )
}
