import * as React from 'react'
import { Layout } from '../../../components/layout'
import { Board } from '../../components/board'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { AvalonGameContext } from '../../../helpers/contexts'
import values from 'ramda/es/values'

interface Props {
  myTurn: () => void
}

export const Overview: React.SFC<Props> = ({ myTurn }) => {
  const { player, game, endGame, updateGame } = React.useContext(
    AvalonGameContext
  )
  const isLadyOfLaking = !!values(game.players).find(p => p.ladyOfTheLake)
  const hasActiveMission = !!game.currentMission

  return (
    <Layout padded>
      {game.message && <h1>{game.message}</h1>}

      <Board game={game} />

      {game.ladyOfTheLake && !game.nextLadyOfTheLake && (
        <ActionRow>
          <Button
            padded
            onClick={() =>
              updateGame({
                nextLadyOfTheLake: player.id,
              })
            }>
            claim lady of the lake
          </Button>
        </ActionRow>
      )}

      <ActionRow>
        <Button padded confirm onClick={() => endGame()}>
          end game
        </Button>

        <Button
          padded
          disabled={isLadyOfLaking || hasActiveMission}
          onClick={myTurn}>
          my turn
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
