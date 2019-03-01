import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { contains } from 'ramda'
import { getCard } from '../../../interfaces/card/cards'
import { Actions } from '../../../interfaces/actions'
import { Typography } from '@material-ui/core'
import { NightPrompt } from '../../../interfaces/nightViewInterfaces'

interface Props {
  prompts: NightPrompt[]
}

export const WerewolfPlayerNight: React.SFC<Props> = ({ prompts }) => {
  const { player, updateGame, game } = React.useContext(WerewolfGameContext)

  if (!game.night) return null
  if (game.night.type === 'pre-day' || game.night.playerReady)
    return <Typography variant="h2">It Night</Typography>

  const night = game.night

  function done(actions: Actions[]) {
    updateGame({
      night: {
        ...night,
        playerActions: actions,
        playerReady: true,
      },
    })
  }

  const firstPrompt = prompts[0]
  const primary = getCard(player.role)
  const secondary = player.secondaryRole && getCard(player.secondaryRole)

  if (firstPrompt.type === 'by name' && firstPrompt.player === player.id) {
    const View = secondary && secondary.night && secondary.night.PlayerView
    if (View) {
      return <View {...firstPrompt} done={done} />
    }
  }

  if (
    firstPrompt.type === 'by role' &&
    firstPrompt.player &&
    firstPrompt.player === player.id
  ) {
    const View = primary.night && primary.night.PlayerView
    if (View) {
      return <View {...firstPrompt} done={done} />
    }
  }

  if (
    firstPrompt.type === 'by team' &&
    contains(player.id, firstPrompt.players)
  ) {
    if (firstPrompt.role === 'werewolf') {
      const werewolf = getCard('werewolf')
      const View = werewolf.night && werewolf.night.PlayerView
      if (View) {
        return <View {...firstPrompt} done={done} />
      }
    }
  }

  return (
    <>
      <Typography variant="h2">It Night</Typography>
    </>
  )
}
