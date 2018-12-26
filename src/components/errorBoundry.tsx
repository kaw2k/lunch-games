import * as React from 'react'
import { Layout } from './layout'
import { ActionRow } from './actionRow'
import { Button } from './button'
import * as local from '../helpers/localstorage'

interface Props {}

export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <h1>Something went wrong...</h1>
          <ActionRow>
            <Button
              onClick={() => {
                local.localUserId.set(null)
                local.roomId.set(null)
                location.reload()
              }}>
              help me!
            </Button>
          </ActionRow>
        </Layout>
      )
    }

    return this.props.children
  }
}
