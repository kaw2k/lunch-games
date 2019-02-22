import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { Button } from '../../../../../../components/button'
import { ActionRow } from '../../../../../../components/actionRow'
import { Typography } from '@material-ui/core'
// import { getCard } from '../../../../data/roles'
// import { addAction } from '../../../../helpers/addAction'
// import { runActions } from '../../../../helpers/gameEngine'

interface Props {}

export const NightModerator: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  const prompts = game.night.prompts

  if (prompts === null) {
    return <>done</>
  }

  // TODO: We need to run actions before this
  if (!prompts.length) {
    return (
      <>
        <Typography gutterBottom variant="h1">
          Things to say:
        </Typography>
        <Typography>People who died:</Typography>
        <Typography component="em">{game.night.kills.join(', ')}</Typography>

        <ActionRow fixed>
          <Button
            color="green"
            onClick={() =>
              updateGame({
                night: {
                  ...game.night,
                  prompts: null,
                },
              })
            }>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  return null

  // const firstPrompt = prompts[0]
  // const { NightModeratorView } = getCard(firstPrompt.role)

  // if (!NightModeratorView) return null

  // return (
  //   <NightModeratorView
  //     player={game.players[firstPrompt.players[0]]}
  //     callByName={firstPrompt.type === 'secondary'}
  //     done={actions => {
  //       updateGame({
  //         ...(prompts.length === 1
  //           ? runActions(game, actions)
  //           : addAction(actions, game)),
  //         night: {
  //           ...game.night,
  //           prompts: prompts.slice(1),
  //         },
  //       })
  //     }}
  //   />
  // )
}
