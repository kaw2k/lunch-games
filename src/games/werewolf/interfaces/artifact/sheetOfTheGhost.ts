import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const SheetOfTheGhost = Artifact({
  type: ArtifactType('sheet of the ghost'),
  category: 'Inspection',
  title: 'Sheet of the Ghost',
  description:
    'Ask a player who was eliminated the previous day to tell you a single letter.',
  infinite: false,
})
