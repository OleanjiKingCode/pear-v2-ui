import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/design-tokens')({
  component: DesignTokensDemo,
})

function DesignTokensDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Design Tokens Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Showcasing Figma design tokens integrated with Tailwind CSS v4
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>

          {/* Lime colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-foreground">
              Lime (Brand Colors)
            </h3>
            <div className="flex gap-2 flex-wrap">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: `var(--color-lime-${shade})` }}
                    />
                    <span className="text-xs mt-1 text-muted-foreground">
                      {shade}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Blue colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-foreground">Blue</h3>
            <div className="flex gap-2 flex-wrap">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: `var(--color-blue-${shade})` }}
                    />
                    <span className="text-xs mt-1 text-muted-foreground">
                      {shade}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Purple colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-foreground">Purple</h3>
            <div className="flex gap-2 flex-wrap">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border border-border shadow-sm"
                      style={{
                        backgroundColor: `var(--color-purple-${shade})`,
                      }}
                    />
                    <span className="text-xs mt-1 text-muted-foreground">
                      {shade}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Semantic Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-primary text-primary-foreground rounded-lg">
              <p className="font-semibold">Primary</p>
              <p className="text-sm opacity-90">
                bg-primary / text-primary-foreground
              </p>
            </div>
            <div className="p-6 bg-secondary text-secondary-foreground rounded-lg">
              <p className="font-semibold">Secondary</p>
              <p className="text-sm opacity-90">
                bg-secondary / text-secondary-foreground
              </p>
            </div>
            <div className="p-6 bg-accent text-accent-foreground rounded-lg border border-border">
              <p className="font-semibold">Accent</p>
              <p className="text-sm opacity-90">
                bg-accent / text-accent-foreground
              </p>
            </div>
            <div className="p-6 bg-muted text-muted-foreground rounded-lg">
              <p className="font-semibold">Muted</p>
              <p className="text-sm">bg-muted / text-muted-foreground</p>
            </div>
            <div className="p-6 bg-destructive text-destructive-foreground rounded-lg">
              <p className="font-semibold">Destructive</p>
              <p className="text-sm">
                bg-destructive / text-destructive-foreground
              </p>
            </div>
            <div className="p-6 bg-card text-card-foreground rounded-lg border border-border">
              <p className="font-semibold">Card</p>
              <p className="text-sm">bg-card / text-card-foreground</p>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 rounded-lg bg-gradient-agent-pear flex items-center justify-center">
              <p className="text-white font-semibold text-lg drop-shadow-md">
                Agent Pear Gradient
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Class:{' '}
            <code className="bg-muted px-2 py-1 rounded">
              bg-gradient-agent-pear
            </code>
          </p>
        </section>

        {/* Spacing Demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Spacing System</h2>
          <div className="space-y-4">
            {['px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'].map(
              (space) => (
                <div key={space} className="flex items-center gap-4">
                  <code className="text-sm bg-muted px-3 py-1 rounded w-20">
                    {space}
                  </code>
                  <div
                    className={`h-8 bg-primary rounded`}
                    style={{ width: `var(--spacing-${space})` }}
                  />
                </div>
              ),
            )}
          </div>
        </section>

        {/* Component Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Component Examples</h2>
          <div className="space-y-6">
            {/* Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-3">Buttons</h3>
              <div className="flex gap-3 flex-wrap">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Primary Button
                </button>
                <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Secondary Button
                </button>
                <button
                  className="px-6 py-3 text-white rounded-lg transition-colors font-medium"
                  style={{ backgroundColor: 'var(--color-lime-500)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'var(--color-lime-600)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'var(--color-lime-500)')
                  }
                >
                  Lime Button
                </button>
                <button className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Destructive
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg font-medium mb-3">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm">
                  <h4 className="font-semibold mb-2">Card Title</h4>
                  <p className="text-muted-foreground text-sm">
                    This card uses semantic color tokens from your design
                    system.
                  </p>
                </div>
                <div
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-blue-50)',
                    color: 'var(--color-blue-900)',
                    borderColor: 'var(--color-blue-200)',
                  }}
                >
                  <h4 className="font-semibold mb-2">Blue Card</h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-blue-700)' }}
                  >
                    Using global color tokens for themed cards.
                  </p>
                </div>
                <div
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-purple-50)',
                    color: 'var(--color-purple-900)',
                    borderColor: 'var(--color-purple-200)',
                  }}
                >
                  <h4 className="font-semibold mb-2">Purple Card</h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-purple-700)' }}
                  >
                    Consistent with your Figma design tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            💡 Tip: Run{' '}
            <code className="bg-muted px-2 py-1 rounded">
              pnpm generate-tokens
            </code>{' '}
            to regenerate tokens after updating designTokens.json
          </p>
        </section>
      </div>
    </div>
  )
}
