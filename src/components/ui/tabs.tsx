import { useState, useRef, useEffect } from 'react'

interface TabOption {
  value: string
  label: string
  backgroundColor?: string
  textColor?: string
  selectedTextColor?: string
}

interface TabsProps {
  options: TabOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ options, value, onChange, className = '' }: TabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  })
  const tabsRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    if (!tabsRef.current) return

    const selectedIndex = options.findIndex((opt) => opt.value === value)
    if (selectedIndex === -1) return

    const tabElements = tabsRef.current.querySelectorAll('[data-tab]')
    const selectedTab = tabElements[selectedIndex] as HTMLElement

    if (selectedTab) {
      setIndicatorStyle({
        width: selectedTab.offsetWidth,
        left: selectedTab.offsetLeft,
      })
    }
  }, [value, options])

  return (
    <div
      ref={tabsRef}
      className={`relative flex gap-5px p-3px bg-bg-raised rounded-lg ${className}`}
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-3px bottom-3px rounded-lg transition-all duration-200 ease-out"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
          backgroundColor:
            selectedOption?.backgroundColor || 'var(--brand-accent)',
        }}
      />

      {/* Tab buttons */}
      {options.map((option) => {
        const isSelected = value === option.value

        // Determine text color
        let textColorStyle: React.CSSProperties = {}
        if (isSelected && option.selectedTextColor) {
          textColorStyle.color = option.selectedTextColor.startsWith('var(')
            ? option.selectedTextColor
            : option.selectedTextColor.startsWith('#')
              ? option.selectedTextColor
              : `var(${option.selectedTextColor})`
        } else if (isSelected && option.textColor) {
          textColorStyle.color = option.textColor.startsWith('var(')
            ? option.textColor
            : option.textColor.startsWith('#')
              ? option.textColor
              : `var(${option.textColor})`
        }

        return (
          <button
            key={option.value}
            data-tab
            onClick={() => onChange(option.value)}
            className={`relative z-10 flex-1 px-11px py-5px h-[33px] rounded-lg text-label-sm font-medium transition-colors ${
              isSelected
                ? option.selectedTextColor || option.textColor
                  ? ''
                  : 'text-text-inverse'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
            style={isSelected ? textColorStyle : {}}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
