import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, Copy, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { DepositModal } from '@/components/modals/DepositModal'
import { WithdrawModal } from '@/components/modals/WithdrawModal'
import { ShareIcon } from '@/components/ui/svgIcons'

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
  { date: '2024-10-01', value: 30000 },
  { date: '2024-10-03', value: 40000 },
  { date: '2024-10-05', value: 35000 },
  { date: '2024-10-07', value: 50000 },
  { date: '2024-10-09', value: 45000 },
  { date: '2024-10-11', value: 35000 },
  { date: '2024-10-13', value: 40000 },
  { date: '2024-10-15', value: 30000 },
  { date: '2024-10-17', value: 35000 },
  { date: '2024-10-19', value: 45000 },
  { date: '2024-10-21', value: 50000 },
  { date: '2024-10-23', value: 55000 },
  { date: '2024-10-25', value: 60000 },
  { date: '2024-10-27', value: 58000 },
  { date: '2024-10-29', value: 62000 },
  { date: '2024-10-31', value: 65000 },
  { date: '2024-11-02', value: 63000 },
  { date: '2024-11-04', value: 68000 },
  { date: '2024-11-06', value: 70000 },
  { date: '2024-11-08', value: 67000 },
  { date: '2024-11-10', value: 72000 },
  { date: '2024-11-12', value: 75000 },
  { date: '2024-11-14', value: 78000 },
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

// Mock performance metrics
const mockPerformanceMetrics = {
  leaderInvestment: '$230,000.36',
  leaderInvestmentPercent: '23%',
  maxDrawdown: '6.2%',
  profitFactor: '6.2%',
  totalPnl: '$56,012.87',
  tradedVolume: '$670,000.36',
  profitShare: '10%',
  apr: '10.98%',
  winRate: '62.87%',
}

// Mock portfolio data
const mockPortfolio = [
  { symbol: 'USDC', amount: '$900,487.90', icon: '/tokens/usdc.svg' },
  { symbol: 'USDHL', amount: '$900,487.90', icon: '/tokens/usdc.svg' },
]

function VaultDetailPage() {
  const { vaultId } = Route.useParams()
  const vault = mockVaultData[vaultId] || mockVaultData['3']

  const [activeTab, setActiveTab] = useState<
    'about' | 'performance' | 'portfolio'
  >('about')
  const [timeRange, setTimeRange] = useState<string>('all')
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [activePositionTab, setActivePositionTab] = useState<
    'positions' | 'twap' | 'openOrders' | 'allHistory'
  >('positions')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getTimeRangeLabel = (value: string) => {
    switch (value) {
      case 'all':
        return 'All Time'
      case '30d':
        return '30 Days'
      case '7d':
        return '7 Days'
      case '24h':
        return '24 Hours'
      default:
        return 'All Time'
    }
  }

  // Filter chart data based on time range
  const filteredChartData = mockChartData.filter((item) => {
    if (timeRange === 'all') return true

    const date = new Date(item.date)
    const referenceDate = new Date('2024-11-14')
    let daysToSubtract = 0

    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    } else if (timeRange === '24h') {
      daysToSubtract = 1
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

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
        className="flex flex-col px-9px lg:px-9px pt-10 gap-12px"
        style={{
          maxWidth: '1232px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-12px">
          <div className="flex items-center gap-5px">
            <Link to="/vaults">
              <button className="p-5px w-8 h-8 flex items-center justify-center bg-transparent transition-colors">
                <ChevronLeft className="w-4 h-4 text-text-primary" />
              </button>
            </Link>
            <div className="flex items-center gap-5px">
              <img
                src={
                  vault.name.toLowerCase().includes('agent')
                    ? '/agentPearWithBg.svg'
                    : '/agents/huf.png'
                }
                alt="Vault Logo"
                className="w-8 h-8 rounded-xl"
              />
              <h1
                className="text-heading-h4 lg:text-heading-h3 font-medium"
                style={
                  vault.name === 'Agent Pear'
                    ? {
                        background:
                          'linear-gradient(90deg, #a2db5c 0%, #29f8ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                    : { color: '#fff' }
                }
              >
                {vault.name} {vault.variant ? `Vault` : ''}
              </h1>
              {vault.variant && (
                <span className="text-heading-h4 lg:text-heading-h3 font-medium text-text-primary">
                  {vault.variant}
                </span>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-9px lg:gap-7px">
            <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center gap-9px lg:gap-12px lg:flex-wrap">
              <div className="space-y-3px lg:space-y-5px">
                <div className="text-label-xs lg:text-label-sm text-text-tertiary">
                  Total Value Locked
                </div>
                <div className="text-heading-h6 lg:text-heading-h5 font-medium text-text-primary">
                  {vault.tvl}
                </div>
              </div>
              <div className="space-y-3px lg:space-y-5px">
                <div className="text-label-xs lg:text-label-sm text-text-tertiary">
                  Total PnL
                </div>
                <div className="text-heading-h6 lg:text-heading-h5 font-medium text-text-primary">
                  {vault.totalPnl}
                </div>
              </div>
              <div className="space-y-3px lg:space-y-5px">
                <div className="text-label-xs lg:text-label-sm text-text-tertiary">
                  30 Days Return
                </div>
                <div
                  className={cn(
                    'text-heading-h6 lg:text-heading-h5 font-medium',
                    vault.pnlPositive ? 'text-text-profit' : 'text-text-loss',
                  )}
                >
                  {vault.return30d}{' '}
                  <span className="text-label-xs lg:text-label-sm text-text-tertiary">
                    APR
                  </span>
                </div>
              </div>
              <div className="space-y-3px lg:space-y-5px">
                <div className="text-label-xs lg:text-label-sm text-text-tertiary">
                  Vault Age
                </div>
                <div className="text-heading-h6 lg:text-heading-h5 font-medium text-text-primary">
                  {vault.vaultAge}
                </div>
              </div>
              <div className="space-y-3px lg:space-y-5px col-span-2 lg:col-span-1">
                <div className="text-label-xs lg:text-label-sm text-text-tertiary">
                  My Investment
                </div>
                <div className="text-heading-h6 lg:text-heading-h5 font-medium text-text-primary">
                  {vault.myInvestment}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-5px">
              <Button
                onClick={() => setIsDepositModalOpen(true)}
                className="bg-brand-primary hover:bg-btn-primary-hover disabled:bg-btn-primary-disabled rounded-lg text-label-sm px-9px py-9px lg:px-7px lg:py-5px text-text-inverse font-medium transition-colors w-full lg:w-auto"
              >
                Deposit
              </Button>
              <Button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="bg-btn-secondary-active hover:bg-btn-secondary-hover disabled:bg-btn-secondary-disabled rounded-lg text-label-sm px-9px py-9px lg:px-7px lg:py-5px text-brand-primary font-medium transition-colors w-full lg:w-auto"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-9px w-full">
          {/* Left Column - Chart and Info */}
          <div className="flex-1 space-y-9px w-full lg:max-w-[830px]">
            {/* Chart Section */}
            <div className="rounded-lg space-y-5px">
              <Popover open={isTimeRangeOpen} onOpenChange={setIsTimeRangeOpen}>
                <PopoverTrigger asChild>
                  <button className="w-[106px] h-[33px] bg-input-base border border-transparent rounded-lg text-label-sm text-text-primary font-medium flex items-center justify-between px-7px hover:bg-btn-secondary-hover transition-colors">
                    <span>{getTimeRangeLabel(timeRange)}</span>
                    <ChevronDown className="w-4 h-4 text-text-tertiary" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-3px! border border-border-default bg-bg-subtle rounded-lg overflow-hidden w-[120px] mt-1"
                  align="start"
                >
                  <div className="flex flex-col gap-3px w-full p-0">
                    <button
                      onClick={() => {
                        setTimeRange('all')
                        setIsTimeRangeOpen(false)
                      }}
                      className={cn(
                        'text-label-sm! text-left px-7px py-5px rounded transition-colors w-full',
                        timeRange === 'all'
                          ? 'bg-bg-overlay text-text-primary'
                          : 'text-text-tertiary hover:bg-bg-overlay hover:text-text-primary',
                      )}
                    >
                      All Time
                    </button>
                    <button
                      onClick={() => {
                        setTimeRange('30d')
                        setIsTimeRangeOpen(false)
                      }}
                      className={cn(
                        'text-label-sm! text-left px-7px py-5px rounded transition-colors',
                        timeRange === '30d'
                          ? 'bg-bg-overlay text-text-primary'
                          : 'text-text-tertiary hover:bg-bg-overlay hover:text-text-primary',
                      )}
                    >
                      30 Days
                    </button>
                    <button
                      onClick={() => {
                        setTimeRange('7d')
                        setIsTimeRangeOpen(false)
                      }}
                      className={cn(
                        'text-label-sm! text-left px-7px py-5px rounded transition-colors',
                        timeRange === '7d'
                          ? 'bg-bg-overlay text-text-primary'
                          : 'text-text-tertiary hover:bg-bg-overlay hover:text-text-primary',
                      )}
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => {
                        setTimeRange('24h')
                        setIsTimeRangeOpen(false)
                      }}
                      className={cn(
                        'text-label-sm! text-left px-7px py-5px rounded transition-colors',
                        timeRange === '24h'
                          ? 'bg-bg-overlay text-text-primary'
                          : 'text-text-tertiary hover:bg-bg-overlay hover:text-text-primary',
                      )}
                    >
                      24 Hours
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Chart */}
              <div className="h-[342px] w-full">
                <PerformanceChart data={filteredChartData} />
              </div>
            </div>

            {/* Tabs Section */}
            <div className="space-y-9px">
              <div className="flex items-center gap-9px lg:gap-12px border-b border-border-default overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab('about')}
                  className={cn(
                    'text-label-sm! font-medium transition-all relative px-5px pb-7px whitespace-nowrap',
                    activeTab === 'about'
                      ? 'text-text-primary'
                      : 'text-text-tertiary',
                  )}
                >
                  About Vault
                  {activeTab === 'about' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={cn(
                    'text-label-sm! font-medium transition-all relative px-5px pb-7px whitespace-nowrap',
                    activeTab === 'performance'
                      ? 'text-text-primary'
                      : 'text-text-tertiary',
                  )}
                >
                  Vault Performance
                  {activeTab === 'performance' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={cn(
                    'text-label-sm! font-medium transition-all relative px-5px pb-7px whitespace-nowrap',
                    activeTab === 'portfolio'
                      ? 'text-text-primary'
                      : 'text-text-tertiary',
                  )}
                >
                  Total Portfolio
                  {activeTab === 'portfolio' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text-primary" />
                  )}
                </button>

                {activeTab === 'performance' && (
                  <div className="cursor-pointer ml-auto flex items-center gap-3px text-label-sm text-brand-primary px-3px py-2px">
                    <span>Share</span>
                    {ShareIcon}
                  </div>
                )}
              </div>

              {/* Tab Content */}
              <div className="space-y-7px">
                {activeTab === 'about' && (
                  <div className="space-y-7px">
                    <p className="text-label-sm text-text-secondary">
                      {vault.description}
                    </p>

                    <div className="space-y-7px">
                      <div className="flex items-center gap-[5px]">
                        <span className="text-label-sm text-text-tertiary">
                          Vault Address:
                        </span>
                        <div className="flex items-center gap-3px">
                          <span className="text-label-sm text-text-secondary font-mono">
                            {vault.vaultAddress}
                          </span>
                          <button
                            onClick={() => copyToClipboard(vault.vaultAddress)}
                            className="p-3px hover:opacity-70 transition-opacity"
                          >
                            <Copy className="w-3 h-3 text-brand-primary" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <span className="text-label-sm text-text-tertiary">
                          Leader Address:
                        </span>
                        <div className="flex items-center gap-3px">
                          <span className="text-label-sm text-text-secondary font-mono">
                            {vault.leaderAddress}
                          </span>
                          <button
                            onClick={() => copyToClipboard(vault.leaderAddress)}
                            className="p-3px hover:opacity-70 transition-opacity"
                          >
                            <Copy className="w-3 h-3 text-brand-primary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-7px">
                    {/* Column 1 */}
                    <div className="space-y-7px">
                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Leader Investment:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.leaderInvestment}{' '}
                          <span className="text-text-tertiary">
                            ({mockPerformanceMetrics.leaderInvestmentPercent})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Total PnL:
                        </div>
                        <div className="text-label-sm text-text-profit">
                          {mockPerformanceMetrics.totalPnl}
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          APR:
                        </div>
                        <div className="text-label-sm text-text-profit">
                          {mockPerformanceMetrics.apr}
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-9px">
                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Max Drawdown:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.maxDrawdown}
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Traded Volume:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.tradedVolume}
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Win Rate:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.winRate}
                        </div>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-9px">
                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Profit Factor:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.profitFactor}
                        </div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <div className="text-label-sm text-text-tertiary">
                          Profit Share:
                        </div>
                        <div className="text-label-sm text-text-primary">
                          {mockPerformanceMetrics.profitShare}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="space-y-5px">
                    {mockPortfolio.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3px">
                          <img
                            src={item.icon}
                            alt={item.symbol}
                            className="w-4 h-4"
                          />
                          <span className="text-label-sm text-text-primary">
                            {item.symbol}
                          </span>
                        </div>
                        <span className="text-label-sm text-text-primary font-mono">
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Allocation Chart */}
          <div className="w-full lg:w-[350px] space-y-5px">
            <div className="bg-bg-raised space-y-9px rounded-lg p-9px">
              <h3 className="text-label-sm font-medium text-text-primary">
                Vault Portfolio Allocation
              </h3>

              {/* Donut Chart */}
              <div className="flex items-center justify-center mb-7px">
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
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: strategy.color }}
                      />
                      <span className="text-label-sm text-text-primary">
                        {strategy.label}
                      </span>
                    </div>
                    <span className="text-label-sm text-text-tertiary">
                      ({strategy.percentage}%)
                    </span>

                    <span className="text-label-sm text-text-primary font-mono">
                      {strategy.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* My PnL Section */}
            <div className="flex items-center bg-bg-raised p-9px rounded-lg justify-between">
              <div className="flex flex-col gap-5px">
                <span className="text-label-sm text-text-tertiary">
                  My all time pnl
                </span>
                <span className="text-label-sm text-text-primary font-medium">
                  {vault.myAllTimePnl}
                </span>
              </div>
              <span className="text-label-sm text-text-secondary">12 Days</span>
            </div>

            <div className="flex items-center bg-bg-raised p-9px rounded-lg justify-between">
              <div className="flex flex-col gap-5px">
                <span className="text-label-sm text-text-tertiary">
                  My unrealized PnL
                </span>
                <span className="text-label-sm text-text-profit font-medium">
                  {vault.myUnrealizedPnl}
                </span>
              </div>
              <div className="h-8 w-8 flex items-center justify-center bg-btn-secondary-active hover:bg-btn-secondary-hover rounded-lg p-5px">
                {ShareIcon}
              </div>
            </div>
          </div>
        </div>

        {/* Positions Section */}
        <div className="bg-bg-raised rounded-lg p-7px">
          <div className="flex items-center gap-5px lg:gap-7px border-b border-border-default mb-7px overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActivePositionTab('positions')}
              className={cn(
                'text-label-sm font-medium transition-all relative px-0 py-5px whitespace-nowrap',
                activePositionTab === 'positions'
                  ? 'text-text-primary'
                  : 'text-text-disabled',
              )}
            >
              Positions (2)
              {activePositionTab === 'positions' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />
              )}
            </button>
            <button
              onClick={() => setActivePositionTab('twap')}
              className={cn(
                'text-label-sm font-medium transition-all relative px-0 py-5px whitespace-nowrap',
                activePositionTab === 'twap'
                  ? 'text-text-primary'
                  : 'text-text-disabled',
              )}
            >
              TWAP
              {activePositionTab === 'twap' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />
              )}
            </button>
            <button
              onClick={() => setActivePositionTab('openOrders')}
              className={cn(
                'text-label-sm font-medium transition-all relative px-0 py-5px whitespace-nowrap',
                activePositionTab === 'openOrders'
                  ? 'text-text-primary'
                  : 'text-text-disabled',
              )}
            >
              Open Orders
              {activePositionTab === 'openOrders' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />
              )}
            </button>
            <button
              onClick={() => setActivePositionTab('allHistory')}
              className={cn(
                'text-label-sm font-medium transition-all relative px-0 py-5px whitespace-nowrap',
                activePositionTab === 'allHistory'
                  ? 'text-text-primary'
                  : 'text-text-disabled',
              )}
            >
              All Trade History
              {activePositionTab === 'allHistory' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary" />
              )}
            </button>
            <button
              className={cn(
                'text-label-sm font-medium transition-all relative px-0 py-5px text-text-disabled whitespace-nowrap',
              )}
            >
              Investors (12)
            </button>
          </div>

          {/* Positions Table */}
          {activePositionTab === 'positions' && (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Pair
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Size
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Lvg
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Entry Price
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Mark Price
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Margin
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      PnL
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      TP / SL
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Liq Price
                    </th>
                    <th className="text-center px-3px py-5px text-label-sm font-medium text-text-tertiary">
                      Funding
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockPositions.map((position) => (
                    <tr
                      key={position.id}
                      className="border-b border-border-default hover:bg-bg-overlay/50 transition-colors"
                    >
                      <td className="px-3px py-5px">
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
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.size}
                      </td>
                      <td className="px-3px py-5px text-center">
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
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.entryPrice}
                      </td>
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.markPrice}
                      </td>
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.margin}
                      </td>
                      <td className="px-3px py-5px text-center">
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
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.tpSl}
                      </td>
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.liqPrice}
                      </td>
                      <td className="px-3px py-5px text-center text-label-sm text-text-primary font-mono">
                        {position.funding}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activePositionTab !== 'positions' && (
            <div className="py-7px text-center text-label-sm text-text-tertiary">
              No data available
            </div>
          )}
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
  data: { date: string; value: number }[]
}) {
  if (!data || data.length === 0) return null

  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const range = max - min || 1

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = ((point.value - min) / range) * 100
    return { x, y, date: point.date, value: point.value }
  })

  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ''

    let path = `M ${points[0].x} ${100 - points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const curr = points[i]
      const prev = points[i - 1]
      const cpX1 = prev.x + (curr.x - prev.x) / 2
      const cpY1 = 100 - prev.y
      const cpX2 = prev.x + (curr.x - prev.x) / 2
      const cpY2 = 100 - curr.y
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${100 - curr.y}`
    }

    return path
  }

  const pathData = createPath(points)

  // Calculate Y-axis labels
  const yAxisValues = [max, (max + min) / 2, min]

  // Calculate X-axis labels - show every 4th date
  const xAxisLabels = data
    .filter((_, index) => index % 4 === 0)
    .map((item) => {
      const date = new Date(item.date)
      return {
        label: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        x:
          (data.findIndex((d) => d.date === item.date) / (data.length - 1)) *
          100,
      }
    })

  return (
    <div className="w-full h-full relative flex gap-3px">
      {/* Chart area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative min-h-0">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Vertical grid lines */}
            {[0, 20, 40, 60, 80, 100].map((x) => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                stroke="#262626"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            ))}

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
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="relative h-5 mt-2">
          {xAxisLabels.map((label, index) => (
            <span
              key={index}
              className="absolute text-label-sm text-text-disabled whitespace-nowrap"
              style={{
                left: `${label.x}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {label.label}
            </span>
          ))}
        </div>
      </div>

      {/* Y-axis */}
      <div className="flex flex-col justify-between py-2 text-label-sm text-text-disabled min-w-[40px]">
        {yAxisValues.map((value, index) => (
          <span key={index} className="text-left">
            ${(value / 1000).toFixed(0)}k
          </span>
        ))}
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
