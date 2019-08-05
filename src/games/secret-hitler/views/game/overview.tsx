import * as React from 'react'
import { Board } from '../../components/board'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
// import { setView, view } from './spectate'
import { Spectate } from './spectate'

interface Props {
  myTurn: () => void
}

export const Overview: React.SFC<Props> = ({ myTurn }) => {
  const { player, game } = React.useContext(SecretHitlerGameContext)

  return (
    <>
      {game.message && (
        <Typography align="center" gutterBottom variant="h1">
          {game.message}
        </Typography>
      )}
      <Board game={game} />

      <ActionRow fixed>
        {player.living ? (
          <Button
            color="green"
            disabled={
              !player.living || !!game.government || !!game.performPower
            }
            onClick={myTurn}>
            my turn
          </Button>
        ) : (
          <Button confirm color="yellow" onClick={() => alert('TESTING')}>
            spectate
          </Button>
        )}
      </ActionRow>
    </>
  )
}
