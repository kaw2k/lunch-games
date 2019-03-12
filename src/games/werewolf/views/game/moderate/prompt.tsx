import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { Typography, Card, CardContent, CardActions } from '@material-ui/core'
import { startDay, runActions } from '../../../helpers/gameEngine'
import { Prompts } from '../../../interfaces/prompt'
import { getCard } from '../../../interfaces/card/cards'
import { Actions } from '../../../interfaces/actions'
import { getArtifact } from '../../../interfaces/artifact/artifacts'
import { PlayerName } from '../../../../../components/playerName'
import { isGameOver } from '../../../helpers/isGameOver'

interface Props {}

export const PromptModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  const actionsLeft = !!(game.prompts.active || game.prompts.items.length)

  function done(actions: Actions[]) {
    updateGame({
      ...runActions(game, actions),
      prompts: {
        active: null,
        items: game.prompts.items,
        show: true,
      },
    })
  }

  function dismiss(prompt: Prompts) {
    updateGame({
      prompts: {
        active: game.prompts.active,
        items: game.prompts.items.filter(p => p.id !== prompt.id),
        show: true,
      },
    })
  }

  function activate(prompt: Prompts) {
    updateGame({
      prompts: {
        active: prompt,
        items: game.prompts.items.filter(p => p.id !== prompt.id),
        show: true,
      },
    })
  }

  const active = game.prompts.active
  if (active) {
    if (active.type === 'by artifact') {
      const View = getArtifact(active.artifact.type).MorningView
      if (View) {
        return <View prompt={active} done={done} />
      }
    }

    if (active.type === 'by role') {
      const View = getCard(active.role).OnDeathView
      if (View) {
        return <View prompt={active} done={done} />
      }
    }
  }

  const kills = game.time === 'day' ? game.killedAtDay : game.killedAtNight

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h2">
            People who died:
          </Typography>
          <Typography gutterBottom>
            {kills.map(p => game.players[p].name || p).join(', ') || 'no one'}
          </Typography>
          {game.time === 'dawn' && !!game.killedAtDawn.length && (
            <>
              <Typography gutterBottom variant="h2">
                People who died just now:
              </Typography>
              <Typography>
                {game.killedAtDawn
                  .map(p => game.players[p].name || p)
                  .join(', ') || 'no one'}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      {game.prompts.items.map((prompt, i) => (
        <Card key={`${prompt.id}`}>
          {prompt.type === 'by message' && (
            <>
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  Message:
                </Typography>
                <Typography>{prompt.message}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth={false}
                  size="small"
                  onClick={() => dismiss(prompt)}>
                  dismiss
                </Button>
              </CardActions>
            </>
          )}

          {prompt.type === 'by artifact' && (
            <>
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  Morning artifact:
                </Typography>
                <Typography gutterBottom>
                  <PlayerName bold player={game.players[prompt.player]} />, play
                  your artifact.
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h4">
                  {getArtifact(prompt.artifact.type).title}
                </Typography>
                <Typography>
                  {getArtifact(prompt.artifact.type).description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="green"
                  fullWidth={false}
                  size="small"
                  onClick={() => activate(prompt)}>
                  play
                </Button>
              </CardActions>
            </>
          )}

          {prompt.type === 'by role' && (
            <>
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  Role
                </Typography>
                <Typography>
                  {prompt.player || prompt.role} you get to perform your action
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth={false}
                  size="small"
                  color="green"
                  onClick={() => activate(prompt)}>
                  activate
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      ))}

      <ActionRow fixed>
        <Button
          color={actionsLeft ? 'red' : 'green'}
          disabled={actionsLeft}
          onClick={() => {
            if (game.time === 'dawn') {
              updateGame(isGameOver(startDay(game)))
            } else {
              updateGame(
                isGameOver({
                  ...game,
                  prompts: {
                    active: null,
                    items: [],
                    show: false,
                  },
                })
              )
            }
          }}>
          {actionsLeft ? 'actions remain' : 'finish'}
        </Button>
      </ActionRow>
    </>
  )
}
