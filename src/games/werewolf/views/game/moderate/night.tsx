import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { addAction } from '../../../helpers/addAction'
import { startDawn } from '../../../helpers/gameEngine'
import { getCard } from '../../../interfaces/card/cards'
import { NoNightActionView } from '../../../components/night/noNightActionView'
import { Actions } from '../../../interfaces/actions'

interface Props {}

export const NightModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  if (game.time !== 'night') return null
  if (!game.prompts.active) return null

  function done(actions: Actions[]) {
    if (game.prompts.items.length) {
      updateGame({
        ...addAction(actions, game),
        time: 'night',
        playerInteraction: {
          actions: [],
          ready: false,
        },
        prompts: {
          active: game.prompts.items[0],
          items: game.prompts.items.slice(1),
        },
      })
    } else {
      updateGame(startDawn(addAction(actions, game)))
    }
  }

  if (game.prompts.active.type === 'by team') {
    const { ModeratorView } = getCard(game.prompts.active.role).night!
    if (!ModeratorView) {
      return (
        <NoNightActionView
          data="Something went wrong, keep going"
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={game.prompts.active} done={done} />
    }
  }

  if (game.prompts.active.type === 'by name') {
    const { ModeratorView } = getCard(game.prompts.active.role).night!
    if (
      !ModeratorView ||
      (game.prompts.active.role && game.prompts.active.role === 'werewolf')
    ) {
      return (
        <NoNightActionView
          data={game.players[game.prompts.active.player]}
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={game.prompts.active} done={done} />
    }
  }

  if (game.prompts.active.type === 'by role') {
    const { ModeratorView } = getCard(game.prompts.active.role).night!
    if (!ModeratorView) {
      return (
        <NoNightActionView
          data="Something went wrong, keep going"
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={game.prompts.active} done={done} />
    }
  }

  return (
    <NoNightActionView data="Something went wrong, keep going" done={done} />
  )
}
