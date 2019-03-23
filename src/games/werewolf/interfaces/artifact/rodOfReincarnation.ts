import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const RodOfReincarnation = Artifact({
  type: ArtifactType('rod of reincarnation'),
  title: 'Rod of Reincarnation',
  category: 'Rebirth',
  description:
    'If you are eliminated, reveal your artifact and stay in the game but receive a new role.',
  infinite: false,
})
