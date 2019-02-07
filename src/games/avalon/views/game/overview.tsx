import * as React from 'react'
import { Board } from '../../components/board'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { AvalonGameContext } from '../../../../helpers/contexts'
import values from 'ramda/es/values'
import { isGameOver } from '../../helpers/isGameOver'
import { Typography } from '@material-ui/core'

interface Props {
  myTurn: () => void
}

export const Overview: React.SFC<Props> = ({ myTurn }) => {
  const { player, game, updateGame } = React.useContext(AvalonGameContext)
  const isLadyOfLaking = !!values(game.players).find(p => p.ladyOfTheLake)
  const hasActiveMission = !!game.currentMission
  const gameOver = isGameOver(game)

  return (
    <>
      {game.message && (
        <Typography align="center" gutterBottom variant="h2">
          {game.message}
        </Typography>
      )}

      <Board game={game} />

      {game.ladyOfTheLake && !game.nextLadyOfTheLake && (
        <ActionRow>
          <Button
            onClick={() =>
              updateGame({
                nextLadyOfTheLake: player.id,
              })
            }>
            claim lady of the lake
          </Button>
        </ActionRow>
      )}

      <ActionRow fixed>
        <Button
          color="green"
          disabled={isLadyOfLaking || hasActiveMission || !!gameOver}
          onClick={myTurn}>
          my turn
        </Button>
      </ActionRow>
    </>
  )
}
