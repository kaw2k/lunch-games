import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { Typography } from '@material-ui/core'
import { addAction } from '../../../helpers/addAction'
import { runActions, startDay } from '../../../helpers/gameEngine'
import { getCard } from '../../../interfaces/card/cards'
import { NoNightActionView } from '../../../components/night/noNightActionView'
import { Actions } from '../../../interfaces/actions'
import values from 'ramda/es/values'
import { getArtifact, Artifacts } from '../../../interfaces/artifact/artifacts'
import { PlayerId } from '../../../../../interfaces/player'

interface Props {}

export const NightModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  if (game.time === 'day') return null

  if (game.time === 'dawn') {
    const artifacts: { player: PlayerId; artifact: Artifacts }[] = []
    for (let player of values(game.players)) {
      for (let artifact of player.artifacts) {
        if (
          player.alive &&
          artifact.activated &&
          !!getArtifact(artifact.type).MorningView
        ) {
          artifacts.push({ player: player.id, artifact: artifact.type })
        }
      }
    }
    return (
      <>
        <Typography gutterBottom variant="h1">
          Things to say:
        </Typography>
        <Typography>People who died:</Typography>
        <Typography component="em">
          {game.playersKilled.join(', ') || 'no one'}
        </Typography>

        {!!artifacts.length && (
          <>
            <Typography gutterBottom variant="h1">
              Artifacts to play:
            </Typography>
            {artifacts.map(({ player, artifact }) => (
              <div key={player}>
                <Typography gutterBottom>
                  {game.players[player].name || player}: play {artifact}
                </Typography>
              </div>
            ))}
          </>
        )}

        <ActionRow fixed>
          <Button color="green" onClick={() => updateGame(startDay(game))}>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  const firstPrompt = game.prompts[0]
  const remainingPrompts = game.prompts.slice(1)

  function done(actions: Actions[]) {
    if (remainingPrompts.length) {
      updateGame({
        ...addAction(actions, game),
        time: 'night',
        playerActions: [],
        playerReady: false,
        prompts: remainingPrompts,
      })
    } else {
      updateGame({
        ...runActions(game, actions),
        time: 'dawn',
      })
    }
  }

  if (firstPrompt.type === 'by team') {
    const { ModeratorView } = getCard(firstPrompt.role).night!
    if (!ModeratorView) {
      return (
        <NoNightActionView
          data="Something went wrong, keep going"
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={firstPrompt} done={done} />
    }
  }

  if (firstPrompt.type === 'by name') {
    const { ModeratorView } = getCard(firstPrompt.role).night!
    if (
      !ModeratorView ||
      (firstPrompt.role && firstPrompt.role === 'werewolf')
    ) {
      return (
        <NoNightActionView
          data={game.players[firstPrompt.player]}
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={firstPrompt} done={done} />
    }
  }

  if (firstPrompt.type === 'by role') {
    const { ModeratorView } = getCard(firstPrompt.role).night!
    if (!ModeratorView) {
      return (
        <NoNightActionView
          data="Something went wrong, keep going"
          done={done}
        />
      )
    } else {
      return <ModeratorView prompt={firstPrompt} done={done} />
    }
  }

  return (
    <NoNightActionView data="Something went wrong, keep going" done={done} />
  )
}
