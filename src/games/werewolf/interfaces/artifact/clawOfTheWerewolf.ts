import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const ClawOfTheWerewolf = Artifact({
  type: ArtifactType('claw of the werewolf'),
  title: 'Claw of the Werewolf',
  category: 'Imitate Role',
  description: 'You become a Werewolf, keeping any role power you have intact.',
  infinite: true,
})
