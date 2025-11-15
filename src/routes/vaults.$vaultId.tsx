import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DepositModal } from '@/components/modals/DepositModal'
import { WithdrawModal } from '@/components/modals/WithdrawModal'

export const Route = createFileRoute('/vaults/$vaultId')({
  component: VaultDetailPage,
})

// Mock vault data
const mockVaultData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Agent Pear',
    variant: 'Junior',
    leaderAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    vaultAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    tvl: '$982,893.65',
    totalPnl: '$56,012.87',
    pnlPositive: false,
    return30d: '-10.98%',
    vaultAge: '90d',
    myInvestment: '$0.00',
    myAllTimePnl: '$1872.09',
    myUnrealizedPnl: '$1872.09',
    description:
      'Hi, I am Huf and here I apply a market-neutral pair trading strategy, balancing long/short positions to capture spreads while controlling drawdowns. Managed actively with leverage discipline to maximize risk-adjusted returns.',
  },
  '2': {
    id: '2',
    name: 'Agent Pear',
    variant: 'Senior',
    leaderAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    vaultAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    tvl: '$982,893.65',
    totalPnl: '$56,012.87',
    pnlPositive: true,
    return30d: '10.98%',
    vaultAge: '90d',
    myInvestment: '$87,893.65',
    myAllTimePnl: '$1872.09',
    myUnrealizedPnl: '$1872.09',
    description:
      'Hi, I am Huf and here I apply a market-neutral pair trading strategy, balancing long/short positions to capture spreads while controlling drawdowns. Managed actively with leverage discipline to maximize risk-adjusted returns.',
  },
  '3': {
    id: '3',
    name: 'Huf Vault',
    leaderAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    vaultAddress: '0xd4ebdhngy649hcbf83ch83h292sks534C',
    tvl: '$982,893.65',
    totalPnl: '$56,012.87',
    pnlPositive: false,
    return30d: '-10.98%',
    vaultAge: '90d',
    myInvestment: '$0.00',
    myAllTimePnl: '$1872.09',
    myUnrealizedPnl: '$1872.09',
    description:
      'Hi, I am Huf and here I apply a market-neutral pair trading strategy, balancing long/short positions to capture spreads while controlling drawdowns. Managed actively with leverage discipline to maximize risk-adjusted returns.',
  },
}

// Mock positions data
const mockPositions = [
  {
    id: 1,
    pair: { token1: 'ETH', token2: 'USDC' },
    size: '$7,890',
    leverage: '2x',
    entryPrice: '$1.12345',
    markPrice: '$1.122345',
    margin: '$820',
    pnl: '+$120',
    pnlPercent: '12%',
    pnlPositive: true,
    tpSl: '--',
    liqPrice: '$0.35789',
    funding: '-$0.189',
  },
  {
    id: 2,
    pair: { token1: 'BTC', token2: 'USDC' },
    size: '$6,789',
    leverage: '7x',
    entryPrice: '$5.56789',
    markPrice: '$5.566789',
    margin: '$820',
    pnl: '-$70',
    pnlPercent: '7%',
    pnlPositive: false,
    tpSl: '$21.67/$23.78',
    liqPrice: '$0.79123',
    funding: '-$0.523',
  },
]

// Mock chart data
const mockChartData = [
  { time: '12 TUE', value: 30000 },
  { time: '12 TUE', value: 40000 },
  { time: '12 TUE', value: 35000 },
  { time: '12 TUE', value: 50000 },
  { time: '12 TUE', value: 45000 },
  { time: '12 TUE', value: 35000 },
  { time: '12 TUE', value: 40000 },
  { time: '12 TUE', value: 30000 },
  { time: '12 TUE', value: 35000 },
  { time: '12 TUE', value: 45000 },
  { time: '12 TUE', value: 50000 },
  { time: '12 TUE', value: 55000 },
  { time: '12 TUE', value: 60000 },
]

// Mock allocation data
const mockAllocation = [
  { label: 'ETH', percentage: 35, color: '#EF4444' },
  { label: 'ETH', percentage: 25, color: '#10B981' },
  { label: '', percentage: 20, color: '#84CC16' },
  { label: '', percentage: 10, color: '#22D3EE' },
  { label: '', percentage: 10, color: '#F87171' },
]

const strategyBreakdown = [
  { label: 'Long', percentage: 45, value: '$239,000,090', color: '#10B981' },
  { label: 'Short', percentage: 45, value: '$239,000,090', color: '#EF4444' },
  { label: 'Stable', percentage: 10, value: '$239,000,090', color: '#22D3EE' },
]

function VaultDetailPage() {
  const { vaultId } = Route.useParams()
  const vault = mockVaultData[vaultId] || mockVaultData['3']

  const [activeTab, setActiveTab] = useState<
    'about' | 'performance' | 'portfolio'
  >('about')
  const [timeRange, setTimeRange] = useState<string>('all')
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [activePositionTab, setActivePositionTab] = useState<
    'positions' | 'twap' | 'openOrders' | 'allHistory'
  >('positions')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="relative min-h-screen">
      {/* Gradient Background */}
      <div
        className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-10"
        style={{
          background:
            'linear-gradient(180deg, #A2DB5C 0%, rgba(10, 10, 10, 0.00) 100%)',
          height: '250px',
        }}
      />

      <div
        className="flex flex-col px-4 pt-13px gap-12px"
        style={{
          maxWidth: '1232px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-12px">
          <div className="flex items-center gap-9px">
            <Link to="/vaults">
              <button className="p-5px w-8 h-8 flex items-center justify-center bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-brand-primary" />
              </button>
            </Link>
            <div className="flex items-center gap-5px">
              <img
                src="/agentPearWithBg.svg"
                alt="Vault Logo"
                className="w-8 h-8"
              />
              <h1
                className="text-heading-h4 font-medium"
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
                {vault.name} {vault.variant ? `Vault` : ''}
              </h1>
              {vault.variant && (
                <span className="text-heading-h4 font-medium text-text-primary">
                  {vault.variant}
                </span>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-9px">
            <div className="flex flex-col lg:flex-row lg:items-center gap-9px lg:gap-12px flex-wrap">
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  Total Value Locked
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  {vault.tvl}
                </div>
              </div>
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  Total PnL
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  {vault.totalPnl}
                </div>
              </div>
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  30 Days Return
                </div>
                <div
                  className={cn(
                    'text-heading-h6 font-medium',
                    vault.pnlPositive ? 'text-text-profit' : 'text-text-loss',
                  )}
                >
                  {vault.return30d} <span className="text-label-sm">APR</span>
                </div>
              </div>
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  Vault Age
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  {vault.vaultAge}
                </div>
              </div>
              <div className="space-y-4px">
                <div className="text-label-sm text-text-tertiary">
                  My Investment
                </div>
                <div className="text-heading-h6 font-medium text-text-secondary">
                  {vault.myInvestment}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-7px">
              <Button
                onClick={() => setIsDepositModalOpen(true)}
                className="bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled rounded-lg text-label-sm px-11px py-5px text-text-inverse font-medium transition-colors"
              >
                Deposit
              </Button>
              <Button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="bg-btn-secondary-active hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled rounded-lg text-label-sm px-11px py-5px text-brand-primary font-medium transition-colors"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-10px">
          {/* Left Column - Chart and Info */}
          <div className="flex-1 space-y-10px">
            {/* Chart Section */}
            <div className="bg-bg-raised rounded-lg p-13px">
              <div className="flex items-center justify-between mb-13px">
                <div className="text-label-sm text-text-tertiary">
                  Performance Chart
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-input-base border border-border-default rounded-lg text-label-sm text-text-primary px-7px py-5px outline-none focus:border-border-high transition-colors"
                >
                  <option value="all">All Time</option>
                  <option value="30d">30 Days</option>
                  <option value="7d">7 Days</option>
                  <option value="24h">24 Hours</option>
                </select>
              </div>

              {/* Chart */}
              <div className="h-[300px] flex items-end justify-between gap-2">
                <PerformanceChart data={mockChartData} />
              </div>

              {/* Chart X-axis labels */}
              <div className="flex items-center justify-between mt-5px text-label-xs text-text-disabled">
                {mockChartData.map((point, index) => {
                  if (index % 2 === 0) {
                    return <span key={index}>{point.time}</span>
                  }
                  return null
                })}
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-bg-raised rounded-lg p-13px">
              <div className="flex items-center gap-9px border-b border-border-default mb-13px">
                <button
                  onClick={() => setActiveTab('about')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activeTab === 'about'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  About Vault
                  {activeTab === 'about' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activeTab === 'performance'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  Vault Performance
                  {activeTab === 'performance' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activeTab === 'portfolio'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  Total Portfolio
                  {activeTab === 'portfolio' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-13px">
                {activeTab === 'about' && (
                  <div className="space-y-13px">
                    <p className="text-label-sm text-text-tertiary leading-relaxed">
                      {vault.description}
                    </p>

                    <div className="space-y-7px">
                      <div className="flex items-center justify-between">
                        <span className="text-label-sm text-text-tertiary">
                          Vault Address:
                        </span>
                        <div className="flex items-center gap-5px">
                          <span className="text-label-sm text-text-primary font-mono">
                            {vault.vaultAddress}
                          </span>
                          <button
                            onClick={() => copyToClipboard(vault.vaultAddress)}
                            className="p-3px hover:opacity-70 transition-opacity"
                          >
                            <Copy className="w-3 h-3 text-icon-subtle" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-label-sm text-text-tertiary">
                          Leader Address:
                        </span>
                        <div className="flex items-center gap-5px">
                          <span className="text-label-sm text-text-primary font-mono">
                            {vault.leaderAddress}
                          </span>
                          <button
                            onClick={() => copyToClipboard(vault.leaderAddress)}
                            className="p-3px hover:opacity-70 transition-opacity"
                          >
                            <Copy className="w-3 h-3 text-icon-subtle" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="text-label-sm text-text-tertiary">
                    Performance metrics coming soon...
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="text-label-sm text-text-tertiary">
                    Portfolio details coming soon...
                  </div>
                )}
              </div>
            </div>

            {/* Positions Section */}
            <div className="bg-bg-raised rounded-lg p-13px">
              <div className="flex items-center gap-9px border-b border-border-default mb-13px">
                <button
                  onClick={() => setActivePositionTab('positions')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activePositionTab === 'positions'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  Positions (2)
                  {activePositionTab === 'positions' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActivePositionTab('twap')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activePositionTab === 'twap'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  TWAP
                  {activePositionTab === 'twap' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActivePositionTab('openOrders')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activePositionTab === 'openOrders'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  Open Orders
                  {activePositionTab === 'openOrders' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActivePositionTab('allHistory')}
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px',
                    activePositionTab === 'allHistory'
                      ? 'text-text-primary'
                      : 'text-text-disabled',
                  )}
                >
                  All Trade History
                  {activePositionTab === 'allHistory' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  className={cn(
                    'text-label-sm font-medium transition-all relative px-0 py-7px text-text-disabled',
                  )}
                >
                  Investors (12)
                </button>
              </div>

              {/* Positions Table */}
              {activePositionTab === 'positions' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-default">
                        <th className="text-left px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Pair
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Size
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Lvg
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Entry Price
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Mark Price
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Margin
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          PnL
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          TP / SL
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Liq Price
                        </th>
                        <th className="text-center px-3px py-7px text-label-sm font-medium text-text-tertiary">
                          Funding
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPositions.map((position) => (
                        <tr
                          key={position.id}
                          className="border-b border-border-default hover:bg-bg-overlay transition-colors"
                        >
                          <td className="px-3px py-7px">
                            <div className="flex items-center gap-5px">
                              <div className="flex items-center">
                                <img
                                  src="/tokens/usdc.svg"
                                  alt={position.pair.token1}
                                  className="w-5 h-5"
                                />
                                <img
                                  src="/tokens/usdc.svg"
                                  alt={position.pair.token2}
                                  className="w-5 h-5 -ml-2"
                                />
                              </div>
                              <span className="text-label-sm text-text-primary font-medium">
                                {position.pair.token1}/{position.pair.token2}
                              </span>
                            </div>
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.size}
                          </td>
                          <td className="px-3px py-7px text-center">
                            <div className="flex items-center justify-center gap-3px">
                              <span className="text-label-sm text-text-primary">
                                {position.leverage}
                              </span>
                              {position.leverage !== '2x' && (
                                <button className="p-1 hover:opacity-70">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M6 2V10M10 6H2"
                                      stroke="#A2DB5C"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.entryPrice}
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.markPrice}
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.margin}
                          </td>
                          <td className="px-3px py-7px text-center">
                            <div
                              className={cn(
                                'text-label-sm font-mono',
                                position.pnlPositive
                                  ? 'text-text-profit'
                                  : 'text-text-loss',
                              )}
                            >
                              {position.pnl} ({position.pnlPercent})
                            </div>
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.tpSl}
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.liqPrice}
                          </td>
                          <td className="px-3px py-7px text-center text-label-sm text-text-primary font-mono">
                            {position.funding}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activePositionTab !== 'positions' && (
                <div className="py-13px text-center text-label-sm text-text-tertiary">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Allocation Chart */}
          <div className="lg:w-[361px] space-y-10px">
            <div className="bg-bg-raised rounded-lg p-13px">
              <h3 className="text-label-sm font-semibold text-text-primary mb-13px">
                Vault Portfolio Allocation
              </h3>

              {/* Donut Chart */}
              <div className="flex items-center justify-center mb-13px">
                <DonutChart data={mockAllocation} />
              </div>

              {/* Strategy Breakdown */}
              <div className="space-y-7px">
                {strategyBreakdown.map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5px">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: strategy.color }}
                      />
                      <span className="text-label-sm text-text-tertiary">
                        {strategy.label}
                      </span>
                      <span className="text-label-sm text-text-disabled">
                        ({strategy.percentage}%)
                      </span>
                    </div>
                    <span className="text-label-sm text-text-primary font-mono">
                      {strategy.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* My PnL Section */}
            <div className="bg-bg-raised rounded-lg p-13px space-y-9px">
              <div className="flex items-center justify-between pb-7px border-b border-border-default">
                <span className="text-label-sm text-text-tertiary">
                  My all time pnl
                </span>
                <div className="flex items-center gap-5px">
                  <span className="text-label-md text-text-primary font-medium">
                    {vault.myAllTimePnl}
                  </span>
                  <button className="p-1 hover:opacity-70">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M8 4L10 2M10 2L8 0M10 2H6C3.79086 2 2 3.79086 2 6V6C2 8.20914 3.79086 10 6 10H10"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-label-sm text-text-tertiary">
                  My unrealized PnL
                </span>
                <span className="text-label-md text-text-primary font-medium">
                  {vault.myUnrealizedPnl}
                </span>
              </div>

              <div className="text-label-xs text-text-disabled pt-5px">
                12 Days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  )
}

// Performance Chart Component
function PerformanceChart({
  data,
}: {
  data: { time: string; value: number }[]
}) {
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const range = max - min || 1

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = ((point.value - min) / range) * 100
    return { x, y }
  })

  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ''

    let path = `M ${points[0].x} ${100 - points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const curr = points[i]
      path += ` L ${curr.x} ${100 - curr.y}`
    }

    return path
  }

  const pathData = createPath(points)

  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill="url(#chartGradient)"
        />
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#EF4444"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-label-xs text-text-disabled pr-2">
        <span>${(max / 1000).toFixed(0)}000</span>
        <span>${((max + min) / 2000).toFixed(0)}000</span>
        <span>${(min / 1000).toFixed(0)}000</span>
      </div>
    </div>
  )
}

// Donut Chart Component
function DonutChart({
  data,
}: {
  data: { label: string; percentage: number; color: string }[]
}) {
  const total = data.reduce(
    (sum: number, item: { percentage: number }) => sum + item.percentage,
    0,
  )
  let currentAngle = -90 // Start from top

  const segments = data.map(
    (item: { label: string; percentage: number; color: string }) => {
      const angle = (item.percentage / total) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle

      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      // Calculate arc coordinates
      const radius = 80
      const innerRadius = 50
      const centerX = 100
      const centerY = 100

      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)
      const x3 = centerX + innerRadius * Math.cos(endRad)
      const y3 = centerY + innerRadius * Math.sin(endRad)
      const x4 = centerX + innerRadius * Math.cos(startRad)
      const y4 = centerY + innerRadius * Math.sin(startRad)

      const largeArc = angle > 180 ? 1 : 0

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z',
      ].join(' ')

      return {
        ...item,
        pathData,
        midAngle: (startAngle + endAngle) / 2,
      }
    },
  )

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {segments.map(
          (
            segment: {
              label: string
              percentage: number
              color: string
              pathData: string
              midAngle: number
            },
            index: number,
          ) => (
            <g key={index}>
              <path d={segment.pathData} fill={segment.color} />
              {segment.label && (
                <text
                  x={100 + 65 * Math.cos((segment.midAngle * Math.PI) / 180)}
                  y={100 + 65 * Math.sin((segment.midAngle * Math.PI) / 180)}
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {segment.percentage}%
                </text>
              )}
            </g>
          ),
        )}
      </svg>

      {/* ETH Label */}
      <div className="absolute bottom-8 right-4 flex items-center gap-3px text-text-primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L4 8L8 10.5L12 8L8 2Z" fill="currentColor" />
        </svg>
        <span className="text-label-sm font-medium">ETH</span>
      </div>
    </div>
  )
}
