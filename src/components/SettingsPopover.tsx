import { useState } from 'react'
import { ChevronRight, Check, Volume2, Palette } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface SettingsPopoverProps {
  children: React.ReactNode
}

type NumberFormat = '1,234.56' | '1.234.56' | '1234.56' | '1234,56'
type Language = 'English' | 'Korea' | 'French' | 'Japan'
type Theme = 'Dark' | 'Light'
type SoundOption = 'On' | 'Off'

export function SettingsPopover({ children }: SettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<
    'main' | 'numberFormat' | 'language' | 'sound' | 'theme'
  >('main')
  const [numberFormat, setNumberFormat] = useState<NumberFormat>('1234.56')
  const [language, setLanguage] = useState<Language>('English')
  const [soundEnabled, setSoundEnabled] = useState<SoundOption>('Off')
  const [theme, setTheme] = useState<Theme>('Dark')

  const handleReset = () => {
    setNumberFormat('1234.56')
    setLanguage('English')
    setSoundEnabled('Off')
    setTheme('Dark')
    setIsOpen(false)
  }

  const numberFormatOptions: NumberFormat[] = [
    '1,234.56',
    '1.234.56',
    '1234.56',
    '1234,56',
  ]

  const languageOptions: { name: Language; flag: string }[] = [
    { name: 'English', flag: '🇬🇧' },
    { name: 'Korea', flag: '🇰🇷' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'Japan', flag: '🇯🇵' },
  ]

  const renderMainView = () => (
    <div className="w-[360px]">
      {/* Number Formatting */}
      <button
        onClick={() => setView('numberFormat')}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-brand-accent text-sm font-medium">
            01
            <br />
            10
          </div>
          <span className="text-text-secondary text-sm">Number Formatting</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-primary text-sm">{numberFormat}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </button>

      <div className="border-t border-border-default" />

      {/* Language */}
      <button
        onClick={() => setView('language')}
        className="w-full flex items-center justify-between px-4 py-3 bg-bg-elevated hover:bg-bg-raised transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-brand-accent text-xl">🌐</div>
          <span className="text-text-secondary text-sm">Language</span>
        </div>
        <div className="flex items-center gap-2">
          {languageOptions.find((l) => l.name === language)?.flag && (
            <span className="text-base">
              {languageOptions.find((l) => l.name === language)?.flag}
            </span>
          )}
          <span className="text-text-primary text-sm">{language}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </button>

      <div className="border-t border-border-default" />

      {/* Sound */}
      <button
        onClick={() => setView('sound')}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
      >
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-brand-accent" />
          <span className="text-text-secondary text-sm">Sound</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-tertiary text-sm">{soundEnabled}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </button>

      <div className="border-t border-border-default" />

      {/* Theme */}
      <button
        onClick={() => setView('theme')}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
      >
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-brand-accent" />
          <span className="text-text-secondary text-sm">Theme</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-tertiary text-sm">{theme}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </button>

      <div className="border-t border-border-default" />

      {/* Reset Layout */}
      <div className="p-4">
        <Button
          onClick={handleReset}
          className="w-full py-3 bg-bg-elevated hover:bg-bg-raised text-text-primary rounded-lg transition-colors"
        >
          Reset Layout
        </Button>
      </div>
    </div>
  )

  const renderNumberFormatView = () => (
    <div className="w-[360px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className="p-1 hover:bg-bg-elevated rounded"
        >
          <ChevronRight className="w-5 h-5 text-text-primary rotate-180" />
        </button>
        <h3 className="text-text-primary text-base font-medium">
          Number Formatting
        </h3>
      </div>

      <div className="py-2">
        {numberFormatOptions.map((format) => (
          <button
            key={format}
            onClick={() => {
              setNumberFormat(format)
              setView('main')
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
          >
            <span className="text-text-primary text-sm">{format}</span>
            {numberFormat === format && (
              <Check className="w-5 h-5 text-brand-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  )

  const renderLanguageView = () => (
    <div className="w-[360px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className="p-1 hover:bg-bg-elevated rounded"
        >
          <ChevronRight className="w-5 h-5 text-text-primary rotate-180" />
        </button>
        <h3 className="text-text-primary text-base font-medium">Language</h3>
      </div>

      <div className="py-2">
        {languageOptions.map((lang) => (
          <button
            key={lang.name}
            onClick={() => {
              setLanguage(lang.name)
              setView('main')
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{lang.flag}</span>
              <span className="text-text-primary text-sm">{lang.name}</span>
            </div>
            {language === lang.name && (
              <Check className="w-5 h-5 text-brand-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  )

  const renderSoundView = () => (
    <div className="w-[360px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className="p-1 hover:bg-bg-elevated rounded"
        >
          <ChevronRight className="w-5 h-5 text-text-primary rotate-180" />
        </button>
        <h3 className="text-text-primary text-base font-medium">Sound</h3>
      </div>

      <div className="py-2">
        {(['On', 'Off'] as SoundOption[]).map((option) => (
          <button
            key={option}
            onClick={() => {
              setSoundEnabled(option)
              setView('main')
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
          >
            <span className="text-text-primary text-sm">{option}</span>
            {soundEnabled === option && (
              <Check className="w-5 h-5 text-brand-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  )

  const renderThemeView = () => (
    <div className="w-[360px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className="p-1 hover:bg-bg-elevated rounded"
        >
          <ChevronRight className="w-5 h-5 text-text-primary rotate-180" />
        </button>
        <h3 className="text-text-primary text-base font-medium">Theme</h3>
      </div>

      <div className="py-2">
        {(['Dark', 'Light'] as Theme[]).map((option) => (
          <button
            key={option}
            onClick={() => {
              setTheme(option)
              setView('main')
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated transition-colors"
          >
            <span className="text-text-primary text-sm">{option}</span>
            {theme === option && (
              <Check className="w-5 h-5 text-brand-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 bg-bg-raised border border-border-default rounded-xl shadow-lg"
      >
        {view === 'main' && renderMainView()}
        {view === 'numberFormat' && renderNumberFormatView()}
        {view === 'language' && renderLanguageView()}
        {view === 'sound' && renderSoundView()}
        {view === 'theme' && renderThemeView()}
      </PopoverContent>
    </Popover>
  )
}
