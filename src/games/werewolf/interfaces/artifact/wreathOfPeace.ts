import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const WreathOfPeace = Artifact({
  type: ArtifactType('wreath of peace'),
  category: 'Misc',
  title: 'Wreath of Peace',
  description: 'Never vote to eliminate.',
  infinite: true,
})
