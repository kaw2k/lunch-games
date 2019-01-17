import * as React from 'react'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

export const EndGame: React.SFC<{ cancel: () => void }> = ({ cancel }) => {
  const { endGame } = React.useContext(SecretHitlerGameContext)

  return (
    <Layout padded>
      <h1>Are you sure you want to end the game? Who won?</h1>
      <ActionRow>
        <Button
          padded
          onClick={() => {
            endGame()
          }}>
          no one
        </Button>
        <Button
          padded
          onClick={() => {
            endGame('liberal', 'The good team won!')
          }}>
          good
        </Button>
        <Button
          padded
          onClick={() => {
            endGame('fascist', 'The bad team won!')
          }}>
          bad
        </Button>
      </ActionRow>

      <ActionRow>
        <Button padded onClick={cancel}>
          cancel
        </Button>
      </ActionRow>
    </Layout>
  )
}
