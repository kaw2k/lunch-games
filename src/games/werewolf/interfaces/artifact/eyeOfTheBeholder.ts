import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const EyeOfTheBeholder = Artifact({
  type: ArtifactType('eye of the beholder'),
  category: 'Imitate Role',
  title: 'Eye of the Beholder',
  description: 'Each night wake with the seer.',
  infinite: true,
})
