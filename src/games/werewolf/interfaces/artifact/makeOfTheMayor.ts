import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const MakeOfTheMayor = Artifact({
  type: ArtifactType('make of the mayor'),
  category: 'Imitate Role',
  title: 'Make of the Mayor',
  description: 'Your vote counts as two votes when voting to eliminate players',
  infinite: true,
})
