import { useState } from 'react'
import {
  createFileRoute,
  useNavigate,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CornersOut, SearchIcon } from '@/components/ui/svgIcons'
import { CreateVaultModal } from '@/components/modals/CreateVaultModal'
import { InvestmentsModal } from '@/components/modals/InvestmentsModal'

// Mock transaction data for investments
const mockTransactions = [
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
    vault: 'Agent Pear - Senior',
  },
  {
    date: '02-03-2025',
    type: 'Deposit',
    amount: '$78,730.23',
    vault: 'Huf Vault',
  },
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
    vault: 'Agent Pear - Junior',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Agent Pear - Junior',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Hufs right',
  },
  {
    date: '02-03-2025',
    type: 'Withdraw',
    amount: '$78,730.23',
    vault: 'Hufs right',
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
]

// Mock invested vaults (vaults where user has investments)
const investedVaultIds = [1, 2, 5]

// Mock investment data for invested vaults
const investmentData: Record<
  number,
  { myInvestment: string; duration: string; pnl: string; pnlPositive: boolean }
> = {
  1: {
    myInvestment: '$87,893.65',
    duration: '22 Days',
    pnl: '$5094.27',
    pnlPositive: true,
  },
  2: {
    myInvestment: '$87,893.65',
    duration: '22 Days',
    pnl: '$5094.27',
    pnlPositive: true,
  },
  5: {
    myInvestment: '$87,893.65',
    duration: '22 Days',
    pnl: '$5094.27',
    pnlPositive: false,
  },
}

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
    chartData: [1.0, 0.9, 0.85, 0.7, 0.6, 0.5, 0.4],
  },
]

function VaultsPage() {
  const navigate = useNavigate()
  const matches = useMatches()
  const [activeTab, setActiveTab] = useState<'all' | 'invested'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isInvestmentsDrawerOpen, setIsInvestmentsDrawerOpen] = useState(false)
  const [isInvestmentsModalOpen, setIsInvestmentsModalOpen] = useState(false)
  const [isCreateVaultModalOpen, setIsCreateVaultModalOpen] = useState(false)

  // Mock wallet connection state - set to true to show transactions
  const isWalletConnected = true
  const hasTransactionHistory = mockTransactions.length > 0

  // Filter vaults based on active tab
  const filteredVaults = mockVaults.filter((vault) => {
    if (activeTab === 'invested') {
      return investedVaultIds.includes(vault.id)
    }
    return true
  })

  // Check if we're on a child route (vault detail page)
  const isChildRoute = matches.some(
    (match) => match.routeId === '/vaults/$vaultId',
  )

  // If on child route, just render the outlet
  if (isChildRoute) {
    return <Outlet />
  }

  return (
    <div className="relative">
      {/* Main Content */}

      <div className="page-container flex flex-col pt-13px gap-12px">
        {/* Header */}
        <div className="flex flex-col gap-12px">
          <div className="flex items-end justify-between">
            <h1 className="text-heading-h4 font-medium text-text-primary">
              Vaults
            </h1>
            <button
              onClick={() => setIsInvestmentsModalOpen(true)}
              className="lg:hidden bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled text-brand-primary rounded-lg text-label-sm px-11px py-5px font-medium transition-colors"
            >
              My Investments
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-9px lg:gap-11px">
            <div className="flex flex-col lg:flex-row lg:items-center max-lg:space-y-9px lg:space-x-12px">
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

            <div className="flex flex-col gap-7px items-end justify-between lg:justify-end">
              <Button
                onClick={() => setIsCreateVaultModalOpen(true)}
                className="w-full lg:w-fit bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled rounded-lg text-label-sm px-11px py-5px text-text-inverse font-medium flex-1 lg:flex-none transition-colors"
              >
                Create Vault
              </Button>

              <div className="hidden relative max-lg:flex items-center gap-2 bg-input-dark rounded-lg w-full lg:w-[250px] p-7px">
                <SearchIcon
                  isConnected={isWalletConnected}
                  className="absolute left-7px top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search Vaults"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ml-10 mr-14px py-0 px-0 outline-none transition-all text-label-sm bg-transparent text-text-primary placeholder:text-text-disabled"
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10px">
          <div className="w-full lg:flex-1">
            <div className="flex gap-9px justify-between border-b border-border-default w-full">
              <div className="flex items-center gap-9px w-full ">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'text-label-sm w-full lg:w-fit cursor-pointer  font-medium transition-all relative px-0 py-7px',
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
                    'text-label-sm  w-full lg:w-fit cursor-pointer font-medium transition-all relative px-0 py-7px',
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

              <div className="hidden relative lg:flex items-center gap-2 w-full lg:w-[250px] ">
                <SearchIcon
                  isConnected={isWalletConnected}
                  className="absolute left-7px top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search Vaults"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ml-10 mr-14px py-0 px-0 outline-none transition-all text-label-sm bg-transparent text-text-primary placeholder:text-text-disabled"
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
                {activeTab === 'all' ? (
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
                      {filteredVaults.map((vault) => (
                        <tr
                          key={vault.id}
                          onClick={() =>
                            navigate({
                              to: '/vaults/$vaultId',
                              params: { vaultId: vault.id.toString() },
                            })
                          }
                          className="cursor-pointer bg-bg-raised transition-transform duration-200 hover:scale-[1.01] origin-center"
                          style={{ transformOrigin: 'center' }}
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
                          <td className="p-5px h-12 text-label-md text-text-tertiary text-center">
                            {vault.leader}
                          </td>
                          <td className="p-5px h-12 font-mono text-label-md text-text-primary  text-center">
                            {vault.tvl}
                          </td>
                          <td className="p-5px h-12 flex items-center justify-center">
                            <span className="px-5px py-3px rounded-md text-label-sm font-medium bg-state-long-default text-text-profit">
                              {vault.apr}
                            </span>
                          </td>
                          <td className="p-5px  h-12 text-label-md text-text-primary text-center">
                            {vault.age}
                          </td>
                          <td className="p-5px h-12 flex items-center justify-center text-label-md text-text-primary">
                            {vault.investors}
                          </td>
                          <td className="rounded-r-lg p-5px">
                            <div className="flex items-center justify-center">
                              <MiniChart data={vault.chartData} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
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
                          Vault TVL
                        </th>
                        <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                          My Investment
                        </th>
                        <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                          Inv. Duration
                        </th>
                        <th className="text-center px-3px text-text-tertiary py-3 text-label-sm font-medium">
                          PnL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVaults.map((vault) => {
                        const investment = investmentData[vault.id]
                        return (
                          <tr
                            key={vault.id}
                            onClick={() =>
                              navigate({
                                to: '/vaults/$vaultId',
                                params: { vaultId: vault.id.toString() },
                              })
                            }
                            className="cursor-pointer bg-bg-raised transition-transform duration-200 hover:scale-[1.01] origin-center"
                            style={{ transformOrigin: 'center' }}
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
                            <td className="p-5px h-12 text-center text-label-md text-text-tertiary">
                              {vault.leader}
                            </td>
                            <td className="p-5px h-12 text-center font-mono text-label-md text-text-primary">
                              {vault.tvl}
                            </td>
                            <td className="p-5px h-12 text-center font-mono text-label-md text-text-primary">
                              {investment.myInvestment}
                            </td>
                            <td className="p-5px h-12 text-center text-label-md text-text-primary">
                              {investment.duration}
                            </td>
                            <td
                              className={`rounded-r-lg p-5px h-12 text-center font-mono text-label-md ${
                                investment.pnlPositive
                                  ? 'text-text-profit'
                                  : 'text-text-loss'
                              }`}
                            >
                              {investment.pnl}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden flex flex-col gap-10px mt-10px">
                {filteredVaults.map((vault) => {
                  const investment =
                    activeTab === 'invested' ? investmentData[vault.id] : null
                  return (
                    <div
                      key={vault.id}
                      onClick={() =>
                        navigate({
                          to: '/vaults/$vaultId',
                          params: { vaultId: vault.id.toString() },
                        })
                      }
                      className="bg-bg-raised rounded-lg p-10px cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="flex items-center justify-between mb-7px">
                        {activeTab === 'invested' && (
                          <div className="text-label-sm text-text-tertiary">
                            Vault
                          </div>
                        )}
                        <div className="flex items-center gap-5px">
                          <img
                            src="/agentPearWithBg.svg"
                            alt="Pear Logo"
                            className="w-5 h-5"
                          />
                          <div className="flex items-center gap-5px">
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
                              <div className="text-label-sm text-text-secondary">
                                - {vault.variant}
                              </div>
                            )}
                          </div>
                        </div>
                        {activeTab === 'all' && (
                          <div className="flex items-center justify-center">
                            <MiniChart data={vault.chartData} />
                          </div>
                        )}
                      </div>

                      {activeTab === 'all' ? (
                        <>
                          <div className="flex flex-col gap-7px">
                            <div className="flex items-center justify-between">
                              <div className="text-label-sm text-text-tertiary">
                                Leader
                              </div>
                              <div className="text-label-md text-text-primary">
                                {vault.leader}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-label-sm text-text-tertiary">
                                TVL
                              </div>
                              <div className="text-label-md font-mono text-text-primary">
                                {vault.tvl}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-label-sm text-text-tertiary">
                                APR
                              </div>
                              <span className="px-5px py-3px rounded-md text-label-sm font-medium bg-state-long-default text-text-profit">
                                {vault.apr}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-label-sm text-text-tertiary">
                                Age
                              </div>
                              <div className="text-label-md text-text-primary">
                                {vault.age}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-label-sm text-text-tertiary">
                                Investors
                              </div>
                              <div className="text-label-md text-text-primary">
                                {vault.investors}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : investment ? (
                        <div className="flex flex-col gap-7px">
                          <div className="flex items-center justify-between">
                            <div className="text-label-sm text-text-tertiary">
                              Leader
                            </div>
                            <div className="text-label-md text-text-primary">
                              {vault.leader}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-label-sm text-text-tertiary">
                              Vault TVL
                            </div>
                            <div className="text-label-md font-mono text-text-primary">
                              {vault.tvl}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-label-sm text-text-tertiary">
                              My Investment
                            </div>
                            <div className="text-label-md font-mono text-text-primary">
                              {investment.myInvestment}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-label-sm text-text-tertiary">
                              Inv. Duration
                            </div>
                            <div className="text-label-md text-text-primary">
                              {investment.duration}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-label-sm text-text-tertiary">
                              PnL
                            </div>
                            <div
                              className={`text-label-md text-text-primary ${
                                investment.pnlPositive
                                  ? 'text-text-profit'
                                  : 'text-text-loss'
                              }`}
                            >
                              {investment.pnl}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Desktop My Investments Panel */}
          <div className="hidden lg:block relative rounded-lg w-[361px] p-4 bg-bg-overlay overflow-hidden">
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

              <button
                onClick={() => setIsInvestmentsModalOpen(true)}
                className="p-3px w-6 h-6 flex items-center justify-center bg-brand-secondary hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled rounded-lg transition-colors"
              >
                <CornersOut isConnected={isWalletConnected} />
              </button>
            </div>

            {/* Total Investment */}
            <div className="mb-11px flex flex-col gap-6">
              <div className="flex items-center gap-5px">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <img
                    src="/tokens/usdc.svg"
                    alt="USDC Logo"
                    className="w-5 h-5"
                  />
                </div>
                <span className="text-heading-h6 font-medium text-text-primary">
                  $342,096.87
                </span>
              </div>

              <div className="w-full flex items-center justify-between gap-9px">
                <div className="space-y-4px w-full">
                  <div className="text-text-tertiary text-label-sm">
                    Total PnL
                  </div>
                  <div className="font-semibold text-text-primary text-label-md">
                    $42,096.87
                  </div>
                </div>
                <div className="space-y-4px w-full">
                  <div className="text-text-tertiary text-label-sm">
                    Unrealized PnL
                  </div>
                  <div className="font-semibold text-text-primary text-label-md">
                    $42,096.87
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

              {isWalletConnected && hasTransactionHistory ? (
                <div className="flex flex-col space-y-3 w-full">
                  <div className="w-full flex flex-col gap-3 overflow-y-auto">
                    {mockTransactions.map((tx, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 text-label-sm"
                      >
                        <div className={'text-text-primary'}>{tx.type}</div>
                        <div className="font-mono text-text-primary">
                          {tx.amount}
                        </div>
                        <div
                          className="text-text-primary truncate"
                          style={
                            tx.vault.includes('Agent Pear')
                              ? {
                                  background:
                                    'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                }
                              : undefined
                          }
                        >
                          {tx.vault.includes('Agent Pear')
                            ? 'Agent Pear'
                            : tx.vault}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsInvestmentsModalOpen(true)}
                    className="w-full text-left text-label-sm text-brand-primary hover:opacity-80 transition-opacity"
                  >
                    <span>See All</span>
                  </button>
                </div>
              ) : (
                <div className="w-full p-13px text-label-sm text-center text-text-secondary">
                  No History Yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile My Investments Drawer */}
      {isInvestmentsDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsInvestmentsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden pointer-events-none">
            <div className="w-full bg-bg-overlay rounded-t-2xl pointer-events-auto max-h-[85vh] overflow-y-auto">
              <div className="relative p-13px">
                <div
                  className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-10"
                  style={{
                    background:
                      'linear-gradient(180deg, #A2DB5C 0%, rgba(162, 219, 92, 0.00) 100%)',
                    height: '100px',
                  }}
                />

                <div className="flex items-start justify-between mb-13px">
                  <h2 className="text-label-md font-semibold text-text-primary">
                    My Investments
                  </h2>

                  <button
                    onClick={() => setIsInvestmentsDrawerOpen(false)}
                    className="p-3px w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <X className="w-5 h-5 text-icon-subtle" />
                  </button>
                </div>

                {/* Total Investment */}
                <div className="mb-13px flex flex-col gap-11px">
                  <div className="flex items-center gap-5px">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      <img
                        src="/tokens/usdc.svg"
                        alt="USDC Logo"
                        className="w-5 h-5"
                      />
                    </div>
                    <span className="text-heading-h6 font-medium text-text-primary">
                      $342,096.87
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-between gap-9px">
                    <div className="space-y-4px w-full">
                      <div className="text-text-tertiary text-label-sm">
                        Total PnL
                      </div>
                      <div className="font-semibold text-text-primary text-label-md">
                        $42,096.87
                      </div>
                    </div>
                    <div className="space-y-4px w-full">
                      <div className="text-text-tertiary text-label-sm">
                        Unrealized PnL
                      </div>
                      <div className="font-semibold text-text-primary text-label-md">
                        $42,096.87
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full grid grid-cols-3 gap-4 text-label-sm font-medium pb-7px border-b border-border-default text-text-tertiary">
                    <div>Transfer</div>
                    <div>Amount</div>
                    <div>Vault</div>
                  </div>

                  {isWalletConnected && hasTransactionHistory ? (
                    <>
                      {/* Transaction History */}
                      <div className="w-full space-y-7px">
                        {mockTransactions.map((tx, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 gap-4 text-label-sm py-5px"
                          >
                            <div
                              className={
                                tx.type === 'Deposit'
                                  ? 'text-text-profit'
                                  : 'text-text-primary'
                              }
                            >
                              {tx.type}
                            </div>
                            <div className="font-mono text-text-primary">
                              {tx.amount}
                            </div>
                            <div
                              className="text-text-primary truncate"
                              style={
                                tx.vault.includes('Agent Pear')
                                  ? {
                                      background:
                                        'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                      backgroundClip: 'text',
                                    }
                                  : undefined
                              }
                            >
                              {tx.vault.includes('Agent Pear')
                                ? 'Agent Pear'
                                : tx.vault}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* See All Link */}
                      <button
                        onClick={() => {
                          setIsInvestmentsDrawerOpen(false)
                          setIsInvestmentsModalOpen(true)
                        }}
                        className="w-full pt-7px text-label-sm text-brand-primary hover:opacity-80 transition-opacity"
                      >
                        See All
                      </button>
                    </>
                  ) : (
                    <div className="w-full p-13px text-label-sm text-center text-text-secondary">
                      No History Yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Vault Modal */}
      <CreateVaultModal
        isOpen={isCreateVaultModalOpen}
        onClose={() => setIsCreateVaultModalOpen(false)}
      />

      {/* My Investments Modal */}
      <InvestmentsModal
        isOpen={isInvestmentsModalOpen}
        onClose={() => setIsInvestmentsModalOpen(false)}
      />
    </div>
  )
}

// Mini Chart Component - CMC-style smooth line chart
function MiniChart({ data }: { data: number[] }) {
  const width = 80
  const height = 30
  const padding = 2

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  // Calculate points with proper scaling
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y =
      height - ((value - min) / range) * (height - padding * 2) - padding
    return { x, y }
  })

  // Create smooth curve path using quadratic bezier curves
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ''

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      const controlX = (current.x + next.x) / 2
      const controlY = (current.y + next.y) / 2

      if (i === 0) {
        path += ` L ${controlX} ${controlY}`
      } else {
        path += ` Q ${current.x} ${current.y}, ${controlX} ${controlY}`
      }
    }

    const last = points[points.length - 1]
    path += ` Q ${last.x} ${last.y}, ${last.x} ${last.y}`

    return path
  }

  const pathData = createSmoothPath(points)

  // Create gradient path for fill
  const fillPath = pathData + ` L ${width} ${height} L 0 ${height} Z`

  // Determine color based on trend (first vs last value)
  const isPositive = data[data.length - 1] >= data[0]
  const strokeColor = isPositive ? '#4ADE80' : '#f87171'
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Gradient fill */}
      <path d={fillPath} fill={`url(#${gradientId})`} />
      {/* Main line */}
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
