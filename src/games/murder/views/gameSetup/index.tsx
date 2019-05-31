import * as React from 'react'
import { MurderGameContext } from '../../../../helpers/contexts'
import { FullScreenNotice } from '../../../../components/fullScreenNotice'
import { ViewRole } from '../../components/viewRole'
import { SetupSelectCards } from './selectCards'
import values from 'ramda/es/values'
import { PlayerCard } from '../../../../components/card/player'
import { Grid } from '../../../../components/grid'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { LOCATION_OF_CRIME } from '../../interfaces/scenes'
import { Selectable } from '../../../../components/card/selectable'
import { SceneView } from '../../components/scene'
import { Typography } from '@material-ui/core'
import { useSelectState } from '../../../../hooks/useSelectState'
import { Button } from '../../../../components/button'
import { Scene } from '../../interfaces/game'

interface Props {}

export const GameSetup: React.SFC<Props> = ({}) => {
  const { player, updateGamePlayer } = React.useContext(MurderGameContext)

  if (player.role === 'forensic scientist') {
    return <SetupForensic />
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

const SetupForensic: React.SFC<{}> = ({}) => {
  const { game, player, updateGamePlayer, updateGame } = React.useContext(
    MurderGameContext
  )
  const classes = useCommonStyles()
  const [location, setLocation] = useSelectState<Scene>([])

  async function done() {
    await updateGame({ scenes: [...location, ...game.scenes] })
    await updateGamePlayer({ ...player, ready: true })
  }

  const otherPlayers = values(game.players).filter(p => p.id !== player.id)
  const allPlayersDone = otherPlayers.reduce((memo, p) => memo && p.ready, true)
  const murderer = values(game.players).find(p => p.role === 'murderer')

  const ready = allPlayersDone && location.length === 1

  if (!murderer) return null

  return (
    <>
      <ViewRole />

      <Grid className={classes.spacingTop}>
        {otherPlayers.map(p => (
          <PlayerCard key={p.id} player={p} selected={p.ready} />
        ))}
      </Grid>

      <Typography gutterBottom>
        To start the game you must choose what location card you want to use.
        Also, all players must be ready.
      </Typography>

      <div className={classes.shelf}>
        {LOCATION_OF_CRIME.map(scene => (
          <Selectable
            selected={location[0] === scene}
            onClick={() => setLocation(scene)}>
            <SceneView scene={scene} />
          </Selectable>
        ))}
      </div>

      <Button onClick={done} disabled={!ready} color={!ready ? 'red' : 'green'}>
        {ready
          ? 'start game'
          : location.length !== 1
          ? 'select location'
          : 'players still choosing'}
      </Button>
    </>
  )
}
