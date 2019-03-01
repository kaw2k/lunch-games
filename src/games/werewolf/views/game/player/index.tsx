import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { WerewolfPlayerNight } from './night'
import { Typography } from '@material-ui/core'
import { WerewolfPlayerDay } from './day'

interface Props {}

export const WerewolfPlayerGame: React.SFC<Props> = () => {
  const { player, game } = React.useContext(WerewolfGameContext)

  if (!player.alive) {
    return (
      <>
        <Typography variant="h2">Ur ded, lol</Typography>
      </>
    )
  }

  if (game.night && player) {
    return (
      <WerewolfPlayerNight
        prompts={game.night.type === 'actions' ? game.night.prompts : []}
      />
    )
  }

  return (
    <>
      <WerewolfPlayerDay />
    </>
  )
}
