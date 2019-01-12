import * as React from 'react'
import { Layout } from '../../../components/layout'
import { Board } from '../../components/board'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { SecretHitlerGame } from '../../interfaces/game'

export const Spectate: React.SFC<{
  game: SecretHitlerGame
  endGame: () => void
}> = ({ game, endGame }) => {
  return (
    <Layout padded>
      {game.message && <h1>{game.message}</h1>}
      <Board game={game} />

      <ActionRow>
        <Button padded confirm onClick={() => endGame()}>
          end game
        </Button>
      </ActionRow>

      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}
