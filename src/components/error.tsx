import * as React from 'react'
import { Layout } from './layout'
import { ActionRow } from './actionRow'
import { Button } from './button'
import * as local from '../helpers/localstorage'

export const Error = () => (
  <Layout>
    <h1>Something went wrong...</h1>
    <ActionRow>
      <Button
        padded
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
