import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, X, TrendingUp, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/vaults')({
  component: VaultsPage,
})

// Mock data for vaults
const mockVaults = [
  {
    id: 1,
    name: 'Agent Pear',
    variant: 'Junior',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.5, 0.8, 0.6, 0.9, 1.0, 0.85, 0.95],
  },
  {
    id: 2,
    name: 'Agent Pear',
    variant: 'Senior',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.3, 0.5, 0.7, 0.6, 0.8, 0.9, 1.0],
  },
  {
    id: 3,
    name: 'Huf Vault',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.4, 0.6, 0.5, 0.7, 0.9, 0.85, 0.95],
  },
  {
    id: 4,
    name: 'Simpson Hyper Treas...',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.6, 0.7, 0.8, 0.7, 0.9, 0.95, 1.0],
  },
  {
    id: 5,
    name: 'Huf Vault',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95],
  },
  {
    id: 6,
    name: 'Simpson Hyper Treas...',
    leader: '0xde46...43edc',
    tvl: '$540,887,893.65',
    apr: '10.98%',
    age: '3 Months',
    investors: 27,
    chartData: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  },
]

function VaultsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'invested'>('all')
  const [showMyInvestments, setShowMyInvestments] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h1 className="text-4xl font-semibold text-text-primary">
                    Vaults
                  </h1>

                  <button
                    onClick={() => setShowMyInvestments(!showMyInvestments)}
                    className="lg:hidden px-4 py-2 rounded-lg text-sm font-medium bg-bg-elevated text-brand-primary"
                  >
                    My Investments
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm mb-1 text-text-tertiary">
                      Total Value Locked
                    </div>
                    <div className="text-3xl font-semibold text-text-primary">
                      $900,982,893.65
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-1 text-text-tertiary">
                      Total PnL
                    </div>
                    <div className="text-3xl font-semibold text-text-primary">
                      $890,342,096.87
                    </div>
                  </div>
                  <div className="flex md:justify-end items-end">
                    <Button
                      size="lg"
                      className="bg-brand-primary text-text-inverse"
                    >
                      Create Vault
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search Vaults"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all bg-bg-elevated text-text-primary border border-border-default"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 mb-6 border-b border-border-default">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'pb-3 text-sm font-medium transition-all relative',
                    activeTab === 'all'
                      ? 'text-text-primary'
                      : 'text-text-secondary',
                  )}
                >
                  All Vaults
                  {activeTab === 'all' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('invested')}
                  className={cn(
                    'pb-3 text-sm font-medium transition-all relative',
                    activeTab === 'invested'
                      ? 'text-text-primary'
                      : 'text-text-secondary',
                  )}
                >
                  Invested Vaults
                  {activeTab === 'invested' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                  )}
                </button>
              </div>

              {/* Vaults Table */}
              <div
                className="rounded-lg overflow-hidden border"
                style={{
                  backgroundColor:
                    'var(--color-semantic color tokens-background-elevated)',
                  borderColor:
                    'var(--color-semantic color tokens-borders-default)',
                }}
              >
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        className="border-b"
                        style={{
                          borderColor:
                            'var(--color-semantic color tokens-borders-default)',
                        }}
                      >
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          Vault
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          Leader
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          TVL
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          APR
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          Age
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          Investors
                        </th>
                        <th
                          className="text-left px-6 py-4 text-sm font-medium"
                          style={{
                            color:
                              'var(--color-semantic color tokens-text-secondary)',
                          }}
                        >
                          Snapshot
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockVaults.map((vault) => (
                        <tr
                          key={vault.id}
                          className="border-b hover:opacity-80 transition-opacity cursor-pointer border-border-subtle"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                  background: 'var(--brand-gradient)',
                                }}
                              >
                                <span className="text-black text-xs font-bold">
                                  P
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-text-primary">
                                  {vault.name}
                                </div>
                                {vault.variant && (
                                  <div className="text-xs text-text-secondary">
                                    - {vault.variant}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-text-primary">
                            {vault.leader}
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-text-primary">
                            {vault.tvl}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded text-sm font-medium bg-state-success text-text-primary">
                              {vault.apr}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-text-primary">
                            {vault.age}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-primary">
                            {vault.investors}
                          </td>
                          <td className="px-6 py-4">
                            <MiniChart data={vault.chartData} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-border-default">
                  {mockVaults.map((vault) => (
                    <div key={vault.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              background: 'var(--brand-gradient)',
                            }}
                          >
                            <span className="text-black text-sm font-bold">
                              P
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-text-primary">
                              {vault.name}
                            </div>
                            {vault.variant && (
                              <div className="text-xs text-text-secondary">
                                - {vault.variant}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-state-success text-text-primary">
                          {vault.apr}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-text-secondary">Leader: </span>
                          <span className="font-mono text-text-primary">
                            {vault.leader}
                          </span>
                        </div>
                        <div>
                          <span className="text-text-secondary">TVL: </span>
                          <span className="font-mono text-text-primary">
                            {vault.tvl}
                          </span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Age: </span>
                          <span className="text-text-primary">{vault.age}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">
                            Investors:{' '}
                          </span>
                          <span className="text-text-primary">
                            {vault.investors}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <MiniChart data={vault.chartData} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - My Investments */}
            <div
              className={cn(
                'lg:block lg:w-[400px] xl:w-[450px]',
                showMyInvestments ? 'block' : 'hidden',
              )}
            >
              <div className="sticky top-8">
                <div className="rounded-lg border p-6 bg-bg-elevated border-border-default">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-text-primary">
                      My Investments
                    </h2>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded hover:opacity-80 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button
                        className="lg:hidden p-1.5 rounded hover:opacity-80 transition-opacity"
                        onClick={() => setShowMyInvestments(false)}
                      >
                        <X className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </div>

                  {/* Total Investment */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-brand-accent">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-2xl font-semibold text-text-primary">
                        $0.00
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-text-tertiary">Total PnL</div>
                        <div className="font-semibold text-text-primary">
                          $0.00
                        </div>
                      </div>
                      <div>
                        <div className="text-text-tertiary">Unrealized PnL</div>
                        <div className="font-semibold text-text-primary">
                          $0.00
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction History Header */}
                  <div className="grid grid-cols-3 gap-4 text-xs font-medium mb-3 text-text-tertiary">
                    <div>Transfer</div>
                    <div>Amount</div>
                    <div>Vault</div>
                  </div>

                  {/* No History State */}
                  <div className="py-12 text-center text-text-secondary">
                    No History Yet
                  </div>

                  {/* Transaction History (when available) */}
                  {/* <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {mockTransactions.map((tx, index) => (
                      <div 
                        key={index}
                        className="grid grid-cols-3 gap-4 text-sm py-2"
                      >
                        <div style={{ color: tx.type === 'Deposit' ? 'var(--color-semantic color tokens-text-profit)' : 'var(--color-semantic color tokens-text-primary)' }}>
                          {tx.type}
                        </div>
                        <div className="font-mono" style={{ color: 'var(--color-semantic color tokens-text-primary)' }}>
                          {tx.amount}
                        </div>
                        <div style={{ 
                          color: tx.vault === 'Agent Pear' ? 'var(--color-semantic color tokens-brand-primary)' : 'var(--color-semantic color tokens-text-primary)' 
                        }}>
                          {tx.vault}
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mini Chart Component
function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - (value / max) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width="80" height="30" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="#a2db5c"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
