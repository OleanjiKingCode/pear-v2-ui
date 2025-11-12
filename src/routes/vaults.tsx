import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CornersOut } from '@/components/ui/svgIcons'

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
        className="flex flex-col px-4 pt-13px gap-12px "
        style={{
          maxWidth: '1232px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-12px">
          <h1 className="text-heading-h4 font-medium text-text-primary">
            Vaults
          </h1>

          {/* Stats */}
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-12px">
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  Total Value Locked
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  $900,982,893.65
                </div>
              </div>
              <div className="space-y-4px">
                <div className="text-label-sm  text-text-tertiary">
                  Total PnL
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  $890,342,096.87
                </div>
              </div>
            </div>

            <div className="flex md:justify-end items-end">
              <Button className="bg-brand-primary rounded-lg text-label-sm px-11px py-5px text-text-inverse font-medium">
                Create Vault
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-10px">
          <div className="w-[819px]">
            <div className="flex gap-9px justify-between border-b border-border-default">
              <div className="flex items-center gap-9px ">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activeTab === 'all'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  <span className="text-label-sm "> All Vaults</span>
                  {activeTab === 'all' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('invested')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activeTab === 'invested'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  <span className="text-label-sm ">Invested Vaults</span>
                  {activeTab === 'invested' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              </div>

              <div className="relative flex items-center gap-2 w-[250px] ">
                <Search className="absolute left-7px top-1/2 -translate-y-1/2 w-5 h-5 text-icon-cta" />
                <input
                  type="text"
                  placeholder="Search Vaults"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ml-10 mr-14px py-0 px-0 outline-none transition-all text-label-sm bg-transparent text-text-primary"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-7px top-1/2 -translate-y-1/2 p-1 rounded transition-all duration-200 ${
                    searchQuery
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  } hover:opacity-70`}
                >
                  <X className="w-4 h-4 text-icon-subtle" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-separate border-spacing-x-0 border-spacing-y-5px">
                  <thead>
                    <tr>
                      <th className="text-left px-3px py-3 text-label-sm font-medium" />
                      <th className="text-left px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        Vault
                      </th>
                      <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        Leader
                      </th>
                      <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        TVL
                      </th>
                      <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        APR
                      </th>
                      <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        Age
                      </th>
                      <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        Investors
                      </th>
                      <th className="text-right px-3px text-text-tertiary py-3 text-label-sm font-medium">
                        Snapshot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVaults.map((vault) => (
                      <tr
                        key={vault.id}
                        className="hover:opacity-80 transition-opacity cursor-pointer bg-bg-raised"
                      >
                        <td className="p-5px h-12 rounded-l-lg pl-5px">
                          <img
                            src="/agentPearWithBg.svg"
                            alt="Pear Logo"
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="p-5px h-12">
                          <div className="flex items-center gap-3">
                            <div
                              className="font-medium text-label-md"
                              style={
                                vault.name === 'Agent Pear'
                                  ? {
                                      background:
                                        'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                      backgroundClip: 'text',
                                    }
                                  : { color: 'var(--text-primary)' }
                              }
                            >
                              {vault.name}
                            </div>
                            {vault.variant && (
                              <div className="text-label-md text-text-secondary">
                                - {vault.variant}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-5px h-12 text-label-md text-text-tertiary">
                          {vault.leader}
                        </td>
                        <td className="p-5px h-12 font-mono text-label-md text-text-primary">
                          {vault.tvl}
                        </td>
                        <td className="p-5px h-12 flex items-center justify-center">
                          <span className="px-5px py-3px rounded-md text-label-sm font-medium bg-state-long-default text-text-profit">
                            {vault.apr}
                          </span>
                        </td>
                        <td className="p-5px  h-12 text-label-md text-text-primary">
                          {vault.age}
                        </td>
                        <td className="p-5px h-12 flex items-center justify-center text-label-md text-text-primary">
                          {vault.investors}
                        </td>
                        <td className=" rounded-r-lg p-5px">
                          <MiniChart data={vault.chartData} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              {/* <div className="lg:hidden divide-y divide-border-default">
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
                          <span className="text-black text-body-sm font-bold">
                            P
                          </span>
                        </div>
                        <div>
                          <div
                            className="font-medium"
                            style={
                              vault.name === 'Agent Pear'
                                ? {
                                    background:
                                      'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                  }
                                : { color: 'var(--text-primary)' }
                            }
                          >
                            {vault.name}
                          </div>
                          {vault.variant && (
                            <div className="text-xs text-text-secondary">
                              - {vault.variant}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded text-body-xs font-medium bg-state-success text-text-primary">
                        {vault.apr}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-body-sm">
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
                        <span className="text-text-secondary">Investors: </span>
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
              </div> */}
            </div>
          </div>

          <div className="relative rounded-lg w-[361px] p-4 bg-bg-overlay overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-10"
              style={{
                background:
                  'linear-gradient(180deg, #A2DB5C 0%, rgba(162, 219, 92, 0.00) 100%)',
                height: '100px',
              }}
            />

            <div className="flex items-start justify-between">
              <h2 className="text-label-sm font-semibold text-text-primary">
                My Investments
              </h2>

              <button className="p-3px w-6 h-6 flex items-center justify-center bg-brand-secondary rounded-lg hover:opacity-80 transition-opacity">
                {CornersOut}
              </button>
            </div>

            {/* Total Investment */}
            <div className="mb-11px flex flex-col gap-6">
              <div className="flex items-center gap-5px">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <img src="/usdc.svg" alt="USDC Logo" className="w-5 h-5" />
                </div>
                <span className="text-heading-h6 font-medium text-text-primary">
                  $0.00
                </span>
              </div>

              <div className="w-full flex items-center justify-between gap-9px">
                <div className="space-y-4px w-full">
                  <div className="text-text-tertiary text-label-sm">
                    Total PnL
                  </div>
                  <div className="font-semibold text-text-primary text-label-md">
                    $0.00
                  </div>
                </div>
                <div className="space-y-4px w-full">
                  <div className="text-text-tertiary text-label-sm">
                    Unrealized PnL
                  </div>
                  <div className="font-semibold text-text-primary text-label-md">
                    $0.00
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full grid grid-cols-3 gap-4 text-label-sm font-medium pb-5px border-b border-border-default text-text-tertiary">
                <div>Transfer</div>
                <div>Amount</div>
                <div>Vault</div>
              </div>

              {/* No History State */}
              <div className="w-full p-13px text-label-sm text-center text-text-secondary">
                No History Yet
              </div>

              {/* <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {mockTransactions.map((tx, index) => (
                      <div 
                        key={index}
                        className="grid grid-cols-3 gap-4 text-body-sm py-2"
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
