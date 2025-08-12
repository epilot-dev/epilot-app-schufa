import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { AppBridgeProvider } from './AppBridgeProvider'
import { EpilotThemeProvider } from '@epilot/core-ui';
import { ErrorBoundary, ErrorFallback } from './ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <AppBridgeProvider>
            <EpilotThemeProvider theme="light">
              <App />
            </EpilotThemeProvider>
        </AppBridgeProvider>
      </QueryClientProvider>

      </ErrorBoundary>

  </StrictMode>,
)
