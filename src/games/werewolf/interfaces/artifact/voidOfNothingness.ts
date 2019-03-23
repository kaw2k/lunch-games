import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const VoidOfNothingness = Artifact({
  type: ArtifactType('void of nothingness'),
  category: 'Misc',
  title: 'Void of Nothingness',
  description: 'Nothing happens',
  infinite: true,
})
