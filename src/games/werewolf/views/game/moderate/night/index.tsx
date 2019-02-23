import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { Button } from '../../../../../../components/button'
import { ActionRow } from '../../../../../../components/actionRow'
import { Typography } from '@material-ui/core'
import { addAction } from '../../../../helpers/addAction'
import { runActions, startDay } from '../../../../helpers/gameEngine'
import { getCard } from '../../../../interfaces/card/cards'

interface Props {}

export const NightModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  const prompts = game.nightPrompts

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

  if (firstPrompt.type === 'primary') {
    const { NightModeratorView } = getCard(firstPrompt.role)
    if (!NightModeratorView) return null
    return (
      <NightModeratorView
        player={game.players[firstPrompt.players[0]]}
        done={actions => {
          updateGame({
            ...(prompts.length === 1
              ? runActions(game, actions)
              : addAction(actions, game)),
            nightPrompts: prompts.slice(1),
          })
        }}
      />
    )
  } else {
    if (!firstPrompt.role) {
      return null
    } else {
      const { NightModeratorView } = getCard(firstPrompt.role)
      if (!NightModeratorView) return null
      return (
        <NightModeratorView
          player={game.players[firstPrompt.players[0]]}
          done={actions => {
            updateGame({
              nightPrompts: prompts.slice(1),
            })

            updateGame({
              ...(prompts.length === 1
                ? runActions(game, actions)
                : addAction(actions, game)),
            })
          }}
        />
      )
    }
  }
}
