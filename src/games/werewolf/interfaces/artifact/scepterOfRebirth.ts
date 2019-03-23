import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const ScepterOfRebirth = Artifact({
  type: ArtifactType('scepter of rebirth'),
  title: 'Scepter of Rebirth',
  category: 'Rebirth',
  description:
    'If this artifact has not been played when you die, you come back to life.',
  infinite: false,
})
