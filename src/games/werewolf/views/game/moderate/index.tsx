import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { NightModerator } from './night'
import { DayModerator } from './day'
import { PromptModerator } from './prompt'

interface Props {}

export const WerewolfModeratorGame: React.SFC<Props> = () => {
  const { game, endGame } = React.useContext(WerewolfGameContext)

  React.useEffect(() => {
    // Only end the game when it is day
    if (game.victory && game.time === 'day') {
      endGame(game.victory.team, game.victory.message)
    }
  })

  if (
    game.time !== 'night' &&
    (game.prompts.show || game.prompts.active || game.prompts.items.length)
  ) {
    return <PromptModerator />
  }

  return (
    <>
      {game.time === 'night' && <NightModerator />}
      {game.time === 'day' && <DayModerator />}
    </>
  )
}
