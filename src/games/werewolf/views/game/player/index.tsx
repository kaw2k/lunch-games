import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { WerewolfPlayerNight } from './night'
import { WerewolfPlayerDay } from './day'
import { getCard } from '../../../interfaces/card/cards'
import { getArtifact } from '../../../interfaces/artifact/artifacts'
import { Actions, updateArtifact } from '../../../interfaces/actions'
import { runActions } from '../../../helpers/gameEngine'
import { Id } from '../../../../../helpers/id'
import { WerewolfDead } from './dead'

interface Props {}

export const WerewolfPlayerGame: React.SFC<Props> = () => {
  const { player, game, updateGame } = React.useContext(WerewolfGameContext)

  function done(actions: Actions[]) {
    updateGame({
      ...runActions(game, actions),
      prompts: {
        active: null,
        items: game.prompts.items,
        show: game.prompts.show,
      },
    })
  }

  const active = game.prompts.active
  if (
    game.time !== 'night' &&
    active &&
    (active.type === 'by name' ||
      active.type === 'by role' ||
      active.type === 'by artifact') &&
    active.player === player.id
  ) {
    if (active.type === 'by artifact') {
      const View = getArtifact(active.artifact.type).MorningView
      if (View) {
        return <View prompt={active} done={done} />
      }
    }

    if (active.type === 'by name' || active.type === 'by role') {
      const View = getCard(active.role).OnDeathView
      if (View) {
        return <View prompt={active} done={done} />
      }
    }
  }

  const playingArtifact = player.artifacts.find(a => a.activated === 'playing')
  if (playingArtifact) {
    const View = getArtifact(playingArtifact.type).ActivateView
    if (View) {
      return (
        <View
          done={actions => {
            updateGame(
              runActions(game, [
                ...actions,
                updateArtifact({
                  target: player.id,
                  artifact: playingArtifact.type,
                  updates: {
                    activated: 'played',
                  },
                }),
              ])
            )
          }}
          prompt={{
            type: 'by artifact',
            id: Id(),
            player: player.id,
            artifact: playingArtifact,
          }}
        />
      )
    }
  }

  if (!player.alive) {
    return <WerewolfDead />
  }

  if (game.time === 'night') {
    return <WerewolfPlayerNight />
  }

  return <WerewolfPlayerDay />
}
