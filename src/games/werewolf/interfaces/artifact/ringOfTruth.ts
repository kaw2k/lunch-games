import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const RingOfTruth = Artifact({
  type: ArtifactType('ring of truth'),
  category: 'Inspection',
  title: 'Ring of Truth',
  description: 'Choose a player, they must tell you if they are a werewolf.',
  infinite: false,
})
