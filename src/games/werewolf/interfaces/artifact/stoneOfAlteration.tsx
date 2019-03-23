import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { PromptView, ByArtifact, ByMessage } from '../prompt'
import { Typography } from '@material-ui/core'
import { getNewRole } from '../../helpers/getNewRole'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { updatePlayer, showPrompts } from '../actions'
import { playerName } from '../../../../components/playerName'
import { Villager } from '../card/villager'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const player = game.players[playerId]
  const role = getNewRole(game.players[playerId], game)

  return (
    <>
      <Typography variant="h2">Your have received a new role</Typography>
      <Typography component="em">It is {role}</Typography>

      <ActionRow fixed>
        <Button
          color="green"
          onClick={() => {
            done([
              updatePlayer({
                target: playerId,
                updates: {
                  role: Villager.role,
                  secondaryRole: role,
                },
              }),
              showPrompts({
                prompts: [
                  ByMessage({
                    secret: true,
                    message: `${playerName(player)} changed from ${
                      player.role
                    } to ${role}`,
                  }),
                ],
              }),
            ])
          }}>
          done
        </Button>
      </ActionRow>
    </>
  )
}

export const StoneOfAlteration = Artifact({
  type: 'stone of alteration',
  title: 'Stone of Alteration',
  category: 'Chaos',
  description: 'When you play this card you receive a new role',
  infinite: false,
  ActivateView,
})
