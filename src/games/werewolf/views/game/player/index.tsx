import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { WerewolfPlayerNight } from './night'
import { WerewolfPlayerDay } from './day'
import { getCard } from '../../../interfaces/card/cards'
import { getArtifact } from '../../../interfaces/artifact/artifacts'
import { Actions, updateArtifact } from '../../../interfaces/actions'
import { WerewolfDead } from './dead'
import { Id } from '../../../../../helpers/id'
import { runActions } from '../../../helpers/gameEngine'

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

  const activeArtifactState = player.artifacts.find(
    a => a.activated === 'playing'
  )
  if (!game.options.moderatorOnly && activeArtifactState) {
    const artifact = getArtifact(activeArtifactState.type)
    const View = artifact.ActivateView
    if (View) {
      return (
        <View
          done={actions => {
            updateGame(
              runActions(game, [
                updateArtifact({
                  target: player.id,
                  artifact: activeArtifactState.type,
                  updates: {
                    activated: 'played',
                  },
                }),
                ...actions,
              ])
            )
          }}
          prompt={{
            type: 'by artifact',
            artifact: activeArtifactState,
            id: Id(),
            player: player.id,
          }}
        />
      )
    }
  }

  const active = game.prompts.active
  if (
    !game.options.moderatorOnly &&
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

  if (!player.alive) {
    return <WerewolfDead />
  }

  if (game.time === 'night') {
    return <WerewolfPlayerNight />
  }

  return <WerewolfPlayerDay />
}
