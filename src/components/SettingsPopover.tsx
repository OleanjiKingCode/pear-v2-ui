import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  LanguageIcon,
  NumbersFormat,
  PaletteIcon,
  SoundIcon,
} from './ui/svgIcons'

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
    <div className="">
      <div
        onClick={() => setView('numberFormat')}
        className="w-full flex items-center justify-between h-[33px] px-3px py-5px rounded-md hover:bg-btn-tertiary-hover transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-5px">
          <div className="pl-1">{NumbersFormat}</div>
          <span className="text-text-tertiary text-label-sm font-medium">
            Number Formatting
          </span>
        </div>
        <div className="flex items-center gap-5px">
          <span className="text-text-primary text-label-sm">
            {numberFormat}
          </span>
          <ChevronRight className="w-4 h-4 text-icon-subtle" />
        </div>
      </div>

      <div className="border-t border-border-subtle my-5px" />

      {/* Language */}
      <div
        onClick={() => setView('language')}
        className="w-full flex items-center justify-between h-[33px] px-3px py-5px rounded-md hover:bg-btn-tertiary-hover transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-5px">
          <div className="pl-1">{LanguageIcon}</div>
          <span className="text-text-tertiary text-label-sm font-medium">
            Language
          </span>
        </div>
        <div className="flex items-center gap-5px">
          {languageOptions.find((l) => l.name === language)?.flag && (
            <span className="text-label-sm text-secondary">
              {languageOptions.find((l) => l.name === language)?.flag}
            </span>
          )}
          <span className="text-label-sm text-secondary">{language}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </div>

      <div className="border-t border-border-subtle my-5px" />

      {/* Sound */}
      <div
        // onClick={() => setView('sound')}
        className="w-full flex items-center justify-between h-[33px] px-3px py-5px rounded-md hover:bg-btn-tertiary-hover transition-colors cursor-not-allowed"
      >
        <div className="flex items-center gap-5px">
          <div className="pl-1">{SoundIcon}</div>
          <span className="text-text-tertiary text-label-sm font-medium">
            Sound
          </span>
        </div>
        <div className="flex items-center gap-5px">
          <span className="text-text-disabled text-label-sm">
            {soundEnabled}
          </span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </div>

      <div className="border-t border-border-subtle my-5px" />

      {/* Theme */}
      <div
        // onClick={() => setView('theme')}
        className="w-full flex items-center justify-between h-[33px] px-3px py-5px rounded-md hover:bg-btn-tertiary-hover transition-colors cursor-not-allowed"
      >
        <div className="flex items-center gap-5px">
          <div className="pl-1">{PaletteIcon}</div>
          <span className="text-text-tertiary text-label-sm font-medium">
            Theme
          </span>
        </div>
        <div className="flex items-center gap-5px">
          <span className="text-text-disabled text-label-sm">{theme}</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </div>
      </div>

      <div className="border-t border-border-default my-5px" />

      {/* Reset Layout */}
      <div className="">
        <Button
          onClick={handleReset}
          className="w-full py-3 bg-btn-tertiary-active hover:bg-btn-tertiary-hover disabled:bg-btn-tertiary-disabled text-text-primary rounded-lg transition-colors"
        >
          <span className="text-label-sm">Reset Layout</span>
        </Button>
      </div>
    </div>
  )

  const renderNumberFormatView = () => (
    <div className="space-y-5px">
      <div className="flex items-center h-6 pb-5px border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className=" hover:bg-btn-tertiary-hover rounded cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-icon-subtle rotate-180" />
        </button>
        <div className="w-full text-center -ml-2">
          <h3 className="text-text-primary text-label-sm font-medium">
            Number Formatting
          </h3>
        </div>
      </div>

      <div className="gap-5px">
        {numberFormatOptions.map((format, i) => (
          <div key={format} className="">
            <button
              onClick={() => {
                setNumberFormat(format)
                setView('main')
              }}
              className="w-full flex items-center h-[33px] rounded-md cursor-pointer justify-between px-3px py-5px hover:bg-bg-overlay transition-colors"
            >
              <span className="text-text-secondary text-label-sm">
                {format}
              </span>
              {numberFormat === format && (
                <Check className="w-5 h-5 text-icon-cta" />
              )}
            </button>

            {i + 1 < numberFormatOptions.length && (
              <div className="border-b border-border-prim my-5px" />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderLanguageView = () => (
    <div className="space-y-5px">
      <div className="flex items-center h-6 pb-5px border-b border-border-default">
        <button
          onClick={() => setView('main')}
          className=" hover:bg-btn-tertiary-hover rounded cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-icon-subtle rotate-180" />
        </button>
        <div className="w-full text-center -ml-2">
          <h3 className="text-text-primary text-label-sm font-medium">
            Language
          </h3>
        </div>
      </div>

      <div className="gap-5px">
        {languageOptions.map((lang, i) => (
          <div key={lang.name} className="">
            <button
              onClick={() => {
                setLanguage(lang.name)
                setView('main')
              }}
              className="w-full flex items-center h-[33px] rounded-md cursor-pointer justify-between px-3px py-5px hover:bg-bg-overlay transition-colors"
            >
              <div className="flex items-center gap-3px">
                <span className="text-base">{lang.flag}</span>
                <span className="text-text-secondary text-label-sm">
                  {lang.name}
                </span>
              </div>
              {language === lang.name && (
                <Check className="w-5 h-5 text-icon-cta" />
              )}
            </button>
            {i + 1 < languageOptions.length && (
              <div className="border-b border-border-prim my-5px" />
            )}
          </div>
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
        className="p-5px border border-border-default rounded-lg overflow-hidden w-[300px] mt-1"
        style={{
          background: 'rgba(10, 10, 10, 0.90)',
        }}
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
