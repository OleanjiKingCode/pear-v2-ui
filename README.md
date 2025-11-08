# Pear UI v2 - Design System Showcase

A **TanStack Start** application showcasing a custom design system with **Figma design tokens** integrated with **Tailwind CSS v4**.

## What's Inside

This project demonstrates:

- 🎨 **Design Tokens** - Figma design tokens automatically converted to Tailwind CSS variables
- ⚡ **TanStack Start** - Modern full-stack React framework with SSR
- 🎭 **Tailwind CSS v4** - Latest Tailwind with custom theme integration
- 🧩 **Shadcn UI** - Beautiful, accessible component system
- 🔥 **Live Demos** - Interactive examples of TanStack ecosystem features

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

The design tokens page is available at: `http://localhost:3000/demo/design-tokens`

## Building For Production

```bash
pnpm build
pnpm start
```

## Design Tokens

This project uses a custom design token system that converts Figma design tokens into Tailwind CSS variables.

### Regenerating Tokens

After updating `designTokens.json`, regenerate the CSS:

```bash
pnpm generate-tokens
```

This will update `src/styles.generated.css` with the latest tokens.

## Available Demos

This project includes several interactive demos showcasing various TanStack features:

### 🎨 Design Tokens (`/demo/design-tokens`)

- Complete color palette showcase
- Semantic color system
- Custom gradients
- Spacing system
- Component examples using design tokens

### 📄 SSR Demos (`/demo/start/ssr/...`)

- **SPA Mode** - Client-side rendering only
- **Full SSR** - Complete server-side rendering
- **Data Only** - SSR for data, client rendering for UI

### 📊 TanStack Table (`/demo/table`)

- Advanced data table with sorting, filtering, and pagination

### 🔌 tRPC Integration (`/demo/trpc-todo`)

- Type-safe API calls with tRPC
- Todo app example

### 🔄 TanStack Query (`/demo/tanstack-query`)

- Data fetching and caching examples

### 📦 TanStack Store (`/demo/store`)

- State management demonstrations

## Adding Components

Add new Shadcn components using:

```bash
pnpx shadcn@latest add button
```

## Linting & Formatting

```bash
pnpm lint      # Check for linting errors
pnpm format    # Format code with Prettier
pnpm check     # Format and fix lint errors
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   └── Header.tsx      # Navigation header
├── routes/             # TanStack Router file-based routes
│   ├── demo/          # Demo pages
│   └── index.tsx      # Home page
├── integrations/       # Third-party integrations
│   ├── tanstack-query/
│   └── trpc/
├── styles.css          # Base styles
└── styles.generated.css # Auto-generated design tokens

designTokens.json       # Figma design tokens source
scripts/
└── generate-tokens.ts  # Token generator script
```

## Environment Variables

Environment variables are managed with T3Env in `src/env.ts`:

```ts
import { env } from '@/env'

console.log(env.VITE_SENTRY_DSN)
```

## Tech Stack

- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing with file-based routing
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[tRPC](https://trpc.io/)** - End-to-end type-safe APIs
- **[TanStack Table](https://tanstack.com/table)** - Headless table library
- **[TanStack Store](https://tanstack.com/store)** - State management
- **[Sentry](https://sentry.io/)** - Error tracking and monitoring

## Key Features

### 🎨 Design Token System

The project includes an automated design token pipeline:

1. Export design tokens from Figma to `designTokens.json`
2. Run `pnpm generate-tokens` to convert them to CSS variables
3. Use tokens in your components via Tailwind classes or CSS variables

Example usage:

```tsx
// Using Tailwind classes
<div className="bg-primary text-primary-foreground">

// Using CSS variables directly
<div style={{ backgroundColor: 'var(--color-lime-500)' }}>
```

### 🚀 TanStack Devtools

Press the TanStack icon in the bottom-right corner to open the integrated devtools panel with:

- Router devtools
- Query devtools
- Store devtools

### 📱 Responsive Design

All components and demos are fully responsive and work across desktop, tablet, and mobile devices.

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)

## License

MIT
