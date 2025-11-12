import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
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
          margin: '0 auto',
        }}
      >
        <div className="mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
          <h1 
            className="text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome to PEAR
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl">
            Your next-generation DeFi trading platform powered by AI agents and smart vaults
          </p>
          <div className="flex gap-4">
            <Link to="/vaults">
              <Button size="lg" className="bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled text-text-inverse transition-colors">
                Explore Vaults
              </Button>
            </Link>
            <Link to="/trade">
              <Button 
                size="lg" 
                variant="outline"
                className="border-border-default bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled text-brand-primary transition-colors"
              >
                Start Trading
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
