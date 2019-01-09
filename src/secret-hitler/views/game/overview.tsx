import * as React from 'react'
import { Layout } from '../../../components/layout'
import { Board } from '../../components/board'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {
  myTurn: () => void
}

export const Overview: React.SFC<Props> = ({ myTurn }) => {
  const { player, game, endGame } = React.useContext(SecretHitlerGameContext)

  return (
    <Layout>
      {!player.living && <h1>you are dead</h1>}
      <Board game={game} />

      <ActionRow>
        <Button padded confirm onClick={() => endGame()}>
          end game
        </Button>

        {player.living && (
          <Button
            padded
            disabled={
              !player.living || !!game.government || !!game.performPower
            }
            onClick={myTurn}>
            my turn
          </Button>
        )}
      </ActionRow>
      <style jsx>{`
        h1 {
          text-align: center;
          color: red;
        }
      `}</style>
    </Layout>
  )
}
