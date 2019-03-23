import { Artifact } from '.'
import { ByMessage } from '../prompt'
import { getNewRole } from '../../helpers/getNewRole'
import { updatePlayer, showPrompts } from '../actions'
import { playerName } from '../../../../components/playerName'
import { Villager } from '../card/villager'
import { ArtifactType } from '../../../../helpers/id'

export const StoneOfAlteration = Artifact({
  type: ArtifactType('stone of alteration'),
  title: 'Stone of Alteration',
  category: 'Chaos',
  description: 'When you play this card you receive a new role',
  infinite: false,
  ActivateCallback: ({ done, prompt: { player: playerId }, game }) => {
    const player = game.players[playerId]
    const role = getNewRole(game.players[playerId], game)

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
  },
})
