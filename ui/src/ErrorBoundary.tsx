import React from 'react'
import { Box, Heading } from '@epilot/core-ui'
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
  children: React.ReactNode
  /**
   * Optional fallback content to render when an error is caught.
   * Defaults to null.
   */
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * ErrorBoundary catches rendering errors in its child component tree
 * to prevent errors from crashing the host application.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
   console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

export const ErrorFallback = () => {
  const { t } = useTranslation();
  return <Box>
      <Heading as="h1">
        {t('error_boundary_heading', 'Something went wrong')}
      </Heading>
    </Box>
}