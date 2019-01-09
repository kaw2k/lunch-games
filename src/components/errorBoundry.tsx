import * as React from 'react'
import { Error } from './error'

interface Props {}

export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }

    return this.props.children
  }
}
