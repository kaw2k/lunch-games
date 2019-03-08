import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { contains } from 'ramda'
import { getCard } from '../../../interfaces/card/cards'
import { Actions } from '../../../interfaces/actions'
import { Typography } from '@material-ui/core'
import { NoNightActionView } from '../../../components/night/noNightActionView'

interface Props {}

export const WerewolfPlayerNight: React.SFC<Props> = ({}) => {
  const { player, updateGame, game } = React.useContext(WerewolfGameContext)

  if (game.time === 'day') return null

  if (
    game.time === 'dawn' ||
    game.playerInteraction.ready ||
    !game.prompts.active
  )
    return <Typography variant="h2">It Night</Typography>

  function done(actions: Actions[]) {
    updateGame({
      playerInteraction: {
        actions,
        ready: true,
      },
    })
  }

  const primary = getCard(player.role)
  const secondary = player.secondaryRole && getCard(player.secondaryRole)

  if (
    game.prompts.active.type === 'by name' &&
    game.prompts.active.player === player.id
  ) {
    const View = secondary && secondary.night && secondary.night.PlayerView
    if (View && secondary && secondary.role !== 'werewolf') {
      return <View prompt={game.prompts.active} done={done} />
    } else {
      return <NoNightActionView data={game.players[player.id]} done={done} />
    }
  }

  if (
    game.prompts.active.type === 'by role' &&
    game.prompts.active.player &&
    game.prompts.active.player === player.id
  ) {
    const View = primary.night && primary.night.PlayerView
    if (View) {
      return <View prompt={game.prompts.active} done={done} />
    }
  }

  if (
    game.prompts.active.type === 'by team' &&
    contains(player.id, game.prompts.active.players)
  ) {
    if (game.prompts.active.role === 'werewolf') {
      const werewolf = getCard('werewolf')
      const View = werewolf.night && werewolf.night.PlayerView
      if (View) {
        return <View prompt={game.prompts.active} done={done} />
      }
    }
  }

  return (
    <>
      <Typography variant="h2">It Night</Typography>
    </>
  )
}
