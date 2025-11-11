import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold" style={{ color: '#fafafa' }}>
          Welcome to PEAR
        </h1>
        <p className="mt-4 text-lg" style={{ color: '#d4d4d4' }}>
          Your DeFi Trading Platform
        </p>
      </div>
    </div>
  )
}
