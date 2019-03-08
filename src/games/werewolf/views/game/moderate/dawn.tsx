import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { Typography } from '@material-ui/core'
import { startDay } from '../../../helpers/gameEngine'

interface Props {}

export const DawnModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  if (game.time !== 'dawn') return null

  if (game.prompts.active) {
    // Do something
  }

  return (
    <>
      <Typography gutterBottom variant="h1">
        Things to do or say:
      </Typography>

      {game.prompts.items.map((prompt, i) =>
        prompt.type === 'by artifact' ? (
          <div key={`${prompt.player}-${i}`}>
            <Typography gutterBottom>
              {game.players[prompt.player].name || prompt.player}: play{' '}
              {prompt.artifact.type}
            </Typography>
          </div>
        ) : prompt.type === 'by message' ? (
          <div key={`${prompt.player}-${i}`}>
            <Typography gutterBottom>{prompt.message}</Typography>
          </div>
        ) : prompt.type === 'by role' ? (
          <div key={`${prompt.player || prompt.role}-${i}`}>
            <Typography gutterBottom>
              {prompt.player || prompt.role} you get to perform your action
            </Typography>
          </div>
        ) : null
      )}

      <ActionRow fixed>
        <Button color="green" onClick={() => updateGame(startDay(game))}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
