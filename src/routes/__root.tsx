import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { LayoutHeader } from '../components/layout/LayoutHeader'
import { LayoutFooter } from '../components/layout/LayoutFooter'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { TRPCRouter } from '@/integrations/trpc/router'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

interface MyRouterContext {
  queryClient: QueryClient

  trpc: TRPCOptionsProxy<TRPCRouter>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/font.css',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        style={{
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
        }}
      >
        <InnerDocument>{children}</InnerDocument>
        <Scripts />
      </body>
    </html>
  )
}

function InnerDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Layout Header - Global */}
      <LayoutHeader />

      {/* Main content with padding for fixed footer */}
      <div style={{ paddingBottom: '60px' }}>{children}</div>

      {/* Layout Footer - Global */}
      <LayoutFooter />
    </>
  )
}
