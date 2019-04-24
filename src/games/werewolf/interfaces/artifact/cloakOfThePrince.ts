import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const CloakOfThePrince = Artifact({
  type: ArtifactType('cloak of the prince'),
  title: 'Cloak of the Prince',
  category: 'Imitate Role',
  description: 'You may not be eliminated during the day by getting lynched.',
  infinite: true,
})
