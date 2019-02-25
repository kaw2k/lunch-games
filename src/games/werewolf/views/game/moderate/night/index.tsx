import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { Button } from '../../../../../../components/button'
import { ActionRow } from '../../../../../../components/actionRow'
import { Typography } from '@material-ui/core'
import { addAction } from '../../../../helpers/addAction'
import { runActions, startDay } from '../../../../helpers/gameEngine'
import { getCard } from '../../../../interfaces/card/cards'
import { NoNightActionView } from '../../../../components/night/noNightActionView'
import { Actions } from '../../../../interfaces/actions'

interface Props {}

export const NightModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  const prompts = game.nightPrompts

  function done(actions: Actions[]) {
    if (!prompts) return

    updateGame({
      ...(prompts.length === 1
        ? runActions(game, actions)
        : addAction(actions, game)),
      nightPrompts: prompts.slice(1),
    })
  }

  // This is fine, it will never happen. We could pass
  // the prompts instead to get around it
  if (prompts === null) return null

  if (!prompts.length) {
    return (
      <>
        <Typography gutterBottom variant="h1">
          Things to say:
        </Typography>
        <Typography>People who died:</Typography>
        <Typography component="em">
          {game.nightKills.join(', ') || 'no one'}
        </Typography>

        <ActionRow fixed>
          <Button
            color="green"
            onClick={() =>
              updateGame(
                startDay({
                  ...game,
                  nightPrompts: null,
                })
              )
            }>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  const firstPrompt = prompts[0]

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
      return <ModeratorView {...firstPrompt} done={done} />
    }
  }

  if (firstPrompt.type === 'by name') {
    const { ModeratorView } = getCard(firstPrompt.role).night!
    if (!ModeratorView) {
      return <NoNightActionView data={firstPrompt.player} done={done} />
    } else {
      return <ModeratorView {...firstPrompt} done={done} />
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
      return <ModeratorView {...firstPrompt} done={done} />
    }
  }

  return (
    <NoNightActionView data="Something went wrong, keep going" done={done} />
  )
}
