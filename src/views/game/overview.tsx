import * as React from 'react'
import { Button } from '../../components/button'
import { Board } from './board'
import { GameContext } from '../../helpers/contexts'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'

interface Props {
  myTurn: () => void
}

export const Overview: React.SFC<Props> = ({ myTurn }) => {
  const { player, game, endGame } = React.useContext(GameContext)

  return (
    <Layout>
      {!player.living && <h1>you are dead</h1>}
      <Board game={game} />

      <ActionRow>
        <Button confirm onClick={endGame}>
          end game
        </Button>

        {player.living && (
          <Button
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
