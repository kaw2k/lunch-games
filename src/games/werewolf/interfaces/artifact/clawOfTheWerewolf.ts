import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'
import { Werewolf } from '../card/werewolf'
import { updatePlayer, showPrompts } from '../actions'
import { ByMessage } from '../prompt'
import { playerName } from '../../../../components/playerName'

export const ClawOfTheWerewolf = Artifact({
  type: ArtifactType('claw of the werewolf'),
  title: 'Claw of the Werewolf',
  category: 'Imitate Role',
  description: 'You become a Werewolf, keeping any role power you have intact.',
  infinite: true,
  ActivateCallback: ({ done, prompt: { player: playerId }, game }) => {
    const player = game.players[playerId]

    done([
      updatePlayer({
        target: playerId,
        updates: {
          role: Werewolf.role,
        },
      }),
      showPrompts({
        prompts: [
          ByMessage({
            secret: false,
            message: `${playerName(player)} changed from ${
              player.role
            } to a werewolf!`,
          }),
        ],
      }),
    ])
  },
})
