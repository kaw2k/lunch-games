import * as React from 'react'
import { MurderGameContext } from '../../../../helpers/contexts'
import { FullScreenNotice } from '../../../../components/fullScreenNotice'
import { ViewRole } from '../../components/viewRole'
import { SetupSelectCards } from './selectCards'
import values from 'ramda/es/values'
import { PlayerCard } from '../../../../components/card/player'
import { Grid } from '../../../../components/grid'
import { useCommonStyles } from '../../../../helpers/commonStyles'

interface Props {}

export const GameSetup: React.SFC<Props> = ({}) => {
  const { game, player, updateGamePlayer } = React.useContext(MurderGameContext)
  const classes = useCommonStyles()

  if (player.role === 'forensic scientist') {
    const otherPlayers = values(game.players).filter(p => p.id !== player.id)
    const allPlayersDone = otherPlayers.reduce(
      (memo, p) => memo && p.ready,
      true
    )
    return (
      <>
        <ViewRole
          button="start game"
          onDone={() => updateGamePlayer({ ...player, ready: true })}
          disableButton={!allPlayersDone}
        />
        <Grid className={classes.spacingTop}>
          {otherPlayers.map(p => (
            <PlayerCard key={p.id} player={p} selected={p.ready} />
          ))}
        </Grid>
      </>
    )
  } else {
    if (!player.murderItems) {
      return <SetupSelectCards />
    }

    if (!player.ready) {
      return (
        <ViewRole
          button="ready"
          onDone={() => updateGamePlayer({ ...player, ready: true })}
          disableButton={player.ready}
        />
      )
    }
  }

  return <FullScreenNotice>Waiting for game to start...</FullScreenNotice>
}
